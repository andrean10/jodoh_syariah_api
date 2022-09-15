const controller = require("../controller/index");

module.exports = (app) => {
  app.route("/api/warna-kulit").get(controller.warnaKulit.getAll);
};
