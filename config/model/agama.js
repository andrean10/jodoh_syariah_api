const Sequelize = require('sequelize');
const conn = require('../database/connection');

const Agama = conn.define('agama', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    agama: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Agama;