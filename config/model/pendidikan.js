const Sequelize = require("sequelize");
const conn = require("../database/connection");

const Pendidikan = conn.define("pendidikan",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_pendidikan: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Pendidikan;
