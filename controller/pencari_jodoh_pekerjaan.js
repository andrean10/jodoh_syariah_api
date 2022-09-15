const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.add = async (req, res) => {
  try {
    const idPencariJodoh = req.params.id;
    let data = checkBodyData(req, res);

    if (data) {
      const resultPJChild = await model.pencariJodohPekerjaan.create(data);

      if (resultPJChild) {
        /**
         * Get id result create when create pencarijodohfisik
         * and store to tabel pencari jodoh
         */
        const idData = resultPJChild.dataValues.id;
        data = { id_pencari_jodoh_pekerjaan: idData };

        const resultPJ = await model.pencariJodoh.update(data, {
          where: {
            id: idPencariJodoh,
          },
        });

        if (resultPJ) {
          response.success(
            res,
            "Berhasil menambahkan data pekerjaan pencari jodoh",
            resultPJChild,
            201
          );
        } else {
          response.failedChangedData(res, "pencari jodoh");
        }
      } else {
        response.failedInsertData(res, "pekerjaan pencari jodoh");
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
    const idPekerjaan = req.params.id_pekerjaan;
    const data = checkBodyData(req, res);

    let resultPJ = await model.pencariJodoh.findOne({
      where: {
        id: id,
        id_pencari_jodoh_pekerjaan: idPekerjaan,
      },
    });

    if (resultPJ) {
      if (data) {
        resultPJChild = await model.pencariJodohPekerjaan.update(data, {
          where: {
            id: idPekerjaan,
          },
        });

        if (resultPJChild == 1) {
          resultPJChild = await model.pencariJodohPekerjaan.findByPk(idPekerjaan);
          response.success(
            res,
            "Data pekerjaan berhasil diubah",
            resultPJChild
          );
        } else {
          response.success2(res, "Tidak ada perubahan pada data");
        }
      }
    } else {
      response.notFound(res, "pekerjaan pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

function checkBodyData(req, res) {
  const data = {
    pekerjaan: req.body.pekerjaan,
    deskripsi_pekerjaan: req.body.deskripsi_pekerjaan,
  };

  const keysData = Object.keys(data);
  const exceptionData = [keysData[1]];

  if (utils.checkNullBody(res, data, exceptionData)) {
    return data;
  }
}

module.exports = controller;
