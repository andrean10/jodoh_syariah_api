const Sequelize = require("sequelize");
const conn = require("../database/connection");
const Pendidikan = require("./pendidikan");
const TipeBadan = require("./tipe_badan");
const WarnaKulit = require("./warna_kulit");

const PencariJodohKriteriaPasangan = conn.define(
  "pencari_jodoh_kriteria_pasangan",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_tipe_badan: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    // id_warna_kulit: {
    //   type: Sequelize.INTEGER,
    //   foreignKey: true,
    // },
    warna_kulit: Sequelize.TEXT,
    tinggi_badan: Sequelize.TEXT,
    berat_badan: Sequelize.TEXT,
    usia: Sequelize.TEXT,
    domisili: Sequelize.TEXT,
    suku: Sequelize.TEXT,
    pendidikan: Sequelize.TEXT,
    sifat: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    status_pernikahan: Sequelize.TEXT,
    informasi_tambahan: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

PencariJodohKriteriaPasangan.hasOne(TipeBadan, {
  foreignKey: "id",
});
PencariJodohKriteriaPasangan.belongsTo(TipeBadan, {
  foreignKey: "id_tipe_badan",
});

// PencariJodohKriteriaPasangan.hasOne(WarnaKulit, {
//   foreignKey: "id",
// });
// PencariJodohKriteriaPasangan.belongsTo(WarnaKulit, {
//   foreignKey: "id_warna_kulit",
// });

module.exports = PencariJodohKriteriaPasangan;
