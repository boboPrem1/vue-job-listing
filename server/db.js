// /server/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.db',
    logging: false
});

// Pour éviter de recréer la connexion à chaque appel (important pour Vercel)
if (!global.__sequelize) {
  global.__sequelize = sequelize;
}

export default global.__sequelize;
