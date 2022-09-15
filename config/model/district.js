const Sequelize = require('sequelize');
const conn = require('../database/connection');

const District = conn.define('district', {
    district: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = District;