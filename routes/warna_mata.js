const controller = require("../controller/index");

module.exports = (app) => {
  app.route("/api/warna-mata").get(controller.warnaMata.getAll);
};
