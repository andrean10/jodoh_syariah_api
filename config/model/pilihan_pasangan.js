const Sequelize = require("sequelize");
const conn = require("../database/connection");
const moment = require("moment");
const PencariJodoh = require("./pencari_jodoh");
const KonfirmasiPementor = require("./konfirmasi_pementor");

const PilihanPasangan = conn.define(
  "pilihan_pasangan",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pencari_jodoh: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_konfirmasi_pementor: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    status_pilihan: {
      type: Sequelize.ENUM,
      values: ["menunggu", "konfirmasi"],
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

PilihanPasangan.hasOne(PencariJodoh, {
  foreignKey: "id",
  as: "calon",
});
PilihanPasangan.belongsTo(PencariJodoh, {
  foreignKey: "id_pencari_jodoh",
});

PilihanPasangan.hasOne(KonfirmasiPementor, {
  foreignKey: "id",
});
PilihanPasangan.belongsTo(KonfirmasiPementor, {
  foreignKey: "id_konfirmasi_pementor",
});

module.exports = PilihanPasangan;
