const controller = require("../controller/index");

module.exports = (app) => {
  app.route("/api/warna-rambut").get(controller.warnaRambut.getAll);
};
