const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.add = async (req, res) => {
  try {
    const idPencariJodoh = req.params.id;
    let data = checkBodyData(req, res);

    if (data) {
      const resultPJChild = await model.pencariJodohKeluarga.create(data);

      if (resultPJChild) {
        /**
         * Get id result create when create pencarijodohfisik
         * and store to tabel pencari jodoh
         */
        const idData = resultPJChild.dataValues.id;
        data = { id_pencari_jodoh_keluarga: idData };

        const resultPJ = await model.pencariJodoh.update(data, {
          where: {
            id: idPencariJodoh,
          },
        });

        if (resultPJ) {
          response.success(
            res,
            "Berhasil menambahkan data keluarga pencari jodoh",
            resultPJChild,
            201
          );
        } else {
          response.failedChangedData(res, "pencari jodoh");
        }
      } else {
        response.failedInsertData(res, "keluarga pencari jodoh");
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
    const idKeluarga = req.params.id_keluarga;
    const data = checkBodyData(req, res);

    let resultPJ = await model.pencariJodoh.findOne({
      where: {
        id: id,
        id_pencari_jodoh_keluarga: idKeluarga,
      },
    });

    if (resultPJ) {
      if (data) {
        let resultPJChild = await model.pencariJodohKeluarga.update(data, {
          where: {
            id: idKeluarga,
          },
        });

        if (resultPJChild == 1) {
          resultPJChild = await model.pencariJodohKeluarga.findByPk(idKeluarga, {
            include: {
              all: true,
              nested: true,
            },
          });

          response.success(res, "Data keluarga berhasil diubah", resultPJChild);
        } else {
          response.success2(res, "Tidak ada perubahan pada data");
        }
      }
    } else {
      response.notFound(res, "keluarga pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

function checkBodyData(req, res) {
  const data = {
    anak_ke: req.body.anak_ke,
    dari: req.body.dari,
    id_keluarga: req.body.id_keluarga,
  };

  const keysData = Object.keys(data);
  const exceptionData = [];

  if (utils.checkNullBody(res, data, [])) {
    return data;
  }
}

module.exports = controller;
