Pementor: [
  {
    id: 1,
    nama: "Nazruddin Safaat H",
    Pencari_Jodoh: [
      {
        id: 1,
        id_pencari_jodoh_biodata: {
          id: 1,
          nama: "Andrean Ramadhan",
        },
      },
      {
        id: 2,
        id_pencari_jodoh_biodata: {
          id: 2,
          nama: "Armen Satri",
        },
      },
    ],
  },
];

Pencari_Jodoh: [
  {
    id: 1,
    id_pencari_jodoh_biodata: 1,
    Pementor: {
      id: 1,
      nama: "Nazruddin Safaat H",
    },
  },
];

pilihan_pasangan: [
  {
    id: 1,
    pencari_jodoh: {
      id: 1,
      id_pencari_jodoh_biodata: 1,
    },
    konfirmasi_pementor: {
      id: 1,
      id_pilihan_pementor: 1,
      pilihan_pementor: {
        id: 10,
        id_pencari_jodoh: 2,
        pencari_jodoh: {
          id: 2,
          id_biodata: 1,
        },
      },
    },
    status_pilihan: "konfirmasi",
    status_konfirmasi: "diterima",
  },
];
