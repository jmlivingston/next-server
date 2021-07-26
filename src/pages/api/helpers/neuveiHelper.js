import fetch from 'node-fetch';
import {
  NEUVEI_API_BASE_URL,
  NEUVEI_API_GET_SESSION,
  NEUVEI_API_INIT_PAYMENT,
  NEUVEI_API_PAYMENT,
  NEUVEI_MERCHANT_ID,
  NEUVEI_MERCHANT_SITE_ID,
} from '../../../utility/CONSTANTS';
import { getIdsTimeStamp, getSessionTokenParams } from '../params/getSessionToken';
import { getInitPaymentParams } from '../params/initPayment';
import { getPaymentParams } from '../params/payment';

const getSessionToken = async ({ clientRequestId } = {}) => {
  const resource = `${NEUVEI_API_BASE_URL}${NEUVEI_API_GET_SESSION}`;
  const headers = { 'Content-Type': 'application/json' };
  const sessionTokenParams = getSessionTokenParams({ clientRequestId });
  const body = JSON.stringify(sessionTokenParams);

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
    return { ...sessionToken, checksum: sessionTokenParams.checksum, timeStamp: sessionTokenParams.timeStamp };
  }
};

const initPayment = async ({
  amount,
  cardHolderName,
  cardNumber,
  clientRequestId,
  currency,
  CVV,
  expirationMonth,
  expirationYear,
  sessionToken,
  userTokenId,
}) => {
  const resource = `${NEUVEI_API_BASE_URL}${NEUVEI_API_INIT_PAYMENT}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const params = getInitPaymentParams({
    amount,
    cardHolderName,
    cardNumber,
    clientRequestId,
    currency,
    CVV,
    expirationMonth,
    expirationYear,
    methodNotificationUrl: 'https://docs.safecharge.com/3Dsimulator/notificationUrl.php', // TODO
    platformType: '01',
    sessionToken,
    userTokenId,
  });

  const init = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params),
  };

  const initPaymentResponse = await fetch(resource, init);
  const initPaymentResponseJson = await initPaymentResponse.json();
  if (initPaymentResponseJson.status === 'ERROR') {
    throw new Error(JSON.stringify(initPaymentResponseJson));
  } else {
    return { ...initPaymentResponseJson, sessionToken };
  }
};

const payment = async ({
  amount,
  cardHolderName,
  cardNumber,
  clientRequestId,
  currency,
  CVV,
  expirationMonth,
  expirationYear,
  notificationURL,
  paResponse,
  relatedTransactionId,
  sessionToken,
  transactionType,
  version,
}) => {
  const resource = `${NEUVEI_API_BASE_URL}${NEUVEI_API_PAYMENT}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  const params = getPaymentParams({
    amount,
    cardHolderName,
    cardNumber,
    clientRequestId,
    currency,
    CVV,
    expirationMonth,
    expirationYear,
    merchantId: NEUVEI_MERCHANT_ID,
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    notificationURL,
    paResponse,
    relatedTransactionId,
    sessionToken,
    transactionType,
    version,
  });

  const init = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params),
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

export { getIdsTimeStamp, getSessionToken, initPayment, payment };
