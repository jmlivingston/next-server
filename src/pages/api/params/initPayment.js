import { v4 as uuidv4 } from 'uuid';
import { NEUVEI_3D_MODE, NEUVEI_MERCHANT_ID, NEUVEI_MERCHANT_SITE_ID } from '../../../utility/CONSTANTS';

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
  mode,
  platformType,
  sessionToken, // comes from getSessionToken
  userTokenId,
}) => {
  amount = amount || '500';
  clientRequestId = clientRequestId || '20210723182824';
  currency = currency || 'USD';
  CVV = CVV || '217';
  expirationMonth = expirationMonth || '12';
  expirationYear = expirationYear || '25';
  methodNotificationUrl = methodNotificationUrl || 'www.ThisIsAMethodNotificationURL.com';
  mode = mode || NEUVEI_3D_MODE.CHALLENGE;
  platformType = platformType || '01';
  userTokenId = userTokenId || uuidv4();

  switch (mode) {
    case NEUVEI_3D_MODE.CHALLENGE:
      cardNumber = '4000020951595032';
      cardHolderName = 'CL-BRW1';
      break;
    case NEUVEI_3D_MODE.THREE_D_FRICTIONLESS:
      cardNumber = '4000027891380961';
      cardHolderName = 'FL-BRW1';
      break;
    case NEUVEI_3D_MODE.THREE_D_FALLBACK:
      cardNumber = '4012001037141112';
      cardHolderName = 'john smith';
      break;
    default:
      break;
  }

  return {
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    merchantId: NEUVEI_MERCHANT_ID,
    sessionToken,
    clientRequestId,
    currency,
    amount,
    userTokenId,
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
