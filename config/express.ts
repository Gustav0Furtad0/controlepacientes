import express from 'express';
import bodyParser from 'body-parser';

module.exports = () => {
    const app = express();

    app.set('port', 3000);

    const helloRoute = require('../api/Routes/helloWorld');
    app.use('/', helloRoute);

    return app;
};