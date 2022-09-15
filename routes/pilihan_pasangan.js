const controller = require("../controller/index");

module.exports = (app) => {
  app
    .route("/api/pilihan-pasangan")
    .get(controller.pilihanPasangan.getAll)
    .post(controller.pilihanPasangan.add);

  // from pencari jodoh
  app.route('/api/pencari-jodoh/:id/pilihan-pasangan')
    .get(controller.pilihanPasangan.getAllByPJ)

  app.route("/api/pilihan-pasangan/:id").put(controller.pilihanPasangan.update);
};
