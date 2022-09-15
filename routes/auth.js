const controller = require("../controller/index");

module.exports = (app) => {
  app.route("/api/auth/login").post(controller.auth.login);
  app.route("/api/auth/login/:id").post(controller.auth.changeOTP);

  app.route("/api/auth/register").post(controller.auth.register);
};
