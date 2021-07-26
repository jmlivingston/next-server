import { NEUVEI_MERCHANT_ID, NEUVEI_MERCHANT_SITE_ID, NEUVEI_KEY } from '../../../../utility/CONSTANTS';
import sha256 from 'crypto-js/sha256';
import { format as dateFnsFormat } from 'date-fns';
import { v4 as uuidV4 } from 'uuid';

const getIdsTimeStamp = ({ amount, currency, clientRequestId } = {}) => {
  clientRequestId = clientRequestId || uuidV4();
  const timeStamp = dateFnsFormat(new Date(), 'yyyyMMddHHmmss');
  const checksum = sha256(
    `${NEUVEI_MERCHANT_ID}${NEUVEI_MERCHANT_SITE_ID}${clientRequestId}${amount}${currency}${timeStamp}${NEUVEI_KEY}`
  ).toString();
  return { checksum, clientRequestId, timeStamp };
};

const getPaymentParams = ({
  amount,
  cardHolderName,
  cardNumber,
  clientRequestId,
  currency,
  CVV,
  expirationMonth,
  expirationYear,
  isFallback,
  isLiabilityShift,
  merchantId,
  merchantSiteId,
  notificationURL,
  paResponse,
  relatedTransactionId,
  sessionToken,
}) => {
  const { checksum, timeStamp } = getIdsTimeStamp({ amount, currency, clientRequestId });

  return {
    sessionToken,
    merchantId,
    merchantSiteId,
    clientRequestId,
    timeStamp,
    checksum,
    currency,
    amount,
    relatedTransactionId,
    paymentOption: {
      card: {
        cardNumber,
        cardHolderName,
        expirationMonth,
        expirationYear,
        CVV,
        threeD: isLiabilityShift
          ? isFallback
            ? { paResponse }
            : undefined
          : isFallback
          ? {}
          : {
              methodCompletionInd: 'U',
              paResponse,
              version: '2.1.0',
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
  };
};

export { getPaymentParams };
