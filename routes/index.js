// const auth = require('./auth');
const users = require('./users');
// const siswa = require('./siswa');
// const absensi = require('./absensi');
// const kelas = require('./kelas');
// const mapel = require('./mapel');
// const soal = require('./soal');
// const jawaban = require('./jawaban');
// const rekap_tugas = require('./rekap_tugas');
// const nilai = require('./nilai');
// const status_kehadiran = require('./status_kehadiran');

module.exports = (app) => {

    // route auth
    // auth(app);

    // routes user
    users(app);
    // siswa(app);
    // kelas(app);

    // routes absensi
    // absensi(app);
    // status_kehadiran(app);

    // routes mata pelajaran
    // mapel(app);

    // routes soal
    // soal(app);

    // routes jawaban
    // jawaban(app);

    // routes rekap tugas
    // rekap_tugas(app);

    // routes nilai
    // nilai(app);
}