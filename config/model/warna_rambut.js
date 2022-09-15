const Sequelize = require("sequelize");
const conn = require("../database/connection");

const WarnaRambut = conn.define(
  "warna_rambut",
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

module.exports = WarnaRambut;
