import { NEUVEU_3D_MODE } from '../../../utility/CONSTANTS';

const getPaymentParams = ({
  cardNumber,
  cardHolderName,
  mode,
  notificationURL,
  relatedTransactionId,
  transactionType,
}) => {
  mode = mode || NEUVEU_3D_MODE.CHALLENGE;

  switch (mode) {
    case NEUVEU_3D_MODE.CHALLENGE:
      cardNumber = '4000020951595032';
      cardHolderName = 'CL-BRW1';
      notificationURL = '{{notificationUrl}}';
      relatedTransactionId = '{{initPaymentTransactionId}}';
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
      notificationURL =
        'http://wwww.Test-Notification-URL-After-The-Challange-Is-Complete-Which-Recieves-The-CRes-Message.com';
      relatedTransactionId = '{{initPaymentTransactionId}}';
      break;
    case NEUVEU_3D_MODE.FALLBACK:
      cardNumber = '4012001037141112';
      cardHolderName = 'john smith';
      notificationURL = undefined;
      relatedTransactionId = '{{initPaymentTransactionId}}';
      break;
    case NEUVEU_3D_MODE.FALLBACK_LIABILITY_SHIFT:
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
    relatedTransactionId,
    transactionType,
    paymentOption: {
      card: {
        cardNumber,
        cardHolderName,
        expirationMonth: '12',
        expirationYear: '25',
        CVV: '217',
        threeD:
          mode === NEUVEU_3D_MODE.CHALLENGE_LIABILITY_SHIFT ||
          mode === NEUVEU_3D_MODE.FALLBACK ||
          mode === NEUVEU_3D_MODE.FALLBACK_LIABILITY_SHIFT
            ? mode === NEUVEU_3D_MODE.FALLBACK || mode === NEUVEU_3D_MODE.FALLBACK_LIABILITY_SHIFT
              ? mode === NEUVEU_3D_MODE.FALLBACK_LIABILITY_SHIFT
                ? { paResponse: '{{PaResponse}}' }
                : {}
              : undefined
            : {
                methodCompletionInd: 'U',
                version: '{{threeDVersion}}',
                notificationURL,
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
      mode === NEUVEU_3D_MODE.CHALLENGE_LIABILITY_SHIFT || mode === NEUVEU_3D_MODE.FALLBACK_LIABILITY_SHIFT
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

export { getPaymentParams };
