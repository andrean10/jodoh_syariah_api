const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const moment = require("moment");
const controller = {};

controller.getAll = async (req, res) => {
  try {
    const result = await model.pementor.findAll({
      include: [
        {
          model: model.user,
        },
      ],
      order: [["createdAt", "desc"]],
    });

    if (result.length > 0) {
      response.success(res, "Data pementor berhasil ditampilkan", result);
    } else {
      return response.notFound(res, "pementor");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.getDetail = async (req, res) => {
  try {
    const result = await model.pementor.findOne({
      where: {
        id: req.params.id,
      },
      include: ["User"],
      order: [["createdAt", "desc"]],
    });

    if (result) {
      response.success(res, "Detail pementor berhasil ditampilkan", result);
    } else {
      response.notFound(res, "pementor");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.add = async (req, res) => {
  try {
    const tanggal_lahir = moment(req.body.tanggal_lahir, "DD-MM-YYYY");
    if (!tanggal_lahir.isValid()) {
      return response.failed(res, "Tanggal tidak valid", 400);
    }

    const fileImage = req.files.foto_profile;
    let data = {
      id_users: req.body.id_users,
      nama: req.body.nama,
      gender: req.body.gender,
      tanggal_lahir: formatDate(req.body.tanggal_lahir),
      id_district: req.body.id_district,
      alamat: req.body.alamat,
      location_lat: req.body.location_lat,
      location_long: req.body.location_long,
      createdAt: formatDate(),
    };

    const keysData = Object.keys(data);
    const exceptionData = [keysData[6], keysData[7]];
    if (utils.checkNullBody(res, data, exceptionData)) {
      const result = await model.pementor.findOne({
        where: {
          id_users: data.id_users,
        },
      });

      if (result) {
        return response.failed(
          res,
          "User sudah terdaftar tidak bisa menambahkan biodata",
          409
        );
      } else {
        if (handleImage(res, utils.addImage, data, fileImage)) {
          console.log(data);
          const result = await model.pementor.create(data);
          if (result) {
            response.success2(res, "Berhasil menambahkan biodata", 201);
          } else {
            response.failedInsertData(res, "pementor");
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.edit = async (req, res) => {
  try {
    const tanggal_lahir = moment(req.body.tanggal_lahir, "DD-MM-YYYY");
    if (!tanggal_lahir.isValid()) {
      return response.failed(res, "Tanggal tidak valid", 400);
    }

    const id = req.params.id;
    const data = {
      nama: req.body.nama,
      gender: req.body.gender,
      tanggal_lahir: formatDate(req.body.tanggal_lahir),
      id_district: req.body.id_district,
      alamat: req.body.alamat,
      location_lat: req.body.location_lat,
      location_long: req.body.location_long,
      updateAt: formatDate(),
    };

    const keysData = Object.keys(data);
    const exceptionData = [keysData[5], keysData[6]];

    let result;
    result = await model.pementor.findByPk(id);
    if (result) {
      if (utils.checkNullBody(res, data, exceptionData)) {
        const result = await model.pementor.update(data, {
          where: {
            id: id,
          },
        });

        if (result) {
          response.success2(res, "Berhasil mengubah biodata pementor");
        } else {
          response.failedInsertData(res, "pementor");
        }
      }
    } else {
      response.notFound(res, "pementor");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

controller.editPhoto = async (req, res) => {
  try {
    const id = req.params.id;
    const fileImage = req.files;

    const data = {};

    let result;
    result = await model.pementor.findByPk(id);

    if (result) {
      // cek action apakah edit foto atau hapus foto
      const action = fileImage ? utils.editImage : utils.deleteImage;

      if (handleImage(res, action, data, fileImage)) {
        console.log(data);
        utils.deleteFile(result.foto_profile);
        result = await model.pementor.update(data, {
          where: {
            id: id,
          },
        });

        if (result) {
          response.success2(res, "Berhasil mengubah foto pementor");
        } else {
          response.failedInsertData(res, "pementor");
        }
      }
    } else {
      response.notFound(res, "pementor");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

const formatDate = (date) => {
  if (date) {
    const momentDate = moment(date, "DD-MM-YYYY");
    if (momentDate.isValid()) {
      return momentDate.format("YYYY-MM-DD");
    } else {
      return response.failed(res, "Tanggal tidak valid", 400);
    }
  } else {
    return moment().format("YYYY-MM-DD");
  }
};

const handleImage = async (res, state, data, fileImage) => {
  const fileTypes = /jpeg|jpg|png/;

  switch (state) {
    case 1: // tambah foto
      console.log("tambah Foto");
      if (fileImage) {
        const pathImage = utils.moveFile(
          res,
          fileTypes,
          fileImage,
          2,
          "images"
        );

        if (pathImage) {
          data.foto_profile = pathImage; // push to data array
          // * jika tidak ada masalah lanjutkan pindahkan gambar
          fileImage.mv(utils.path_image + pathImage);
          return true;
        } else {
          response.failed(res, "Kesalahan saat upload gambar!", 500);
          return false;
        }
      } else {
        return true;
      }
      break;
    case 2: // edit Foto
      console.log("Edit Foto");
      const fotoProfile = fileImage.foto_profile;
      if (fotoProfile) {
        const pathImage = utils.moveFile(
          res,
          fileTypes,
          fotoProfile,
          2,
          "images"
        );

        if (pathImage) {
          data.foto_profile = pathImage;
          fotoProfile.mv("./public" + pathImage);
          return true;
        } else {
          response.failed(res, "Kesalahan saat upload gambar!", 500);
          return false;
        }
      } else {
        return true;
      }
      break;
    case 3: // hapus Foto
      console.log("Hapus Foto");
      data.foto_profile = "";
      return true;
      break;
    default:
      break;
  }
};

module.exports = controller;
