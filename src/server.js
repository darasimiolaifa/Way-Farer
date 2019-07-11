import '@babel/polyfill';
import express from 'express';
import addAuthRoutes from './routes/authRoutes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

addAuthRoutes(server);

export default server;
