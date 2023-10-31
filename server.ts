import { app } from './src/config/express';
import config from './config.json';

const PORT = config.server.port;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
