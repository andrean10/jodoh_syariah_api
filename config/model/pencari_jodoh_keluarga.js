const Sequelize = require("sequelize");
const conn = require("../database/connection");
const Pendidikan = require("./pendidikan");

const PencariJodohKeluarga = conn.define(
  "pencari_jodoh_keluarga",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    anak_ke: Sequelize.INTEGER,
    dari: Sequelize.INTEGER,
    anak_ke: Sequelize.INTEGER,
    id_keluarga: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// PencariJodohKeluarga.hasOne(Pendidikan, {
//   foreignKey: "id",
//   as: "pendidikan_terakhir",
// });
// PencariJodohKeluarga.belongsTo(Pendidikan, {
//   foreignKey: "id_pendidikan_terakhir",
// });

module.exports = PencariJodohKeluarga;
