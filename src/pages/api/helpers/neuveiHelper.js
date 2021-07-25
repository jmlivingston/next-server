import sha256 from 'crypto-js/sha256';
import { format as dateFnsFormat } from 'date-fns';
import { v4 as uuidV4 } from 'uuid';
import { NEUVEI_BASE_URL, NEUVEI_KEY, NEUVEI_MERCHANT_ID, NEUVEI_MERCHANT_SITE_ID } from '../../../utility/CONSTANTS';

const getIdsTimeStamp = ({ clientRequestId } = {}) => {
  clientRequestId = clientRequestId || uuidV4();
  const timeStamp = dateFnsFormat(new Date(), 'yyyyMMddHHmmss');
  const checksum = sha256(
    `${NEUVEI_MERCHANT_ID}${NEUVEI_MERCHANT_SITE_ID}${clientRequestId}${timeStamp}${NEUVEI_KEY}`
  ).toString();
  return { checksum, clientRequestId, timeStamp };
};

const getSessionToken = async () => {
  const resource = `${NEUVEI_BASE_URL}/ppp/api/getSessionToken.do`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const { checksum, clientRequestId, timeStamp } = getIdsTimeStamp();

  const body = JSON.stringify({
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    merchantId: NEUVEI_MERCHANT_ID,
    clientRequestId,
    timeStamp,
    checksum,
  });

  const init = {
    method: 'POST',
    headers: headers,
    body,
  };

  const sessionTokenResponse = await fetch(resource, init);
  const sessionToken = await sessionTokenResponse.json();
  if (sessionToken.status === 'ERROR') {
    throw new Error(JSON.stringify(sessionToken));
  } else {
    return sessionToken;
  }
};

const initPayment = async ({
  amount,
  cardHolderName,
  cardNumber,
  currency,
  cvv,
  expirationMonth,
  expirationYear,
  sessionToken,
  userTokenId,
}) => {
  // TODO: can these be combined?
  if (!sessionToken) {
    const sessionTokenResponse = await getSessionToken();
    sessionToken = sessionTokenResponse.sessionToken;
  }
  const resource = `${NEUVEI_BASE_URL}/ppp/api/initPayment.do`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  const clientRequestId = uuidV4(); // TODO: get id

  const body = JSON.stringify({
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    merchantId: NEUVEI_MERCHANT_ID,
    clientRequestId,
    currency,
    amount,
    userTokenId,
    sessionToken,
    paymentOption: {
      card: {
        cardNumber,
        cardHolderName,
        expirationMonth,
        expirationYear,
        CVV: cvv,
      },
    },
  });

  const init = {
    method: 'POST',
    headers: headers,
    body,
  };

  const initPaymentResponse = await fetch(resource, init);
  const initPaymentResponseJson = await initPaymentResponse.json();
  if (initPaymentResponseJson.status === 'ERROR') {
    throw new Error(JSON.stringify(initPaymentResponseJson));
  } else {
    return initPaymentResponseJson;
  }
};

const payment = async ({
  amount,
  cardHolderName,
  cardNumber,
  currency,
  cvv,
  expirationMonth,
  expirationYear,
  sessionToken,
  userTokenId,
}) => {
  // TODO: Rip out initPayment as these will come from req
  const initPaymentJson = await initPayment({
    amount,
    cardHolderName,
    cardNumber,
    currency,
    cvv,
    expirationMonth,
    expirationYear,
    sessionToken,
    userTokenId,
  });
  const { checksum, timeStamp } = getIdsTimeStamp({
    clientRequestId: initPaymentJson.clientRequestId,
  });

  const resource = `${NEUVEI_BASE_URL}/ppp/api/payment.do`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    sessionToken: initPaymentJson.sessionToken, // TODO
    merchantId: NEUVEI_MERCHANT_ID,
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    clientRequestId: initPaymentJson.clientRequestId, // TODO
    timeStamp,
    checksum,
    currency,
    amount,
    relatedTransactionId: initPaymentJson.transactionId, // TODO
    paymentOption: {
      card: {
        cardNumber,
        cardHolderName,
        expirationMonth,
        expirationYear,
        CVV: cvv,
        // threeD: {
        //   methodCompletionInd: 'U',
        //   version: '{{threeDVersion}}',
        //   notificationURL: '{{notificationUrl}}',
        //   merchantURL: 'http://www.The-Merchant-Website-Fully-Quallified-URL.com',
        //   platformType: '02',
        //   v2AdditionalParams: {
        //     challengePreference: '01',
        //     deliveryEmail: 'The_Email_Address_The_Merchandise_Was_Delivered@yoyoyo.com',
        //     deliveryTimeFrame: '03',
        //     giftCardAmount: '1',
        //     giftCardCount: '41',
        //     giftCardCurrency: 'USD',
        //     preOrderDate: '20220511',
        //     preOrderPurchaseInd: '02',
        //     reorderItemsInd: '01',
        //     shipIndicator: '06',
        //     rebillExpiry: '20200101',
        //     rebillFrequency: '13',
        //     challengeWindowSize: '05',
        //   },
        //   browserDetails: {
        //     acceptHeader: 'text/html,application/xhtml+xml',
        //     ip: '192.168.1.11',
        //     javaEnabled: 'TRUE',
        //     javaScriptEnabled: 'TRUE',
        //     language: 'EN',
        //     colorDepth: '48',
        //     screenHeight: '400',
        //     screenWidth: '600',
        //     timeZone: '0',
        //     userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47',
        //   },
        //   account: {
        //     age: '05',
        //     lastChangeDate: '20190220',
        //     lastChangeInd: '04',
        //     registrationDate: '20190221',
        //     passwordChangeDate: '20190222',
        //     resetInd: '01',
        //     purchasesCount6M: '6',
        //     addCardAttempts24H: '24',
        //     transactionsCount24H: '23',
        //     transactionsCount1Y: '998',
        //     cardSavedDate: '20190223',
        //     cardSavedInd: '02',
        //     addressFirstUseDate: '20190224',
        //     addressFirstUseInd: '03',
        //     nameInd: '02',
        //     suspiciousActivityInd: '01',
        //   },
        // },
      },
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Smith',
      address: '340689 main St.',
      city: 'London',
      country: 'GB',
      email: 'john.smith@safecharge.com',
    },
    shippingAddress: {
      firstName: 'John',
      lastName: 'Smith',
      address: '340689 main St.',
      city: 'London',
      country: 'GB',
      email: 'john.smith@safecharge.com',
    },
    deviceDetails: {
      ipAddress: '93.146.254.172',
    },
  });

  const init = {
    method: 'POST',
    headers: headers,
    body,
  };

  const paymentResponse = await fetch(resource, init);
  const paymentResponseJson = await paymentResponse.json();
  if (paymentResponseJson.status === 'ERROR') {
    throw new Error(JSON.stringify(paymentResponseJson));
  } else {
    return paymentResponseJson;
  }

  // return { id: 'foo' };
};

export { getSessionToken, initPayment, payment };
