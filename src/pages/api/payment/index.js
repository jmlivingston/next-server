import { getSessionToken, initPayment, payment } from './helpers/neuveiHelper';

export default async function handler(req, res) {
  const { method } = req;
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
          relatedTransactionId: initPaymentResponse.transactionId,
          sessionToken: sessionResponse.sessionToken,
          timeStamp: sessionResponse.timeStamp,
          isLiabilityShift: false,
        };
        let paymentResponse = await payment(paymentParams);
        if (req.body.isFallback) {
          paymentParams = {
            ...paymentParams,
            isLiabilityShift: true,
            paResponse: req.body.paResponse || '{{PaResponse}}', // HACK comes from somewhere?
            relatedTransactionId: paymentResponse.transactionId,
            sessionToken: paymentResponse.sessionToken,
          };
          paymentResponse = await payment(paymentParams);
        }
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
