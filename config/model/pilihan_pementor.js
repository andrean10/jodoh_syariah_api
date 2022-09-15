const Sequelize = require("sequelize");
const conn = require("../database/connection");
const moment = require("moment");
const PencariJodoh = require("./pencari_jodoh");
const Pementor = require("./pementor");

const PilihanPementor = conn.define(
  "pilihan_pementor",
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
    id_pementor: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    status_pilihan: {
      type: Sequelize.ENUM,
      values: ["menunggu", "konfirmasi"],
      defaultValue: "menunggu",
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

PilihanPementor.hasOne(PencariJodoh, {
  foreignKey: "id",
});
PilihanPementor.belongsTo(PencariJodoh, {
  foreignKey: "id_pencari_jodoh",
});

PilihanPementor.hasOne(Pementor, {
  foreignKey: "id",
});
PilihanPementor.belongsTo(Pementor, {
  foreignKey: "id_pementor",
});

module.exports = PilihanPementor;
