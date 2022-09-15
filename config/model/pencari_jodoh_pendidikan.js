const Sequelize = require("sequelize");
const conn = require("../database/connection");
const Pendidikan = require("./pendidikan");

const PencariJodohPendidikan = conn.define(
  "pencari_jodoh_pendidikan",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pendidikan_terakhir: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    sd: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    smp: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    sma: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    d1: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    d2: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    d3: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    s1: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    s2: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    s3: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

PencariJodohPendidikan.hasOne(Pendidikan, {
  foreignKey: "id",
});
PencariJodohPendidikan.belongsTo(Pendidikan, {
  foreignKey: "id_pendidikan_terakhir",
  as: "pendidikan_terakhir",
});

module.exports = PencariJodohPendidikan;
