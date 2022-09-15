const model = require("../config/model/index");
const response = require("../res");
const controller = {};

controller.getAll = async (req, res) => {
  try {
    const result = await model.statusPernikahan.findAll();
    if (result) {
      response.success(res, "Data status pernikahan berhasil ditampilkan", result);
    } else {
      response.notFound(res, "status pernikahan")
    }
  } catch (error) {
    response.failed(res, error.message, 500);
  }
};

module.exports = controller;
