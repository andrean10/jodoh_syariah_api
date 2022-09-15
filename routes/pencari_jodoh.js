const controller = require("../controller/index");

module.exports = (app) => {
  app
    .route("/api/pencarijodoh")
    .get(controller.pencariJodoh.getAll)
    .post(controller.pencariJodoh.add);

  app
    .route("/api/pencarijodoh/:id")
    .get(controller.pencariJodoh.getDetail)
    .patch(controller.pencariJodoh.update);

  app
    .route("/api/pencarijodoh/:id/biodata")
    .post(controller.pencariJodohBiodata.add);

  app
    .route("/api/pencarijodoh/:id/biodata/:id_biodata")
    .put(controller.pencariJodohBiodata.update);

  app
    .route("/api/pencarijodoh/:id/fisik")
    .post(controller.pencariJodohFisik.add);

  app
    .route("/api/pencarijodoh/:id/fisik/:id_fisik")
    .put(controller.pencariJodohFisik.update);

  app
    .route("/api/pencarijodoh/:id/pendidikan")
    .post(controller.pencariJodohPendidikan.add);

  app
    .route("/api/pencarijodoh/:id/pendidikan/:id_pendidikan")
    .put(controller.pencariJodohPendidikan.update);

  app
    .route("/api/pencarijodoh/:id/keluarga")
    .post(controller.pencariJodohKeluarga.add);

  app
    .route("/api/pencarijodoh/:id/keluarga/:id_keluarga")
    .put(controller.pencariJodohKeluarga.update);

  app
    .route("/api/pencarijodoh/:id/pekerjaan")
    .post(controller.pencariJodohPekerjaan.add);

  app
    .route("/api/pencarijodoh/:id/pekerjaan/:id_pekerjaan")
    .put(controller.pencariJodohPekerjaan.update);

  app
    .route("/api/pencarijodoh/:id/kriteria-pasangan")
    .post(controller.pencariJodohKriteriaPasangan.add);

  app
    .route("/api/pencarijodoh/:id/kriteria-pasangan/:id_kriteria_pasangan")
    .put(controller.pencariJodohKriteriaPasangan.update);
};
