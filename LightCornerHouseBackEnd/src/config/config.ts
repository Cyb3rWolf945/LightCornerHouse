import dotenv from 'dotenv';

dotenv.config();

/**
 * // assign variable types of string for default value.
 */
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster.8ulinwj.mongodb.net/`;

/**
 * Escolha de porta para o servidor com defeito na porta 1337 só porque sim.
 */
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
