const Sequelize = require('sequelize');
const conn = require('../database/connection');
const Role = require('../model/role');

const Users = conn.define('users', {
    no_handphone: Sequelize.STRING,
    password: Sequelize.STRING,
    otp: Sequelize.STRING,
    // id_role: Sequelize.INTEGER
}, {
    freezeTableName: true,
    timestamps: true
});

Users.hasOne(Role, { foreignKey: 'id' });
// Users.belongsTo(Role, { foreignKey: 'id_role', as: 'roles' });
Users.belongsTo(Role, { foreignKey: 'id_role' });

module.exports = Users;