export default function handler(req, res) {
  const { id } = req.query;
  const idNumber = Number.parseFloat(id);
  if (idNumber === 100) {
    res.status(500).json({ error: 'bad id' });
  } else {
    res.status(200).json({ id: idNumber, name: `foo${id}`, next: idNumber + 1 });
  }
}
