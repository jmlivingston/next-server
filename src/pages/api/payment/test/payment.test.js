// import fs from 'fs';
// import path from 'path';
// import { getPaymentParams } from '../../payment';
import fetch from 'node-fetch';
import { NEUVEI_3D_MODE, NEUVEI_API_CHALLENGE_SIMULATOR } from '../../../../config/CONSTANTS';
import { getSessionToken, initPayment, payment } from '../helpers/neuveiHelper';

const API_TIMEOUT = 20000;

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
  currency: 'GBP',
  CVV: '217',
  expirationMonth: '12',
  expirationYear: '25',
};

const notificationURL =
  'http://wwww.Test-Notification-URL-After-The-Challange-Is-Complete-Which-Recieves-The-CRes-Message.com';

const testApi = async ({ amount, cardHolderName, cardNumber, mode }) => {
  const logs = [mode];
  logs.push('getSessionToken');
  const sessionResponse = await getSessionToken();
  const initPaymentParams = {
    ...cardDetails,
    amount,
    cardHolderName,
    cardNumber,
    clientRequestId: sessionResponse.clientRequestId,
    sessionToken: sessionResponse.sessionToken,
  };
  logs.push('initPayment');
  const initPaymentResponse = await initPayment(initPaymentParams);
  const isFallback = mode === NEUVEI_3D_MODE.FALLBACK; // HACK: this value not returning properly for fallback initPaymentResponse.paymentOption.card.threeD.v2supported === 'false';
  let paymentParams = {
    ...initPaymentParams,
    checksum: sessionResponse.checksum,
    clientRequestId: initPaymentResponse.clientRequestId,
    notificationURL,
    relatedTransactionId: initPaymentResponse.transactionId,
    sessionToken: sessionResponse.sessionToken,
    timeStamp: sessionResponse.timeStamp,
    isFallback,
    isLiabilityShift: false,
  };
  logs.push('payment');
  let paymentResponse = await payment(paymentParams);
  const isChallenge = paymentResponse.transactionStatus === 'REDIRECT';
  if (isChallenge) {
    const challengeUrl = NEUVEI_API_CHALLENGE_SIMULATOR({
      acsUrl: paymentResponse.paymentOption.card.threeD.acUrl,
      cReq: paymentResponse.paymentOption.card.threeD.cReq,
    });
    logs.push('challengeUrl');
    await fetch(challengeUrl);
  }
  if (isFallback) {
    // TBD
    logs.push('3D Secure - emulator');
  }
  if (isFallback || isChallenge) {
    paymentParams.isLiabilityShift = true;
    paymentParams.paResponse = isChallenge ? undefined : '{{PaResponse}}'; // HACK comes from somewhere?
    paymentParams.relatedTransactionId = paymentResponse.transactionId;
    logs.push('payment (liability shift)');
    paymentResponse = await payment(paymentParams);
  }
  const flow = logs.join(' -> ');
  console.log(flow); //, JSON.stringify(paymentResponse, null, 2));
  switch (mode) {
    case NEUVEI_3D_MODE.CHALLENGE:
      expect(flow).toBe(
        'CHALLENGE -> getSessionToken -> initPayment -> payment -> challengeUrl -> payment (liability shift)'
      );
      break;
    case NEUVEI_3D_MODE.FRICTIONLESS:
      expect(flow).toBe('FRICTIONLESS -> getSessionToken -> initPayment -> payment');
      break;
    case NEUVEI_3D_MODE.FALLBACK:
      expect(flow).toBe(
        'FALLBACK -> getSessionToken -> initPayment -> payment -> 3D Secure - emulator -> payment (liability shift)'
      );
      break;
  }
  // if (paymentResponse.transactionStatus === 'ERROR') {
  console.log(JSON.stringify(paymentResponse, null, 2));
  // }
  expect(paymentResponse.status).toBe('SUCCESS');
  expect(paymentResponse.transactionStatus).toBe('APPROVED');
};

describe('payment flows', () => {
  // test('getSessionToken', async () => {
  //   await getSessionToken();
  // });

  test(
    NEUVEI_3D_MODE.CHALLENGE,
    async () => {
      await testApi({
        amount: '500',
        cardHolderName: 'CL-BRW1',
        cardNumber: '4000020951595032',
        mode: NEUVEI_3D_MODE.CHALLENGE,
      });
    },
    API_TIMEOUT
  );

  test(
    NEUVEI_3D_MODE.FRICTIONLESS,
    async () => {
      await testApi({
        amount: '500',
        cardHolderName: 'FL-BRW1',
        cardNumber: '4000027891380961',
        mode: NEUVEI_3D_MODE.FRICTIONLESS,
      });
    },
    API_TIMEOUT
  );

  test(
    NEUVEI_3D_MODE.FALLBACK,
    async () => {
      await testApi({
        amount: '500',
        cardHolderName: 'John Smith',
        cardNumber: '4012001037141112', // TODO: investigate why not in test cards documentation
        mode: NEUVEI_3D_MODE.FALLBACK,
      });
    },
    API_TIMEOUT
  );
});
