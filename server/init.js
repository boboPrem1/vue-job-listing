// /server/init.js
import sequelize from './db.js';
import './models.js'; // importe les modèles pour que Sequelize les connaisse

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // crée les tables si elles n'existent pas
    console.log('✅ Base de données connectée et synchronisée');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
  }
}
