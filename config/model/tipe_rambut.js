const Sequelize = require("sequelize");
const conn = require("../database/connection");

const TipeRambut = conn.define(
  "tipe_rambut",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipe: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = TipeRambut;
