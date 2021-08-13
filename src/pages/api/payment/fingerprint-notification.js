export default async function handler(req, res) {
  const { method } = req;
  try {
    if (method === 'POST') {
      console.log('threeDServerTransId', req.body.threeDServerTransId);
      res.status(200).send();
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
