import { v4 as uuidv4 } from 'uuid';
import { NEUVEI_MERCHANT_ID, NEUVEI_MERCHANT_SITE_ID } from '../../../../utility/CONSTANTS';

const getInitPaymentParams = ({
  amount,
  cardHolderName,
  cardNumber,
  clientRequestId,
  currency,
  CVV,
  expirationMonth,
  expirationYear,
  methodNotificationUrl,
  platformType,
  sessionToken, // comes from getSessionToken
}) => {
  return {
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    merchantId: NEUVEI_MERCHANT_ID,
    sessionToken,
    clientRequestId,
    currency,
    amount,
    userTokenId: uuidv4(),
    paymentOption: {
      card: {
        cardNumber,
        cardHolderName,
        expirationMonth,
        expirationYear,
        CVV,
        threeD: {
          methodNotificationUrl,
          platformType,
        },
      },
    },
  };
};

export { getInitPaymentParams };
