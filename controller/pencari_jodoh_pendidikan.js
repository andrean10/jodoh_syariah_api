const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.add = async (req, res) => {
  try {
    const idPencariJodoh = req.params.id;
    let data = checkBodyData(req, res);

    if (data) {
      const resultPJChild = await model.pencariJodohPendidikan.create(data);

      if (resultPJChild) {
        /**
         * Get id result create when create pencarijodohfisik
         * and store to tabel pencari jodoh
         */
        const idData = resultPJChild.dataValues.id;
        data = { id_pencari_jodoh_pendidikan: idData };

        const resultPJ = await model.pencariJodoh.update(data, {
          where: {
            id: idPencariJodoh,
          },
        });

        if (resultPJ) {
          response.success(
            res,
            "Berhasil menambahkan data pendidikan pencari jodoh",
            resultPJChild,
            201
          );
        } else {
          response.failedChangedData(res, "pencari jodoh");
        }
      } else {
        response.failedInsertData(res, "pendidikan pencari jodoh");
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
    const idPendidikan = req.params.id_pendidikan;
    const data = checkBodyData(req, res);

    let resultPJ = await model.pencariJodoh.findOne({
      where: {
        id: id,
        id_pencari_jodoh_pendidikan: idPendidikan,
      },
    });

    if (resultPJ) {
      if (data) {
        let resultPJChild = await model.pencariJodohPendidikan.update(data, {
          where: {
            id: idPendidikan,
          },
        });

        if (resultPJChild == 1) {
          resultPJChild = await model.pencariJodohPendidikan.findByPk(
            idPendidikan,
            {
              include: {
                all: true,
                nested: true,
              },
            }
          );

          response.success(
            res,
            "Data pendidikan berhasil diubah",
            resultPJChild
          );
        } else {
          response.success2(res, "Tidak ada perubahan pada data");
        }
      }
    } else {
      response.notFound(res, "pendidikan pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

function checkBodyData(req, res) {
  let data = {
    id_pendidikan_terakhir: req.body.id_pendidikan_terakhir,
    sd: req.body.sd,
    smp: req.body.smp,
    sma: req.body.sma,
    d1: req.body.d1,
    d2: req.body.d2,
    d3: req.body.d3,
    s1: req.body.s1,
    s2: req.body.s2,
    s3: req.body.s3,
  };

  const keysData = Object.keys(data);
  const exceptionData = [
    keysData[1],
    keysData[2],
    keysData[3],
    keysData[4],
    keysData[5],
    keysData[6],
    keysData[7],
    keysData[8],
    keysData[9],
  ];

  if (utils.checkNullBody(res, data, exceptionData)) {
    return data;
  }
}

module.exports = controller;
