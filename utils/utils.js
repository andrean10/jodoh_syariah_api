const response = require("../res");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

const utils = {};

utils.path_image = "./public";

utils.addImage = 1;
utils.editImage = 2;
utils.deleteImage = 3;

utils.moveFile = (res, fileTypes, file, maxSize, folder) => {
  // Cek file
  const filename = file.name;
  const size = file.size;
  const extension = path.extname(filename);

  // check extensions
  const extname = fileTypes.test(extension.toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (!extname && !mimetype) {
    response.failed(res, `File ${folder} tidak di dukung!`, 400);
    return null;
  }

  if (size > maxSize * 1024 * 1024) {
    response.failed(res, `File harus kecil dari ${maxSize} MB`, 400);
    return null;
  }

  // mengubah nama original file
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `/${folder}/${uniqueSuffix}${path.extname(filename)}`;
};

utils.deleteFile = (url) => {
  fs.unlink("./public" + url, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Berkas file telah dihapus!`);
    }
  });
};

utils.formatDate = (res, date) => {
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

utils.checkNullBody = (res, data, exceptionData) => {
  if (data) {
    console.log(data);
    console.log(exceptionData);

    for (const e in data) {
      const element = data[e];
  
      // body null
      if (!element) {
        const findData = exceptionData.find((exData) => exData === e);

        if (!findData) {
          response.failed(res, "Resources yang dikirimkan tidak terpenuhi!", 400);
          return false;
        }
      }
    } 
  } else {
    response.failed(res, "Resources yang dikirimkan tidak terpenuhi!", 400);
        return false;
  }
  return true;
};

module.exports = utils;
