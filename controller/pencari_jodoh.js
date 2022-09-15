const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.getAll = async (req, res) => {
  try {
    const result = await model.pencariJodoh.findAll({
      include: [
        {
          model: model.user,
          include: "role",
        },
      ],
    });

    if (result.length > 0) {
      response.success(res, "Data pencari jodoh berhasil ditampilkan", result);
    } else {
      return response.notFound(res, "pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.getDetail = async (req, res) => {
  try {
    let result;
    let message;
    result = await model.pencariJodoh.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: model.pencariJodohBiodata,
          as: "biodata",
          include: [
            // {
            //   model: model.district,
            //   as: "tempat_lahir",
            // },
            model.agama,
            model.suku,
            model.statusPernikahan,
          ],
        },
      ],
    });

    const typeData = req.query.data;
    let id;

    switch (typeData) {
      case "biodata":
        id = result.id_pencari_jodoh_biodata;
        result = await model.pencariJodohBiodata.findOne({
          where: {
            id: id,
          },
          include: {
            all: true,
            nested: true,
          },
        });
        message = "biodata";
        break;
      case "fisik":
        id = result.id_pencari_jodoh_fisik;
        result = await model.pencariJodohFisik.findOne({
          where: {
            id: id,
          },
          include: {
            all: true,
            nested: true,
          },
        });
        message = "fisik";
        break;
      case "pendidikan":
        id = result.id_pencari_jodoh_pendidikan;
        result = await model.pencariJodohPendidikan.findOne({
          where: {
            id: id,
          },
          include: {
            model: model.pendidikan,
            as: "pendidikan_terakhir",
          },
        });
        message = "pendidikan";
        break;
      case "keluarga":
        id = result.id_pencari_jodoh_keluarga;
        result = await model.pencariJodohKeluarga.findOne({
          where: {
            id: id,
          },
          include: {
            all: true,
            nested: true,
          },
        });
        message = "keluarga";
        break;
      case "pekerjaan":
        id = result.id_pencari_jodoh_pekerjaan;
        result = await model.pencariJodohPekerjaan.findOne({
          where: {
            id: id,
          },
        });
        message = "pekerjaan";
        break;
      case "kriteria_pasangan":
        id = result.id_pencari_jodoh_kriteria_pasangan;
        result = await model.pencariJodohKriteriaPasangan.findOne({
          where: {
            id: id,
          },
          include: {
            all: true,
            nested: true,
          },
        });
        message = "kriteria pasangan";
        break;
      default:
        message = "";
        break;
    }

    if (result) {
      response.success(
        res,
        `Detail ${message} pencari jodoh berhasil ditampilkan`,
        result
      );
    } else {
      response.notFound(res, "pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.add = async (req, res) => {
  try {
    const data = {
      id_users: req.body.id_users,
    };

    if (utils.checkNullBody(res, data, {})) {
      const result = await model.pencariJodoh.create(data);

      if (result) {
        response.success(
          res,
          "Berhasil menambahkan data pencari jodoh",
          result,
          201
        );
      } else {
        response.failedInsertData(res, "pencari jodoh");
      }
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

// Update latlong location
controller.update = async (req, res) => {
  try {
    const id = req.params.id;

    const data = {
      location_lat: req.body.location_lat,
      location_long: req.body.location_long,
    };

    if (utils.checkNullBody(res, data, [])) {
      let resultPJ = await model.pencariJodoh.findByPk(id);

      if (resultPJ) {
        resultPJ = await model.pencariJodoh.update(data, {
          where: {
            id: id,
          },
        });
        console.log(resultPJ);

        if (resultPJ) {
          response.success2(
            res,
            "Data lokasi pencari jodoh berhasil diupdate!"
          );
        } else {
          response.failedChangedData(res, "lokasi pencari jodoh");
        }
      } else {
        response.notFound(res, "pencari jodoh");
      }
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

module.exports = controller;
