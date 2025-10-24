import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'jobs.json');

export default function handler(req, res) {
  const { id } = req.query;
  const method = req.method;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const jobIndex = data.findIndex((job) => job.id == id);

  if (method === 'GET') {
    const job = data.find((job) => job.id == id);
    if (!job) return res.status(404).json({ message: 'Job non trouvé' });
    return res.status(200).json(job);
  }

  if (method === 'PUT') {
    if (jobIndex === -1) return res.status(404).json({ message: 'Job non trouvé' });
    data[jobIndex] = { ...data[jobIndex], ...req.body };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json(data[jobIndex]);
  }

  if (method === 'DELETE') {
    if (jobIndex === -1) return res.status(404).json({ message: 'Job non trouvé' });
    const deleted = data.splice(jobIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json(deleted[0]);
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Méthode ${method} non autorisée`);
}
