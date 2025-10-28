import { initDatabase } from '../../server/init.js';
import { Job, Company } from '../../server/models.js';

const GET = 'GET';
const PUT = 'PUT';
const DELETE = 'DELETE';

export default async function handler(req, res) {
  await initDatabase(); // assure la connexion (et crée les tables une fois)
  
  const { id } = req.query;
  const method = req.method;
  const body = req.body;

  if (method === 'GET') {
    const job = await Job.findById(id).populate("company");
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    return res.status(200).json(job);
  }

  if (method === 'PUT') {
    const jobUpdated = await Job.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).populate("company");
    
    if (!jobUpdated) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    return res.status(200).json(jobUpdated);
  }

  if (method === 'DELETE') {
    const deletedJob = await Job.findByIdAndDelete(id);
    
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    return res.status(200).json({ message: 'Job deleted successfully' });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Méthode ${method} non autorisée`);
}