const Sequelize = require("sequelize");
const conn = require("../database/connection");
const moment = require("moment");
const District = require("./district");
const Suku = require("./suku");
const Agama = require("./agama");
const StatusPernikahan = require("./status_pernikahan");

const PencariJodohBiodata = conn.define(
  "pencari_jodoh_biodata",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: Sequelize.STRING,
    tanggal_lahir: {
      type: Sequelize.DATEONLY,
      get: function () {
        return moment(this.getDataValue("tanggal_lahir")).format("DD-MM-YYYY");
      },
    },
    gender: {
      type: Sequelize.ENUM,
      values: ["L", "P"],
    },
    id_district: Sequelize.INTEGER,
    tempat_lahir: Sequelize.TEXT,
    alamat: Sequelize.TEXT,
    id_suku: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_agama: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    hobi: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    id_status_pernikahan: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    tentang: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// PencariJodohBiodata.hasOne(District, {
//   foreignKey: "id",
//   as: "tempat_lahir",
// });
// PencariJodohBiodata.belongsTo(District, {
//   foreignKey: "id_district",
// });

PencariJodohBiodata.hasOne(Suku, {
  foreignKey: "id",
});
PencariJodohBiodata.belongsTo(Suku, {
  foreignKey: "id_suku",
});

PencariJodohBiodata.hasOne(Agama, {
  foreignKey: "id",
});
PencariJodohBiodata.belongsTo(Agama, {
  foreignKey: "id_agama",
});

PencariJodohBiodata.hasOne(StatusPernikahan, {
  foreignKey: "id",
});
PencariJodohBiodata.belongsTo(StatusPernikahan, {
  foreignKey: "id_status_pernikahan",
});

module.exports = PencariJodohBiodata;
