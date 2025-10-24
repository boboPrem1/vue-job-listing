import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'jobs.json');

export default async function handler(req, res) {
  const method = req.method;

  // ✅ Parse manuellement le corps JSON si c'est un POST
  let body = {};
  if (method === 'POST') {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = JSON.parse(Buffer.concat(chunks).toString());
    } catch (err) {
      return res.status(400).json({ message: 'Corps JSON invalide' });
    }
  }

  if (method === 'GET') {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return res.status(200).json(data.jobs);
  }

  if (method === 'POST') {
    const newJob = body; // ✅ corps parsé manuellement
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    newJob.id = Date.now(); // simple ID auto-généré
    data.jobs.push(newJob);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(201).json(newJob);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Méthode ${method} non autorisée`);
}
