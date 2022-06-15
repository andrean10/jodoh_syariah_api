const Sequelize = require('sequelize');
const conn = require('../database/connection');

const role = conn.define('role', {
    // id_role: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true
    // },
    nama_role: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = role;