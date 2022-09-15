const Sequelize = require("sequelize");
const conn = require("../database/connection");
const moment = require("moment");
const Users = require("./users");
const PencariJodohBiodata = require("./pencari_jodoh_biodata");
const PencariJodohFisik = require("./pencari_jodoh_fisik");
const PencariJodohPendidikan = require("./pencari_jodoh_pendidikan");
const PencariJodohKeluarga = require("./pencari_jodoh_keluarga");
const PencariJodohPekerjaan = require("./pencari_jodoh_pekerjaan");
const PencariJodohKriteriaPasangan = require("./pencari_jodoh_kriteria_pasangan");

const PencariJodoh = conn.define(
  "pencari_jodoh",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_users: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_pencari_jodoh_biodata: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    id_pencari_jodoh_fisik: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    id_pencari_jodoh_pendidikan: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    id_pencari_jodoh_keluarga: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    id_pencari_jodoh_pekerjaan: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    id_pencari_jodoh_kriteria_pasangan: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    location_lat: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    location_long: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATEONLY,
      get: function () {
        return moment(this.getDataValue("createdAt")).format("DD-MM-YYYY");
      },
    },
    updatedAt: {
      type: Sequelize.DATEONLY,
      get: function () {
        const date = this.getDataValue("updatedAt");
        if (date) {
          return moment(date).format("DD-MM-YYYY");
        } else {
          return null;
        }
      },
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

PencariJodoh.hasOne(Users, {
  foreignKey: "id",
});
PencariJodoh.belongsTo(Users, {
  foreignKey: "id_users",
});

PencariJodoh.hasOne(PencariJodohBiodata, {
  foreignKey: "id",
});

PencariJodoh.belongsTo(PencariJodohBiodata, {
  foreignKey: "id_pencari_jodoh_biodata",
  as: "biodata",
});

PencariJodoh.hasOne(PencariJodohFisik, {
  foreignKey: "id",
  as: "fisik",
});

PencariJodoh.belongsTo(PencariJodohFisik, {
  foreignKey: "id_pencari_jodoh_fisik",
});

PencariJodoh.hasOne(PencariJodohPendidikan, {
  foreignKey: "id",
  as: "riwayat_pendidikan",
});

PencariJodoh.belongsTo(PencariJodohPendidikan, {
  foreignKey: "id_pencari_jodoh_pendidikan",
});

PencariJodoh.hasOne(PencariJodohKeluarga, {
  foreignKey: "id",
  as: "keluarga",
});

PencariJodoh.belongsTo(PencariJodohKeluarga, {
  foreignKey: "id_pencari_jodoh_keluarga",
});

PencariJodoh.hasOne(PencariJodohPekerjaan, {
  foreignKey: "id",
  as: "pekerjaan",
});
PencariJodoh.belongsTo(PencariJodohPekerjaan, {
  foreignKey: "id_pencari_jodoh_pekerjaan",
});

PencariJodoh.hasOne(PencariJodohKriteriaPasangan, {
  foreignKey: "id",
  as: "kriteria_pasangan",
});

PencariJodoh.belongsTo(PencariJodohKriteriaPasangan, {
  foreignKey: "id_pencari_jodoh_kriteria_pasangan",
});

module.exports = PencariJodoh;
