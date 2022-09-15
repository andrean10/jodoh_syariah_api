const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.add = async (req, res) => {
  try {
    const idPencariJodoh = req.params.id;
    let data = checkBodyData(req, res);

    if (data) {
      const resultPJChild = await model.pencariJodohKriteriaPasangan.create(
        data
      );

      if (resultPJChild) {
        /**
         * Get id result create when create pencarijodohfisik
         * and store to tabel pencari jodoh
         */
        const idData = resultPJChild.dataValues.id;
        data = { id_pencari_jodoh_kriteria_pasangan: idData };

        const resultPJ = await model.pencariJodoh.update(data, {
          where: {
            id: idPencariJodoh,
          },
        });

        if (resultPJ) {
          response.success(
            res,
            "Berhasil menambahkan data kriteria pasangan pencari jodoh",
            resultPJChild,
            201
          );
        } else {
          response.failedChangedData(res, "pencari jodoh");
        }
      } else {
        response.failedInsertData(res, "kriteria pasangan pencari jodoh");
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
    const idKriteriaPasangan = req.params.id_kriteria_pasangan;
    const data = checkBodyData(req, res);

    let resultPJ = await model.pencariJodoh.findOne({
      where: {
        id: id,
        id_pencari_jodoh_kriteria_pasangan: idKriteriaPasangan,
      },
    });

    if (resultPJ) {
      if (data) {
        let resultPJChild = await model.pencariJodohKriteriaPasangan.update(
          data,
          {
            where: {
              id: idKriteriaPasangan,
            },
          }
        );

        if (resultPJChild == 1) {
          resultPJChild = await model.pencariJodohKriteriaPasangan.findByPk(
            idKriteriaPasangan,
            {
              include: {
                all: true,
                nested: true,
              },
            }
          );
          response.success(
            res,
            "Data kriteria pasangan berhasil diubah",
            resultPJChild
          );
        } else {
          response.success2(res, "Tidak ada perubahan pada data");
        }
      }
    } else {
      response.notFound(res, "kriteria pasangan pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

function checkBodyData(req, res) {
  const data = {
    id_tipe_badan: req.body.id_tipe_badan,
    warna_kulit: req.body.warna_kulit,
    tinggi_badan: req.body.tinggi_badan,
    berat_badan: req.body.berat_badan,
    usia: req.body.usia,
    domisili: req.body.domisili,
    suku: req.body.suku,
    pendidikan: req.body.pendidikan,
    sifat: req.body.sifat,
    status_pernikahan: req.body.status_pernikahan,
    informasi_tambahan: req.body.informasi_tambahan,
  };

  const keysData = Object.keys(data);
  const exceptionData = [keysData[8], keysData[10]];

  if (utils.checkNullBody(res, data, exceptionData)) {
    return data;
  }
}

module.exports = controller;
