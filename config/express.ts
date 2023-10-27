import express from 'express';
import { router } from '../api/Routes/helloWorld';

module.exports = () => {
    const app = express();

    app.set('port', 3000);

    app.use('/', router);

    return app;
};