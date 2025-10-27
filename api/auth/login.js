import { initDatabase } from "../../server/init.js";
import { User } from "../../server/models.js";
import argon2 from "argon2";

const GET = "GET";
const PUT = "PUT";
const DELETE = "DELETE";

export default async function handler(req, res) {
  await initDatabase(); // assure la connexion (et crée les tables une fois)

  const method = req.method;
  const body = req.body;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Méthode ${method} non autorisée` });
  }

  if ((!body.username || !body.email) && !body.password) {
    return res.status(400).json({
      message: "Username or email and password are required !",
    });
  }

  const user = body.username
    ? await User.findOne({
        username: body.username,
      })
    : await User.findOne({
        email: body.email,
      });

  if (!user)
    return res.status(401).json({
      message: "Utilisateur non trouvé !",
    });

  const password_is_valid = await argon2.verify(user.password, body.password);

  if (password_is_valid) {
    // Log user in
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // clé secrète stockée dans les variables d'environnement Vercel
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Authentification réussie",
      token,
    });
  } else {
    return res.status(401).json({
      message: "Wrong credentials!",
    });
  }
}
