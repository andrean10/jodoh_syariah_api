const express = require('express');
const app = express();
// const fileUpload = require('express-fileupload');
const logger = require('morgan');   
const PORT = 3000;

// root file
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// dev logger
app.use(logger('dev'));

// use file upload
// app.use(fileUpload());

// all routes
const index = require('./routes/index');
index(app);

// error handlers url
app.use((req, res, next) => {
    const err = new Error('URL Tidak Ditemukan!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}....`);
});