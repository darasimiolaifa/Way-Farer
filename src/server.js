import '@babel/polyfill';
import express from 'express';
import addAuthRoutes from './routes/authRoutes';
import addUserRoutes from './routes/userRoutes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

addAuthRoutes(server);
addUserRoutes(server);

export default server;
