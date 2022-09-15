let Sequelize = require('sequelize');
let conn = new Sequelize('jodoh_syariah', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

// let conn = new Sequelize('0cissduqoH', '0cissduqoH', 'Ytee7z6rr4', {
//     dialect: 'mysql',
//     host: 'remotemysql.com'
// });

module.exports = conn;