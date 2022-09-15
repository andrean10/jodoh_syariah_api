const model = require("../config/model/index");
const response = require("../res");
const utils = require("../utils/utils");
const controller = {};

controller.add = async (req, res) => {
  try {
    // id dari users
    const idUser = req.params.id;
    let data = checkBodyData(req, res);

    console.log(`Id User = ${idUser}`);

    if (data) {
      const resultPJBiodata = await model.pencariJodohBiodata.create(data);

      if (resultPJBiodata) {
        /**
         * cek jika data pencari jodoh tidak ada maka tambahkan data pencari jodoh
         * di tabel pencari_jodoh
         */
        // let resultPJ = await model.pencariJodoh.findByPk(idUser);

        const idBiodata = resultPJBiodata.dataValues.id; // ambil id tabel biodata
        data = {
          id_pencari_jodoh_biodata: idBiodata,
          id_users: idUser
        };

        // jika tidak ada data pencari jodoh tambahkan
        // if (!resultPJ) {
        // data.id_users = idUser;
        const resultPJ = await model.pencariJodoh.create(data);

        // cek result
        if (resultPJ) {
          response.success(
            res,
            "Berhasil menambahkan biodata pencari jodoh",
            resultPJ,
            201
          );
        } else {
          response.failedInsertData(res, "pencari jodoh");
        }
        // } else {
        //   // jika ada update data pencari jodoh
        //   resultPJ = await model.pencariJodoh.update(data, {
        //     where: {
        //       id_users: idUser,
        //     },
        //   });

        //   if (resultPJ) {
        //     response.success(
        //       res,
        //       "Berhasil menambahkan biodata pencari jodoh",
        //       resultPJBiodata,
        //       201
        //     );
        //   } else {
        //     response.failedChangedData(res, "pencari jodoh");
        //   }
        // }
      } else {
        response.failedInsertData(res, "biodata pencari jodoh");
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
    const idBiodata = req.params.id_biodata;
    const data = checkBodyData(req, res);

    let resultPJ = await model.pencariJodoh.findOne({
      where: {
        id: id,
        id_pencari_jodoh_biodata: idBiodata,
      },
    });

    if (resultPJ) {
      if (data) {
        let resultPJBiodata = await model.pencariJodohBiodata.update(data, {
          where: {
            id: idBiodata,
          },
        });

        if (resultPJBiodata == 1) {
          resultPJBiodata = await model.pencariJodohBiodata.findByPk(
            idBiodata,
            {
              include: {
                all: true,
                nested: true,
              },
            }
          );
          response.success(res, "Biodata berhasil diubah", resultPJBiodata);
        } else {
          response.success2(res, "Tidak ada perubahan pada data");
        }
      }
    } else {
      response.notFound(res, "biodata pencari jodoh");
    }
  } catch (error) {
    console.log(error);
    response.failed(res, error.message, 500);
  }
};

function checkBodyData(req, res) {
  const tanggal_lahir = utils.formatDate(res, req.body.tanggal_lahir);

  const data = {
    nama: req.body.nama,
    tanggal_lahir: tanggal_lahir,
    gender: req.body.gender,
    id_district: req.body.id_district,
    tempat_lahir: req.body.tempat_lahir,
    alamat: req.body.alamat,
    id_suku: req.body.id_suku,
    id_agama: req.body.id_agama,
    hobi: req.body.hobi,
    id_status_pernikahan: req.body.id_status_pernikahan,
    tentang: req.body.tentang,
  };

  const keysData = Object.keys(data);
  const exceptionData = [keysData[7], keysData[8]];

  if (utils.checkNullBody(res, data, exceptionData)) {
    return data;
  }
}

module.exports = controller;
