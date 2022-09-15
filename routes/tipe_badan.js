const controller = require("../controller/index");

module.exports = (app) => {
  app.route("/api/tipe-badan").get(controller.tipeBadan.getAll);
};
