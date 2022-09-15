const Sequelize = require("sequelize");
const conn = require("../database/connection");
const moment = require("moment");
const PilihanPementor = require("./pilihan_pementor");

const KonfirmasiPementor = conn.define(
  "konfirmasi_pementor",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pilihan_pementor: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    id_status_pementor: {
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

KonfirmasiPementor.hasOne(PilihanPementor, {
  foreignKey: "id",
});
KonfirmasiPementor.belongsTo(PilihanPementor, {
  foreignKey: "id_pilihan_pementor",
});

// KonfirmasiPementor.hasOne(Pementor, {
//   foreignKey: "id",
// });
// KonfirmasiPementor.belongsTo(Pementor, {
//   foreignKey: "id_pementor",
// });

module.exports = KonfirmasiPementor;
