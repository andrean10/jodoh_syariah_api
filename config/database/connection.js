let Sequelize = require('sequelize');
let conn = new Sequelize('jodoh_syariah', 'root', 'root', {
    dialect: 'mysql',
    host: "127.0.0.1",
    connectionLimit: 10,
    port: "8889",
});

// let conn = new Sequelize('0cissduqoH', '0cissduqoH', 'Ytee7z6rr4', {
//     dialect: 'mysql',
//     host: 'remotemysql.com'
// });

module.exports = conn;