const Sequelize = require("sequelize");
const conn = require("../database/connection");
const moment = require("moment");
const Users = require("./users");
const District = require("./district");

const Pementor = conn.define(
  "Pementor",
  {
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
    rating: {
      type: Sequelize.STRING,
      defaultValue: 0,
    },
    foto_profile: {
      type: Sequelize.TEXT,
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

Pementor.hasOne(Users, {
  foreignKey: "id",
});
Pementor.belongsTo(Users, {
  foreignKey: "id_users",
});

module.exports = Pementor;
