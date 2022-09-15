const Sequelize = require("sequelize");
const conn = require("../database/connection");
const moment = require("moment");
const PilihanPasangan = require("./pilihan_pasangan");
const PencariJodoh = require("./pencari_jodoh");
const StatusCalon = require("./status_calon");

const KonfirmasiPasangan = conn.define(
  "konfirmasi_pasangan",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pilihan_pasangan: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_pencari_jodoh: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_status_calon: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    status_konfirmasi: {
      type: Sequelize.ENUM,
      values: ["diterima", "ditolak"],
    },
    createdAt: {
      type: "TIMESTAMP",
      get: function () {
        return moment(this.getDataValue("createdAt")).format(
          "DD-MM-YYYY HH:mm"
        );
      },
    },
    updatedAt: {
      type: "TIMESTAMP",
      get: function () {
        const date = this.getDataValue("updatedAt");
        if (date) {
          return moment(date).format("DD-MM-YYYY HH:mm");
        } else {
          return null;
        }
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

KonfirmasiPasangan.hasOne(PilihanPasangan, {
  foreignKey: "id",
});
KonfirmasiPasangan.belongsTo(PilihanPasangan, {
  foreignKey: "id_pilihan_pasangan",
});

KonfirmasiPasangan.hasOne(PencariJodoh, {
  foreignKey: "id",
});
KonfirmasiPasangan.belongsTo(PencariJodoh, {
  foreignKey: "id_pencari_jodoh",
});

KonfirmasiPasangan.hasOne(StatusCalon, {
  foreignKey: "id",
});
KonfirmasiPasangan.belongsTo(StatusCalon, {
  foreignKey: "id_status_calon",
});

module.exports = KonfirmasiPasangan;
