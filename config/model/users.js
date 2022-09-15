const Sequelize = require("sequelize");
const conn = require("../database/connection");
const Role = require("../model/role");
const moment = require("moment");

const Users = conn.define(
  "users",
  {
    no_handphone: Sequelize.STRING,
    otp: Sequelize.STRING,
    id_role: Sequelize.INTEGER,
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

Users.hasOne(Role, { foreignKey: "id" });
Users.belongsTo(Role, { foreignKey: "id_role" });

module.exports = Users;
