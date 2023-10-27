import express from 'express';
const router = require('../api/routes/helloWorld')();

module.exports = () => {
    const app = express();

    app.set('port', 3000);

    app.use('/', router);

    return app;
};