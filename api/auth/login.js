import { initDatabase } from "../../server/init.js";
import { User } from "../../server/models.js";
import jwt from "jsonwebtoken";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const GET = "GET";
const PUT = "PUT";
const DELETE = "DELETE";

export default async function handler(req, res) {
  await initDatabase(); // Connexion à mongodb

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

  // Vérification
  const [salt2, key2] = user.password.split(":");
  const hashedBuffer = scryptSync(body.password, salt2, 64);
  const keyBuffer = Buffer.from(key2, "hex");

  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  // const password_is_valid = await argon2.verify(user.password, body.password);

  if (match) {
    // Log user in
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // clé secrète stockée dans les variables d'environnement Vercel
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Authentification réussie",
      token,
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    return res.status(401).json({
      message: "Wrong credentials!",
    });
  }
}
