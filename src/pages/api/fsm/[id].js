export default function handler(req, res) {
  const { id } = req.query;
  const idNumber = Number.parseFloat(id);
  if (idNumber > 2) {
    res.status(500).send();
  } else {
    res.status(200).json({ id: idNumber, name: `foo${id}`, next: idNumber + 1 });
  }
}
