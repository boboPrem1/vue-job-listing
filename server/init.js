// /server/init.js
import mongoose from "mongoose";

export async function initDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_STR_CONNECT; // on stocke la string de connexion dans les variables d'environnement Vercel

  try {
    await mongoose.connect(uri, {
      dbName: "vue-jobs-app", // 👈 ton nom de base de données
      autoIndex: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}