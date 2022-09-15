const controller = require("../controller/index");

module.exports = (app) => {
  app
    .route("/api/pementor")
    .get(controller.pementor.getAll)
    .post(controller.pementor.add);

  app
    .route("/api/pementor/:id")
    .get(controller.pementor.getDetail)
    .put(controller.pementor.edit)
    .patch(controller.pementor.editPhoto);
};
