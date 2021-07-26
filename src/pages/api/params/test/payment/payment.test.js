import fs from 'fs';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import { NEUVEI_3D_MODE } from '../../../../../utility/CONSTANTS';
import { getSessionToken, initPayment, payment } from '../../../../api/helpers/neuveiHelper';
import { getPaymentParams } from '../../payment';

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

describe('payment flows', () => {
  test('getSessionToken', async () => {
    await getSessionToken();
  });

  test(NEUVEI_3D_MODE.FRICTIONLESS, async () => {
    const sessionResponse = await getSessionToken();
    const userTokenId = uuidV4();
    const initPaymentParams = {
      amount: '500',
      cardHolderName: 'FL-BRW1',
      cardNumber: '4000027891380961',
      clientRequestId: sessionResponse.clientRequestId,
      currency: 'GBP',
      CVV: '217',
      expirationMonth: '12',
      expirationYear: '25',
      mode: NEUVEI_3D_MODE.FRICTIONLESS,
      sessionToken: sessionResponse.sessionToken,
      userTokenId,
    };
    const initPaymentResponse = await initPayment(initPaymentParams);
    const paymentParams = {
      ...initPaymentParams,
      checksum: sessionResponse.checksum,
      clientRequestId: initPaymentResponse.clientRequestId,
      notificationURL:
        'http://wwww.Test-Notification-URL-After-The-Challange-Is-Complete-Which-Recieves-The-CRes-Message.com',
      paResponse: '', //
      relatedTransactionId: initPaymentResponse.transactionId,
      sessionToken: sessionResponse.sessionToken,
      timeStamp: sessionResponse.timeStamp,
      transactionType: undefined,
      version: '2.1.0',
    };
    const paymentResponse = await payment(paymentParams);
    console.log(paymentResponse);
  });
});
