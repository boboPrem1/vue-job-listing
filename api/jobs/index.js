import { initDatabase } from "../../server/init.js";
import { Job, Company } from "../../server/models.js";

export default async function handler(req, res) {
  await initDatabase(); // assure la connexion (et crée les tables une fois)

  const method = req.method;
  const body = req.body;

  if (method === "GET") {
    const jobs = await Job.find({})
      .sort({ createdAt: -1 })
      .populate("company");
    return res.status(200).json(jobs);
  }

  if (method === "POST") {
    if (Array.isArray(body)) {
      let createdJobs = [];

      for (const job of body) {
        // test if company data are sended
        let company;

        if (job.company && job.company.name && job.company.contactEmail) {
          // Test for company existence
          const existingCompany = await Company.findOne({
            name: job.company.name,
            contactEmail: job.company.contactEmail,
          });

          if (existingCompany) {
            company = existingCompany;
          } else {
            company = await Company.create(job.company);
          }

          // Assigner l'ID de la company au job
          job.company = company._id;
        }

        const jobCreated = await Job.create(job);

        // Populer la company pour la retourner avec les détails complets
        const populatedJob = await Job.findById(jobCreated._id).populate(
          "company"
        );
        createdJobs.push(populatedJob);
      }

      return res.status(201).json(createdJobs);
    } else {
      // test if company data are sended
      let company;

      if (body.company && body.company.name && body.company.contactEmail) {
        // Test for company existence
        const existingCompany = await Company.findOne({
          name: body.company.name,
          contactEmail: body.company.contactEmail,
        });

        if (existingCompany) {
          company = existingCompany;
        } else {
          company = await Company.create(body.company);
        }

        // Assigner l'ID de la company au job
        body.company = company._id;
      }

      const job = await Job.create(body);

      // Populer la company pour la retourner avec les détails complets
      const populatedJob = await Job.findById(job._id).populate("company");

      return res.status(201).json(populatedJob);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Méthode ${method} non autorisée`);
}
