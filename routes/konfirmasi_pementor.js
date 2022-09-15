const controller = require("../controller/index");

module.exports = (app) => {
  // app
  //   .route("/api/pementor/:id/pencari-jodoh")
  //   .get(controller.konfirmasiPementor.getAll)
  //   .post(controller.konfirmasiPementor.add);
  
  // Api untuk pencari jodoh
  app.route("/api/pencari-jodoh/:id/konfirmasi-pementor")
    .get(controller.konfirmasiPementor.getAllFromPJ);

  app
    .route("/api/konfirmasi-pementor/:id")
    .patch(controller.konfirmasiPementor.update);
};
