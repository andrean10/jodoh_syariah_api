const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.login = async (req, res) => {
  try {
    const data = {
      no_handphone: req.body.no_handphone,
    };

    if (utils.checkNullBody(res, data, [])) {
      const result = await model.user.findOne({
        where: {
          no_handphone: data.no_handphone,
        },
      });

      if (result) {
        const idUser = result.dataValues.id;
        const idRole = result.dataValues.id_role;

        let formatResult;
        let resultChild;
        switch (idRole) {
          case 2:
            resultChild = await model.pementor.findOne({
              where: {
                id_users: idUser,
              },
            });
            formatResult = {
              user: result,
              pementor: resultChild,
            };
            break;
          case 3:
            resultChild = await model.pencariJodoh.findOne({
              where: {
                id_users: idUser,
              },
              // include: {
              //   model: model.pencariJodohBiodata,
              //   as: "biodata",
              // },
              include: ["biodata"],
            });
            formatResult = {
              user: result,
              pencari_jodoh: resultChild,
            };
            break;
          default:
            break;
        }

        response.success(res, "Login berhasil!", formatResult);
      } else {
        response.failed(res, "Nomor handphone belum terdaftar", 404);
      }
    } else {
      response.badRequest(res);
    }
  } catch (error) {
    response.failed(res, error.message, 500);
  }
};

controller.changeOTP = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      otp: req.body.otp,
    };

    const keysData = Object.keys(data);
    const exceptionData = [keysData[1]];

    if (utils.checkNullBody(res, data, exceptionData)) {
      let result;
      result = await model.user.findOne({
        where: {
          id: id,
        },
      });

      if (result) {
        result = await model.user.update(data, {
          where: {
            id: id,
          },
        });

        if (result) {
          response.success2(res, "Data terbaru user berhasil disimpan");
        } else {
          response.failedChangedData(res, "user");
        }
      } else {
        response.failed(res, "Nomor handphone belum terdaftar", 404);
      }
    } else {
      response.badRequest(res);
    }
  } catch (error) {
    response.failed(res, error.message, 500);
  }
};

controller.register = async (req, res) => {
  try {
    let data = {
      id_role: req.body.id_role,
      no_handphone: req.body.no_handphone,
      otp: req.body.otp,
    };

    if (utils.checkNullBody(res, data, {})) {
      let result = await model.user.findOne({
        where: {
          no_handphone: data.no_handphone,
        },
      });

      if (result) {
        response.failed(res, "Nomor telpon sudah digunakan", 409);
      } else {
        result = await model.user.create(data);
        if (result) {
          response.success(res, "Berhasil menambahkan data user", result, 201);
        } else {
          response.failedInsertData(res, "user");
        }
      }
    } else {
      response.badRequest(res);
    }
  } catch (error) {
    response.failed(res, error.message, 500);
  }
};

module.exports = controller;
