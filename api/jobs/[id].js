import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'jobs.json');

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;

  // Parse le fichier JSON
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const jobs = data.jobs || [];

  // Parse manuellement le corps JSON si PUT
  let body = {};
  if (method === 'PUT') {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = JSON.parse(Buffer.concat(chunks).toString());
    } catch (err) {
      return res.status(400).json({ message: 'Corps JSON invalide' });
    }
  }

  const jobIndex = jobs.findIndex((job) => job.id == id);

  if (method === 'GET') {
    const job = jobs.find((job) => job.id == id);
    if (!job) return res.status(404).json({ message: 'Job non trouvé' });
    return res.status(200).json(job);
  }

  if (method === 'PUT') {
    if (jobIndex === -1) return res.status(404).json({ message: 'Job non trouvé' });
    jobs[jobIndex] = { ...jobs[jobIndex], ...body };
    fs.writeFileSync(filePath, JSON.stringify({ jobs }, null, 2));
    return res.status(200).json(jobs[jobIndex]);
  }

  if (method === 'DELETE') {
    if (jobIndex === -1) return res.status(404).json({ message: 'Job non trouvé' });
    const deleted = jobs.splice(jobIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify({ jobs }, null, 2));
    return res.status(200).json(deleted[0]);
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Méthode ${method} non autorisée`);
}
