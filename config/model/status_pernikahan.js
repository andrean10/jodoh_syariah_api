const Sequelize = require("sequelize");
const conn = require("../database/connection");

const StatusPernikahan = conn.define(
  "status_pernikahan",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = StatusPernikahan;
