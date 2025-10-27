import { initDatabase } from '../../server/init.js';
import { Job, Company } from '../../server/models.js'

export default async function handler(req, res) {
  await initDatabase(); // assure la connexion (et crée les tables une fois)

  const method = req.method;
  const body = req.body;

  if (method === 'GET') {
    const jobs = await Job.findAll({
      include: {
        model: Company,
        as: 'company'
      },
      order: [
        ['createdAt', 'DESC'],
      ]
    });

    return res.status(200).json(jobs);
  }

  if (method === 'POST') {
    // test if company data are sended
    let company
    if (body.company && body.company.name && body.company.contactEmail) {
      // Test for company existence
      const existingCompany = await Company.findOne({
        where: {
          name: body.company.name,
          contactEmail: body.company.contactEmail
        }
      })

      if (existingCompany) {
        company = existingCompany
      } else {

        company = await Company.create(body.company);
        body.companyId = company.id;
        delete body.company;
      }
    }
    const job = await Job.create(body || {});
    await job.setCompany(company);
    return res.status(201).json(job);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Méthode ${method} non autorisée`);
}
