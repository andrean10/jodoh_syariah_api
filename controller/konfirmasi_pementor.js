const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.getAll = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.query.status;

    let result;

    switch (status) {
      case "menunggu":
        result = await model.pilihanPementor.findAll({
          where: {
            id_pementor: id,
            status_pilihan: status,
          },
          include: [
            {
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
          ],
        });
        break;
      case "diterima":
        result = await model.konfirmasiPementor.findAll({
          where: {
            "$pilihan_pementor.id_pementor$": id,
            status_konfirmasi: status,
          },
          include: [
            {
              model: model.pilihanPementor,
              include: {
                model: model.pencariJodoh,
                include: {
                  model: model.pencariJodohBiodata,
                  as: "biodata",
                },
              },
            },
          ],
        });
        break;
      default:
        response.failed(res, "Parameter yang dikirim tidak valid!", 400);
        break;
    }

    if (result.length > 0) {
      response.success(
        res,
        "Data asuhan pencari jodoh berhasil ditampilkan",
        result
      );
    } else {
      return response.notFound(res, "asuhan pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.getAllFromPJ = async (req, res) => {
  try {
    const id = req.params.id;

    const where = {
      '$pilihan_pementor.id_pencari_jodoh$': id
    }

    const result = await model.konfirmasiPementor.findAll({
      where,
      include: [
        {
          model: model.pilihanPementor,
          include: [
            model.pementor
            // {
            //   model: model.pencariJodohBiodata,
            //   as: "biodata",
            //   include: {
            //     all: true,
            //     nested: true,
            //   },
            // },
          ],
        },
      ],
    });

    if (result.length > 0) {
      response.success(
        res,
        "Data konfirmasi pementor berhasil ditampilkan",
        result
      );
    } else {
      return response.notFound(res, "konfirmasi pementor");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.add = async (req, res) => {
  try {
    const data = {
      id_pilihan_pementor: req.body.id_pilihan_pementor,
      status_konfirmasi: req.body.status_konfirmasi,
    };

    if (utils.checkNullBody(res, data, {})) {
      const resultKonfirmasi = await model.konfirmasiPementor.create(data);

      if (resultKonfirmasi) {
        // success add konfirmasi pementor
        const resultPilihan = await model.pilihanPementor.update(
          {
            status_pilihan: "konfirmasi",
          },
          {
            where: {
              id: data.id_pilihan_pementor,
            },
          }
        );

        if (resultPilihan == 1) {
          response.success(
            res,
            "Berhasil mengkonfirmasi permintaan pencari jodoh",
            resultKonfirmasi,
            201
          );
        } else {
          response.success2(res, "Tidak ada perubahan pada data");
        }
      } else {
        response.failedInsertData(res, "konfirmasi pementor");
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
    let result;

    const data = {
      id_status_pementor: req.body.id_status_pementor,
    };

    if (utils.checkNullBody(res, data, [])) {
      result = await model.konfirmasiPementor.findByPk(id);

      if (result) {
        result = await model.konfirmasiPementor.update(data, {
          where: {
            id: id,
          },
        });

        if (result == 1) {
          response.success(res, "Status pementor berhasil diubah!", result);
        } else {
          response.failedChangedData(res, "status pementor");
        }
      } else {
        response.notFound(res, "konfirmasi pementor");
      }
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

module.exports = controller;
