const Sequelize = require('sequelize');
const conn = require('../database/connection');

const Suku = conn.define('suku', {
    suku: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Suku;