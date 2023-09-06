import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import HouseRoutes from './routes/House';
const cors = require('cors');

const router = express();

/**
 * Antes de fazer qualquer coisa temos de abrir conexão a base dados (ligação mongo)
 */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to mongoDB.');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect');
        Logging.error(error);
    });

/**
 * só começa o serer caso seja possivel conectar ao mongoDB.
 */
const startServer = () => {
    router.use((req, res, next) => {
        /**
         * LOG THE REQUEST
         */
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true, limit: '25mb' }));
    router.use(express.json({ limit: '25mb' }));

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /**
     * ROUTES
     */

    router.use(cors());
    router.use('/Houses', HouseRoutes);

    /**
     * ROUTE CHECK HEALTH
     */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /**
     * ERROR HANDLING ROUTE
     */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`SERVER IS RUNNING ON PORT :  ${config.server.port}.`));
};
