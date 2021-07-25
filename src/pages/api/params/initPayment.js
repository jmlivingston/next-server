import { NEUVEI_MODES } from '../../../utility/CONSTANTS';

const initPayment = ({ cardNumber, cardHolderName, mode }) => {
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
    merchantSiteId: '{{merchantSiteId}}',
    merchantId: '{{merchantId}}',
    sessionToken: '{{sessionToken}}',
    clientRequestId: '{{clientRequestId}}',
    currency: 'USD',
    amount: '500',
    userTokenId: 'asdasd',
    paymentOption: {
      card: {
        cardNumber: '4000027891380961',
        cardHolderName: 'FL-BRW1',
        expirationMonth: '12',
        expirationYear: '25',
        CVV: '217',
        threeD: {
          methodNotificationUrl: 'www.ThisIsAMethodNotificationURL.com',
          platformType: '01',
        },
      },
    },
  };
};
