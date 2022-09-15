const controller = require("../controller/index");

module.exports = (app) => {
  app
    .route("/api/pencari-jodoh/:id/pilihan-pementor")
    .get(controller.pilihanPementor.getAllByPJ);

  app
    .route("/api/pementor/:id/pilihan-pementor")
    .get(controller.pilihanPementor.getAllPilihanPementorByPementor);

  app
    .route("/api/pilihan-pementor")
    .post(controller.pilihanPementor.addPilihanPementor);
};
