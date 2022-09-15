const Sequelize = require("sequelize");
const conn = require("../database/connection");

const StatusCalon = conn.define(
  "status_calon",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_status: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = StatusCalon;
