exports.success = (res, message, result, code = 200) => {
  let data = {
    status: code,
    message: message,
  };

  if (result) {
    data.results = result;
  }

  res.status(code);
  res.json(data);
  res.end();
};

exports.succesSingleData = (res, message, values, code = 200) => {
  let data = {
    status: code,
    message: message,
  };

  if (values) {
    data.result = values[0];
  }

  res.status(code);
  res.json(data);
  res.end();
};

exports.success2 = (res, message, code = 200) => {
  let data = {
    status: code,
    message: message,
  };

  res.status(code);
  res.json(data);
  res.end();
};

exports.successNotChanged = (res, table, code = 200) => {
  this.success2(res, `Tidak ada perubahan pada data ${table}`, code);
};

exports.paging = (values, res, code) => {
  const codeResponse = code ? code : 200;

  res.status(codeResponse);
  res.json(values);
  res.end();
};

exports.failed = (res, message, code) => {
  let data = {
    status: code,
    message: message,
  };

  res.status(code);
  res.json(data);
  res.end();
  return;
};

exports.serverError = (res, values) => {
  let data = {
    status: 500,
    values: values,
  };

  res.status(500);
  res.json(data);
  res.end();
  return;
};

exports.nestedJSON = (values, res) => {
  // lakukan akumulasi
  const result = values.reduce((acc, item) => {
    acc.forEach((v) => {
      console.log(`Acc ${acc}`);
    });

    console.log(`item Nama : ${item.nama}`);

    // tentukan key group
    if (acc[item.nama]) {
      // buat variabel group nama mahasiswa
      const group = acc[item.nama];

      console.log(`group matkul sebelum : ${group.matakuliah}`);
      // cek jika isi array adalah matakuliah
      if (Array.isArray(group.matakuliah)) {
        // tambahkan value baru ke dalam group matakuliah
        group.matakuliah.push(item.matakuliah);
      } else {
        group.matakuliah = [group.matakuliah, item.matakuliah];
      }
      console.log(`group matkul setelah di ubah : ${group.matakuliah}`);
    } else {
      acc[item.nama] = item;
      console.log(acc[item.nama]);
    }
    return acc;
  }, {});

  var data = {
    status: 200,
    values: result,
  };

  res.status(200);
  res.json(data);
  res.end();
};

exports.badRequest = (res) => {
  return this.failed(res, "Bad Request!", 400);
};

exports.notFound = (res, table) => {
  return this.failed(res, `Data ${table} tidak ditemukan`, 404);
};

exports.notNumeric = (res) => {
  return this.failed(res, "Parameter tidak valid!", 400);
};

exports.failedInsertData = (res, table) => {
  return this.failed(res, `Gagal menambahkan data ${table}`, 409);
};

exports.failedChangedData = (res, table) => {
  return this.failed(res, `Gagal mengubah data ${table}`, 409);
};

exports.failedDeleteData = (res, table, code) => {
  return this.failed(res, `Gagal menghapus ${table}`, code);
};
