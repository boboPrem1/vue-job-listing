import sequelize from './db.js';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(
            'viewer',
            'editor',
            'admin'),
        defaultValue: 'Full-Time',
        allowNull: false
    },
});

export const Company = sequelize.define('Company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactPhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

export const Job = sequelize.define('Job', {
    type: {
        type: DataTypes.ENUM(
            'Full-Time',
            'Part-Time',
            'Remote',
            'Internship'),
        defaultValue: 'Full-Time',
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.ENUM(
            'Under $50K',
            '$50K - $60K',
            '$60K - $70K',
            '$70K - $80K',
            '$80K - $90K',
            '$90K - $100K',
            '$100K - $125K',
            '$125K - $150K',
            '$150K - $175K',
            '$175K - $200K',
            'Over $200K'),
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Company.hasMany(Job, { foreignKey: 'companyId', as: 'jobs' });
Job.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

User.hasMany(Job, { foreignKey: 'userId' });
Job.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Company, { foreignKey: 'userId' });
Company.belongsTo(User, { foreignKey: 'userId' });