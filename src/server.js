import '@babel/polyfill';
import express from 'express';
import addAuthRoutes from './routes/authRoutes';
import addUserRoutes from './routes/userRoutes';
import addBusRoutes from './routes/busRoutes';
import addTripRoutes from './routes/tripRoutes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

addAuthRoutes(server);
addUserRoutes(server);
addBusRoutes(server);
addTripRoutes(server);

export default server;
