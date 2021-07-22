import { payment } from './helpers/neuveiHelper';

export default async function handler(req, res) {
  const { method } = req;
  try {
    if (method === 'POST') {
      const paymentResponse = await payment(req.body);
      res.status(200).json(paymentResponse);
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
