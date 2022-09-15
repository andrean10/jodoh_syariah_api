const auth = require("./auth");
const users = require("./users");
const suku = require("./suku");
const statusPernikahan = require("./status_pernikahan");
const tipeBadan = require("./tipe_badan");
const tipeRambut = require("./tipe_rambut");
const warnaKulit = require("./warna_kulit");
const warnaRambut = require("./warna_rambut");
const warnaMata = require("./warna_mata");
const pendidikan = require("./pendidikan");
const pementor = require("./pementor");
const pencariJodoh = require("./pencari_jodoh");
const pilihanPementor = require("./pilihan_pementor");
const konfirmasiPementor = require("./konfirmasi_pementor");
const pilihanPasangan = require("./pilihan_pasangan");
const konfirmasiPasangan = require("./konfirmasi_pasangan");
// const nilai = require('./nilai');
// const status_kehadiran = require('./status_kehadiran');

module.exports = (app) => {
  // route auth
  auth(app);

  // routes user
  users(app);
  pementor(app);
  pencariJodoh(app);

  // route pementor_pencari_jodoh
  pilihanPementor(app);
  konfirmasiPementor(app);

  // routes pencari jodoh dan calon yang dicari
  pilihanPasangan(app);

  // routes calon
  konfirmasiPasangan(app);

  // routes data master
  suku(app);
  statusPernikahan(app);
  tipeBadan(app);
  tipeRambut(app);
  warnaKulit(app);
  warnaRambut(app);
  warnaMata(app);
  pendidikan(app);

  // routes jawaban
  // jawaban(app);

  // routes rekap tugas
  // rekap_tugas(app);

  // routes nilai
  // nilai(app);
};
