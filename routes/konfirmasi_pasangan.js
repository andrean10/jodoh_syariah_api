const controller = require("../controller/index");

module.exports = (app) => {
  app
    .route("/api/konfirmasi-pasangan")
    // .get(controller.konfirmasiPementor.getAll)
    .post(controller.konfirmasiPasangan.add);

  app
    .route("/api/konfirmasi-pasangan/:id")
    .patch(controller.konfirmasiPasangan.update);
};
