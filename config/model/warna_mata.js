const Sequelize = require("sequelize");
const conn = require("../database/connection");

const WarnaMata = conn.define(
  "warna_mata",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    warna: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = WarnaMata;
