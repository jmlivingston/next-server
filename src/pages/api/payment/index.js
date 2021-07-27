import { getSessionToken, initPayment, payment } from './helpers/neuveiHelper';

export default async function handler(req, res) {
  const { method } = req;
  const notificationURL =
    req.body.notificationURL ||
    'http://wwww.Test-Notification-URL-After-The-Challange-Is-Complete-Which-Recieves-The-CRes-Message.com';
  try {
    if (method === 'POST') {
      if (req.body.isInit) {
        // Combines getSessionToken, initPayment, and payment
        const sessionResponse = await getSessionToken();
        const initPaymentParams = {
          ...req.body,
          clientRequestId: sessionResponse.clientRequestId,
          sessionToken: sessionResponse.sessionToken,
        };
        const initPaymentResponse = await initPayment(initPaymentParams);
        let paymentParams = {
          ...initPaymentParams,
          checksum: sessionResponse.checksum,
          clientRequestId: initPaymentResponse.clientRequestId,
          notificationURL,
          relatedTransactionId: initPaymentResponse.transactionId,
          sessionToken: sessionResponse.sessionToken,
          timeStamp: sessionResponse.timeStamp,
          isLiabilityShift: false,
        };
        const paymentResponse = await payment(paymentParams);
        res.status(200).json(paymentResponse);
      } else {
        const paymentResponse = await payment(req.body);
        res.status(200).json(paymentResponse);
      }
    } else {
      res.status(405).send();
    }
  } catch (error) {
    res.status(500).json({
      error: { message: JSON.parse(error.message), stack: error?.stack },
      isSuccessful: false,
    });
  }
}
