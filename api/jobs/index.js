import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'jobs.json');

export default function handler(req, res) {
  const method = req.method;

  if (method === 'GET') {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return res.status(200).json(data);
  }

  if (method === 'POST') {
    const newJob = req.body;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    newJob.id = Date.now(); // simple ID auto-généré
    data.push(newJob);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(201).json(newJob);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Méthode ${method} non autorisée`);
}
