import { initDatabase } from "../../server/init.js";
import { User } from "../../server/models.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export default async function handler(req, res) {
  await initDatabase(); // Connexion à mongodb

  const method = req.method;
  const body = req.body;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Méthode ${method} non autorisée` });
  }

  if (!body.firstname && !body.email && !body.password) {
    return res.status(400).json({
      message: "Firstname, email and password are required !",
    });
  }

  const existingUser = await User.findOne({
    email: body.email,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "We already have an account with this details.",
    });
  }

  // Let's hach the password
  // Hachage
  const salt = randomBytes(16).toString("hex");
  const hashed = scryptSync(body.password, salt, 64).toString("hex");
  const hash = `${salt}:${hashed}`;
  // const hash = await argon2.hash("", {
  //   type: argon2.argon2id,
  //   memoryCost: 2 ** 16, // mémoire utilisée
  //   timeCost: 5, // nombre d’itérations
  //   parallelism: 1, // nombre de threads
  // });

  const newUser = {
    ...body,
    role: "viewer",
    password: hash,
  };

  // Creating and connecting the new user
  const usercreated = await User.create(newUser);

  // Log user in
  const token = jwt.sign(
    { id: usercreated._id, email: usercreated.email },
    process.env.JWT_SECRET, // clé secrète stockée dans les variables d'environnement Vercel
    { expiresIn: "24h" }
  );

  return res.status(200).json({
    message: "Authentification réussie",
    token,
    user: {
      _id: usercreated._id,
      firstname: usercreated.firstname,
      lastname: usercreated.lastname,
      username: usercreated.username,
      email: usercreated.email,
      role: usercreated.role,
    },
  });
}
