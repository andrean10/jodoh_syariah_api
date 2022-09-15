const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.getAllByPJ = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await model.pilihanPementor.findAll({
      where: {
        id_pencari_jodoh: id,
        status_pilihan: "menunggu",
      },
      include: [model.pementor],
    });

    if (result.length > 0) {
      response.success(
        res,
        "Data history pementor berhasil ditampilkan",
        result
      );
    } else {
      return response.notFound(res, "history pementor");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.getAllPilihanPementorByPementor = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await model.pilihanPementor.findAll({
      where: {
        id_pementor: id,
      },
      include: {
        model: model.pencariJodoh,
        include: [
          {
            model: model.pencariJodohBiodata,
            as: "biodata",
            include: {
              all: true,
              nested: true,
            },
          },
        ],
      },
    });

    if (result.length > 0) {
      response.success(
        res,
        "Data history pilihan pencari jodoh berhasil ditampilkan",
        result
      );
    } else {
      return response.notFound(res, "history pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.addPilihanPementor = async (req, res) => {
  try {
    const data = {
      id_pencari_jodoh: req.body.id_pencari_jodoh,
      id_pementor: req.body.id_pementor,
    };

    if (utils.checkNullBody(res, data, {})) {
      const result = await model.pilihanPementor.create(data);

      if (result) {
        response.success(
          res,
          "Berhasil menambahkan pilihan pementor",
          result,
          201
        );
      } else {
        response.failedInsertData(res, "pilihan pementor");
      }
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

module.exports = controller;
