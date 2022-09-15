const Sequelize = require('sequelize');
const conn = require('../database/connection');

const TipeBadan = conn.define('tipe_badan', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    tipe: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = TipeBadan;