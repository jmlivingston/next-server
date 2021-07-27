import { v4 as uuidV4 } from 'uuid';
import { initPayment } from './helpers/neuveiHelper';

export default async function handler(req, res) {
  const { method } = req;
  try {
    if (method === 'POST') {
      const initPaymentResponse = await initPayment({ ...JSON.parse(req.body), userTokenId: uuidV4() }); // TODO: token
      res.status(200).json(initPaymentResponse);
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
