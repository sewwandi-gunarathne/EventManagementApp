export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'DELETE') {
    
    console.log(`Deleting event with id: ${id}`);
    return res.status(200).json({ message: `Event ${id} deleted` });
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
