const model = require("../config/model/index");
const response = require("../res");
const controller = {};

controller.getAll = async (req, res) => {
  try {
    const result = await model.warnaMata.findAll();
    if (result) {
      response.success(res, "Data warna mata berhasil ditampilkan", result);
    } else {
      response.notFound(res, "warna mata")
    }
  } catch (error) {
    response.failed(res, error.message, 500);
  }
};

module.exports = controller;
