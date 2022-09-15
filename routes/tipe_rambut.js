const controller = require("../controller/index");

module.exports = (app) => {
  app.route("/api/tipe-rambut").get(controller.tipeRambut.getAll);
};
