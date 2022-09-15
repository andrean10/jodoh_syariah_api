const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.add = async (req, res) => {
  try {
    const idPencariJodoh = req.params.id;
    let data = checkBodyData(req, res);

    if (data) {
      const resultPJChild = await model.pencariJodohFisik.create(data);

      if (resultPJChild) {
        /**
         * Get id result create when create pencarijodohfisik
         * and store to tabel pencari jodoh
         */
        const idData = resultPJChild.dataValues.id;
        data = { id_pencari_jodoh_fisik: idData };

        const resultPJ = await model.pencariJodoh.update(data, {
          where: {
            id: idPencariJodoh,
          },
        });

        if (resultPJ) {
          response.success(
            res,
            "Berhasil menambahkan data fisik pencari jodoh",
            resultPJChild,
            201
          );
        } else {
          response.failedChangedData(res, "pencari jodoh");
        }
      } else {
        response.failedInsertData(res, "fisik pencari jodoh");
      }
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.update = async (req, res) => {
  try {
    const id = req.params.id;
    const idFisik = req.params.id_fisik;
    const data = checkBodyData(req, res);

    let resultPJ = await model.pencariJodoh.findOne({
      where: {
        id: id,
        id_pencari_jodoh_fisik: idFisik,
      },
    });

    if (resultPJ) {
      if (data) {
        let resultPJChild = await model.pencariJodohFisik.update(data, {
          where: {
            id: idFisik,
          },
        });

        if (resultPJChild == 1) {
          resultPJChild = await model.pencariJodohFisik.findByPk(idFisik, {
            include: {
              all: true,
              nested: true,
            },
          });
          response.success(res, "Data fisik berhasil diubah", resultPJChild);
        } else {
          response.success2(res, "Tidak ada perubahan pada data");
        }
      }
    } else {
      response.notFound(res, "fisik pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

function checkBodyData(req, res) {
  const data = {
    id_tipe_badan: req.body.id_tipe_badan,
    id_warna_kulit: req.body.id_warna_kulit,
    id_tipe_rambut: req.body.id_tipe_rambut,
    id_warna_rambut: req.body.id_warna_rambut,
    id_warna_mata: req.body.id_warna_mata,
    tinggi_badan: req.body.tinggi_badan,
    berat_badan: req.body.berat_badan,
    riwayat_penyakit: req.body.riwayat_penyakit,
    cacat_fisik: req.body.cacat_fisik,
  };

  const keysData = Object.keys(data);
  const exceptionData = [keysData[7], keysData[8]];

  if (utils.checkNullBody(res, data, exceptionData)) {
    return data;
  }
}

module.exports = controller;
