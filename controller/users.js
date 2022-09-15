const model = require("../config/model/index");
const response = require("../res");
// const utils = require('../utils/utils');
const controller = {};

controller.getAll = async (req, res) => {
  try {
    const result = await model.user.findAll({
      include: ["role"],
      order: [["createdAt", "desc"]],
    });

    if (result.length > 0) {
      response.success(res, "Data user berhasil ditampilkan", result);
    } else {
      return response.notFound(res, "users");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.getDetail = async (req, res) => {
  try {
    const result = await model.user.findAll({
      where: {
        id: req.params.id,
      },
      include: ["role"],
      order: [["createdAt", "desc"]],
    });

    if (result.length > 0) {
      response.success(res, "Detail user berhasil ditampilkan", result);
    } else {
      response.notFound(res, "user");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

// * Ganti nomor telepon
controller.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const no_handphone = req.body.no_handphone;

    let result;
    result = await model.user.findByPk(id);
    if (result) {
      result = await model.user.update(no_handphone, {
        where: {
          id: id,
        },
      });
      response.success2(res, "Berhasil mengubah jadwal users");
    } else {
      response.notFound(res, "user");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.delete = async (req, res) => {
  try {
    const id = req.params.id;

    let result;
    result = await model.user.findOne({
      where: {
        id: req.params.id,
      },
      include: ["role"],
    });

    // * Get name role
    const nameRole = result.dataValues.role.nama_role.toLowerCase();

    if (result) {
      result = await model.user.destroy({
        where: {
          id: id,
        },
      });
      response.success2(res, `Berhasil menghapus ${nameRole}`);
    } else {
      response.notFound(res, nameRole);
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

module.exports = controller;
