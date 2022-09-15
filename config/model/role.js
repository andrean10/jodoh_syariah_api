const Sequelize = require('sequelize');
const conn = require('../database/connection');

const Role = conn.define('role', {
    nama_role: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Role;