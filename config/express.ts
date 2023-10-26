import express from 'express';

module.exports = () => {
    const app = express();

    app.set('port', 3000);

    const helloRoute = require('../api/Routes/helloWorld');
    app.use('/', helloRoute);

    return app;
};