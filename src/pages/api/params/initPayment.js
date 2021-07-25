import { v4 as uuidv4 } from 'uuid';
import { NEUVEI_MERCHANT_ID, NEUVEI_MERCHANT_SITE_ID, NEUVEI_MODES } from '../../../utility/CONSTANTS';

const initPayment = ({
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
  mode = mode || NEUVEI_MODES.THREE_D_CHALLENGE;
  platformType = platformType || '01';
  userTokenId = userTokenId || uuidv4();

  switch (mode) {
    case NEUVEI_MODES.THREE_D_CHALLENGE:
      cardNumber = '4000020951595032';
      cardHolderName = 'CL-BRW1';
      break;
    case NEUVEI_MODES.THREE_D_FRICTIONLESS:
      cardNumber = '4000027891380961';
      cardHolderName = 'FL-BRW1';
      break;
    case NEUVEI_MODES.THREE_D_FALLBACK:
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

export default initPayment;
