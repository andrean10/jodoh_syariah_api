const model = require('../config/model/index');
const response = require('../res');
// const utils = require('../utils/utils');
const controller = {};

controller.getAll = async (req, res) => {
    try {
        const result = await model.user.findAll({
            include: [ 'role' ],
            order: [
                ['createdAt', 'desc']
            ]
        });

        if (result.length > 0) {
            response.success(res, "Data user berhasil ditampilkan", result);
        } else {
            return response.notFound(res, 'users');
        }
    } catch (error) {
        console.log(error);
        response.failed(res, error.message, 500);
    }
}

controller.getDetail = async (req, res) => {
    try {
        const result = await model.user.find({
            where: {
                id: req.params.id
            },
            include: [ 'kehadiran' ]
        });

        if (result.length > 0) {
            response.success(res, 'Detail absensi siswa berhasil ditampilkan', result);
        } else {
            response.notFound(res, 'absensi');
        }
    } catch (error) {
        console.log(error);
        response.failed(res, error.message, 500);
    }
}

// controller.add = async (req, res) => {
//     try {
//         const data = {
//             tanggal_absensi: req.body.tanggal_absensi,
//             id_kelas: req.body.id_kelas
//         }

//         if (data.tanggal_absensi && data.id_kelas) {
//             const result = await model.absensi.findAll({
//                 where: {
//                     tanggal_absensi: data.tanggal_absensi,
//                     id_kelas: data.id_kelas
//                 }
//             });

//             if (result.length === 1) {
//                 return response.failed(res, 'Jadwal absensi sudah dibuat', 409);
//             } else {
//                 await model.absensi.create(data);
//                 response.success2(res, 'Berhasil menambahkan jadwal absensi', 201);
//             }
//         } else {
//             return response.failed(res, 'Resources yang dikirimkan tidak terpenuhi!', 400);
//         }
//     } catch (error) {
//         console.log(error);
//         response.failed(res, error.message, 500);
//     }
// }

// controller.siswaAbsensi = async (req, res) => {
//     try {
//         const fileGambar = req.files.foto_absensi;
//         const data = {
//             id_absensi: req.params.id,
//             id_siswa: req.body.id_siswa,
//             id_status_kehadiran: req.body.id_status_kehadiran
//         }
//         let pathGambar;

//         if (fileGambar) {
//             const fileTypes = /jpeg|jpg|png/;
//             pathGambar = utils.moveFile(res, fileTypes, fileGambar, 1, 'images');
//             data.foto_absensi = pathGambar; // push to data array
//         }

//         const result = await model.detail_absensi.create(data);

//         if (result) {
//             if (fileGambar) {
//                 fileGambar.mv('./public' + pathGambar);
//             }

//             response.success2(res, 'Absensi Siswa Berhasil Disubmit', 201);
//         }
//     } catch (error) {
//         console.log(error);
//         response.failed(res, error.message, 500);
//     }
// }

// controller.edit = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = {
//             tanggal_absensi: req.body.tanggal_absensi,
//             id_kelas: req.body.id_kelas
//         }

//         let result;
//         result = await model.absensi.findByPk(id);
//         if (result) {
//             result = await model.absensi.findAll({
//                 where: {
//                     tanggal_absensi: data.tanggal_absensi,
//                     id_kelas: data.id_kelas
//                 }
//             });

//             if (result.length === 1) {
//                 response.failed(res, 'Jadwal absensi sudah ada', 409);
//             } else {
//                 await model.absensi.update(req.body, {
//                     where: {
//                         id: id,
//                     }
//                 });
//                 response.success2(res, 'Berhasil mengubah jadwal absensi');
//             }
//         } else {
//             response.failed(res, 'Absensi tidak ditemukan!', 404);
//         }

//     } catch (error) {
//         console.log(error);
//         response.failed(res, error.message, 500);
//     }
// }

// controller.delete = async (req, res) => {
//     try {
//         const id = req.params.id;
//         let result;
//         result = await model.absensi.findByPk(id);

//         if (result) {
//             result = await model.absensi.destroy({
//                 where: {
//                     id: id
//                 }
//             });
//             response.success2(res, 'Berhasil menghapus jadwal absensi');
//         } else {
//             response.failed(res, 'Absensi tidak ditemukan!', 404);
//         }
//     } catch (error) {
//         console.log(error);
//         response.failed(res, error.message, 500);
//     }
// }

module.exports = controller;