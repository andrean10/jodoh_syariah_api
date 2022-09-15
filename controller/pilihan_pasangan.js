const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.getAll = async (req, res) => {
  try {
    const id = req.params.id;
    const idPencariJodoh = req.query.id_pencari_jodoh;
    const idCalon = req.query.id_calon;
    let where;

    if (idPencariJodoh) {
      where = {
        "$konfirmasi_pementor.pilihan_pementor.id_pencari_jodoh$":
          idPencariJodoh,
      };
    } else if (idCalon) {
      where = {
        id_pencari_jodoh: idCalon,
      };
    } else {
      response.failed(res, "Parameter tidak valid!", 400);
    }

    const result = await model.pilihanPasangan.findAll({
      where,
      include: [
        {
          model: model.konfirmasiPementor,
          include: {
            model: model.pilihanPementor,
          },
        },
        {
          model: model.pencariJodoh,
          as: "calon",
          include: [{ model: model.pencariJodohBiodata, as: "biodata" }],
        },
      ],
      order: [["createdAt", "desc"]],
    });

    if (result.length > 0) {
      response.success(res, "Data history calon berhasil ditampilkan", result);
    } else {
      return response.notFound(res, "history calon");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.getAllByPJ = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await model.pilihanPasangan.findAll({
      where: {
        id_pencari_jodoh: id,
        status_pilihan: "menunggu",
      },
      include: [
        {
          model: model.pencariJodoh,
          include: {
            model: model.pencariJodohBiodata,
            as: "biodata",
            include: {
              all: true,
              nested: true,
            },
          },
        },
      ],
      order: [["createdAt", "desc"]],
    });

    if (result.length > 0) {
      response.success(res, "Data history calon berhasil ditampilkan", result);
    } else {
      return response.notFound(res, "history calon");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.add = async (req, res) => {
  try {
    const data = {
      id_pencari_jodoh: req.body.id_pencari_jodoh,
      id_konfirmasi_pementor: req.body.id_konfirmasi_pementor,
    };

    if (utils.checkNullBody(res, data, {})) {
      const result = await model.pilihanPasangan.create(data);

      if (result) {
        response.success(
          res,
          "Berhasil menambahkan calon pilihan pasangan",
          result,
          201
        );
      } else {
        response.failedInsertData(res, "pilihan pasangan");
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
    const data = {
      status_pilihan: req.body.status_pilihan,
      status_konfirmasi: req.body.status_konfirmasi,
    };

    let result;

    if (utils.checkNullBody(res, data, {})) {
      result = await model.pilihanPasangan.findByPk(id);

      if (result) {
        result = await model.pilihanPasangan.update(data, {
          where: {
            id: id,
          },
        });

        if (result == 1) {
          result = await model.pilihanPasangan.findByPk(id);

          response.success(
            res,
            "Berhasil mengkonfirmasi status pilihan pasangan",
            result,
            201
          );
        } else {
          response.success2(res, "Tidak ada perubahan pada data");
        }
      } else {
        response.notFound(res, "pilihan pasangan");
      }
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

module.exports = controller;
