const controller = require("../controller/index");

module.exports = (app) => {
  app.route("/api/pendidikan").get(controller.pendidikan.getAll);
};