const Sequelize = require("sequelize");
const conn = require("../database/connection");
const Pendidikan = require("./pendidikan");

const PencariJodohPekerjaan = conn.define(
  "pencari_jodoh_pekerjaan",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pekerjaan: Sequelize.INTEGER,
    deskripsi_pekerjaan: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = PencariJodohPekerjaan;