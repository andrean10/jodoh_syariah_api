const Sequelize = require("sequelize");
const conn = require("../database/connection");
const TipeBadan = require("./tipe_badan");
const TipeRambut = require("./tipe_rambut");
const WarnaKulit = require("./warna_kulit");
const WarnaMata = require("./warna_mata");
const WarnaRambut = require("./warna_rambut");

const PencariJodohFisik = conn.define(
  "pencari_jodoh_fisik",
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
    id_warna_kulit: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_tipe_rambut: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_warna_rambut: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_warna_mata: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    tinggi_badan: Sequelize.INTEGER,
    berat_badan: Sequelize.INTEGER,
    riwayat_penyakit: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cacat_fisik: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

PencariJodohFisik.hasOne(TipeBadan, {
  foreignKey: "id",
});
PencariJodohFisik.belongsTo(TipeBadan, {
  foreignKey: "id_tipe_badan",
});

PencariJodohFisik.hasOne(WarnaKulit, {
  foreignKey: "id",
});
PencariJodohFisik.belongsTo(WarnaKulit, {
  foreignKey: "id_warna_kulit",
});

PencariJodohFisik.hasOne(TipeRambut, {
  foreignKey: "id",
});
PencariJodohFisik.belongsTo(TipeRambut, {
  foreignKey: "id_tipe_rambut",
});

PencariJodohFisik.hasOne(WarnaRambut, {
  foreignKey: "id",
});
PencariJodohFisik.belongsTo(WarnaRambut, {
  foreignKey: "id_warna_rambut",
});

PencariJodohFisik.hasOne(WarnaMata, {
  foreignKey: "id",
});
PencariJodohFisik.belongsTo(WarnaMata, {
  foreignKey: "id_warna_mata",
  as: "warna_mata",
});

module.exports = PencariJodohFisik;
