import fs from 'fs';
import path from 'path';
import { NEUVEI_3D_MODE, NEUVEI_API_CHALLENGE_SIMULATOR } from '../../../../../utility/CONSTANTS';
import { getSessionToken, initPayment, payment } from '../../../../api/helpers/neuveiHelper';
import { getPaymentParams } from '../../payment';
import fetch from 'node-fetch';

// describe('payment params', () => {
//   Object.keys(NEUVEI_3D_MODE).map((mode) => {
//     test(mode, () => {
//       const params = getPaymentParams({ mode });
//       const source = fs
//         .readFileSync(path.join(path.resolve(), `src/pages/api/params/test/payment/source/${mode}.mock.json`))
//         .toString()
//         .trim();
//       const target = JSON.stringify(params, null, 2).trim();
//       fs.writeFileSync(path.join(path.resolve(), `src/pages/api/params/test/payment/target/${mode}.mock.json`), target);
//       if (source !== target) {
//         console.log(`${mode} ERROR`);
//       }
//       expect(source).toBe(target);
//     });
//   });
// });

const cardDetails = {
  amount: '500',
  currency: 'GBP',
  CVV: '217',
  expirationMonth: '12',
  expirationYear: '25',
};

const notificationURL =
  'http://wwww.Test-Notification-URL-After-The-Challange-Is-Complete-Which-Recieves-The-CRes-Message.com';

const testApi = async ({ cardHolderName, cardNumber, mode }) => {
  const logs = [mode];
  logs.push('getSessionToken');
  const sessionResponse = await getSessionToken();
  const initPaymentParams = {
    ...cardDetails,
    cardHolderName,
    cardNumber,
    clientRequestId: sessionResponse.clientRequestId,
    sessionToken: sessionResponse.sessionToken,
  };
  logs.push('initPayment');
  const initPaymentResponse = await initPayment(initPaymentParams);
  let paymentParams = {
    ...initPaymentParams,
    checksum: sessionResponse.checksum,
    clientRequestId: initPaymentResponse.clientRequestId,
    notificationURL,
    relatedTransactionId: initPaymentResponse.transactionId,
    sessionToken: sessionResponse.sessionToken,
    timeStamp: sessionResponse.timeStamp,
  };
  logs.push('payment');
  const paymentResponse = await payment(paymentParams);

  const isChallenge = paymentResponse.transactionStatus === 'REDIRECT';
  if (isChallenge) {
    const challengeUrl = NEUVEI_API_CHALLENGE_SIMULATOR({
      acsUrl: paymentResponse.paymentOption.card.threeD.acUrl,
      cReq: paymentResponse.paymentOption.card.threeD.cReq,
    });
    logs.push('challengeUrl');
    await fetch(challengeUrl);
  }
  if (paymentResponse.paymentOption.card.threeD.result === 'N' || isChallenge) {
    paymentParams.relatedTransactionId = paymentResponse.transactionId;
    logs.push('payment (liability shift)');
    await payment(paymentParams);
  }
  console.log(logs.join(' -> '));
};

describe('payment flows', () => {
  // test('getSessionToken', async () => {
  //   await getSessionToken();
  // });

  test(
    NEUVEI_3D_MODE.CHALLENGE,
    async () => {
      await testApi({
        cardHolderName: 'CL-BRW1',
        cardNumber: '4000020951595032',
        mode: NEUVEI_3D_MODE.CHALLENGE,
      });
    },
    10000
  );

  test(
    NEUVEI_3D_MODE.FRICTIONLESS,
    async () => {
      await testApi({
        cardHolderName: 'FL-BRW1',
        cardNumber: '4000027891380961',
        mode: NEUVEI_3D_MODE.FRICTIONLESS,
      });
    },
    10000
  );

  test(
    NEUVEI_3D_MODE.FALLBACK,
    async () => {
      await testApi({
        cardHolderName: 'john smith',
        cardNumber: '4012001037141112',
        mode: NEUVEI_3D_MODE.FALLBACK,
      });
    },
    10000
  );
});
