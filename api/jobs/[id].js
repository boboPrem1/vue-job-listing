import { initDatabase } from '../../server/init.js';
import { Job, Company } from '../../server/models.js'

const GET = 'GET';
const PUT = 'PUT';
const DELETE = 'DELETE';

export default async function handler(req, res) {
  await initDatabase(); // assure la connexion (et crée les tables une fois)

  const { id } = req.query;
  const method = req.method;
  const body = req.body

  if (method === 'GET') {
    const job = await Job.findByPk(id, {
      include: {
        model: Company,
        as: 'company'
      }
    })

    return res.status(200).json(job);
  }

  if (method === 'PUT') {
    await Job.update(
      body,
      {
        where: {
          id
        }
      }
    );

    const jobUpdataed = await Job.findByPk(id)
    return res.status(200).json(jobUpdataed);
  }

  if (method === 'DELETE') {
    await Job.destroy({
      where: {
        id
      },
    })

    return res.status(200).json({})
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Méthode ${method} non autorisée`);
}
