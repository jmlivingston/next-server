// import { NEUVEU_3D_MODE } from '../../../utility/CONSTANTS';
const fs = require('fs');
const path = require('path');

const NEUVEU_3D_MODE = Object.freeze({
  CHALLENGE: 'CHALLENGE',
  CHALLENGE_LIABILITY_SHIFT: 'CHALLENGE_LIABILITY_SHIFT',
  FRICTIONLESS: 'FRICTIONLESS',
  FALLBACK: 'FALLBACK',
  FALLBACK_LIABILITY_SHIFT: 'FALLBACK_LIABILITY_SHIFT',
});

const payment = ({ cardNumber, cardHolderName, mode, notificationURL, relatedTransactionId }) => {
  mode = mode || NEUVEU_3D_MODE.CHALLENGE;

  switch (mode) {
    case NEUVEU_3D_MODE.CHALLENGE:
      cardNumber = '4000020951595032';
      cardHolderName = 'CL-BRW1';
      notificationURL = 'https://docs.safecharge.com/3Dsimulator/notificationUrl.php';
      relatedTransactionId = '{{paymentTransactionId}}';
      break;
    case NEUVEU_3D_MODE.CHALLENGE_LIABILITY_SHIFT:
      cardNumber = '4000020951595032';
      cardHolderName = 'CL-BRW1';
      notificationURL = 'https://docs.safecharge.com/3Dsimulator/notificationUrl.php';
      relatedTransactionId = '{{paymentTransactionId}}';
      transactionType = 'Auth';
      break;
    case NEUVEU_3D_MODE.FRICTIONLESS:
      cardNumber = '4000027891380961';
      cardHolderName = 'FL-BRW1';
      notificationURL = 'http://www.The-Merchant-Website-Fully-Quallified-URL.com';
      break;
    case NEUVEU_3D_MODE.FALLBACK:
      cardNumber = '4012001037141112';
      cardHolderName = 'john smith';
      notificationURL = undefined;
      break;
    default:
      break;
  }

  return {
    sessionToken: '{{sessionToken}}',
    merchantId: '{{merchantId}}',
    merchantSiteId: '{{merchantSiteId}}',
    clientRequestId: '{{clientRequestId}}',
    timeStamp: '{{timestamp}}',
    checksum: '{{checksum}}',
    currency: '{{currency}}',
    amount: '{{amount}}',
    relatedTransactionId: '{{initPaymentTransactionId}}',
    paymentOption: {
      card: {
        cardNumber: '4000020951595032',
        cardHolderName: 'CL-BRW1',
        expirationMonth: '12',
        expirationYear: '25',
        CVV: '217',
        threeD:
          CHALLENGE_LIABILITY_SHIFT || NEUVEU_3D_MODE.FALLBACK
            ? {}
            : {
                methodCompletionInd: 'U',
                version: '{{threeDVersion}}',
                notificationURL: '{{notificationUrl}}',
                merchantURL: 'http://www.The-Merchant-Website-Fully-Quallified-URL.com',
                platformType: '02',
                v2AdditionalParams: {
                  challengePreference: '01',
                  deliveryEmail: 'The_Email_Address_The_Merchandise_Was_Delivered@yoyoyo.com',
                  deliveryTimeFrame: '03',
                  giftCardAmount: '1',
                  giftCardCount: '41',
                  giftCardCurrency: 'USD',
                  preOrderDate: '20220511',
                  preOrderPurchaseInd: '02',
                  reorderItemsInd: '01',
                  shipIndicator: '06',
                  rebillExpiry: '20200101',
                  rebillFrequency: '13',
                  challengeWindowSize: '05',
                },
                browserDetails: {
                  acceptHeader: 'text/html,application/xhtml+xml',
                  ip: '192.168.1.11',
                  javaEnabled: 'TRUE',
                  javaScriptEnabled: 'TRUE',
                  language: 'EN',
                  colorDepth: '48',
                  screenHeight: '400',
                  screenWidth: '600',
                  timeZone: '0',
                  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47',
                },
                account: {
                  age: '05',
                  lastChangeDate: '20190220',
                  lastChangeInd: '04',
                  registrationDate: '20190221',
                  passwordChangeDate: '20190222',
                  resetInd: '01',
                  purchasesCount6M: '6',
                  addCardAttempts24H: '24',
                  transactionsCount24H: '23',
                  transactionsCount1Y: '998',
                  cardSavedDate: '20190223',
                  cardSavedInd: '02',
                  addressFirstUseDate: '20190224',
                  addressFirstUseInd: '03',
                  nameInd: '02',
                  suspiciousActivityInd: '01',
                },
              },
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
    shippingAddress:
      CHALLENGE_LIABILITY_SHIFT || FALLBACK_LIABILITY_SHIFT
        ? undefined
        : {
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
  };
};

Object.keys(NEUVEU_3D_MODE).map((mode) => {
  const params = payment({ mode });
  fs.writeFileSync(
    path.join(path.resolve(), `params/test/payment/original${mode}.json`),
    JSON.stringify(params, null, 2)
  );
});

// export default payment;
