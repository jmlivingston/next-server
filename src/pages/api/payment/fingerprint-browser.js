export default async function handler(req, res) {
  const { method } = req;
  try {
    if (method === 'POST') {
      console.log('threeDSMethodData', req.body.threeDSMethodData);
      res.status(200).json({
        threeDServerTransId: 'eyJ0aHJlZURTZXJ2ZXJUcmFuc0lEIjoiM2FjN2NhYTctYWE0Mi0yNjYzLTc5MWItMmFjMDVhNTQyYzRhIn0=',
      });
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
