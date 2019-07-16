import '@babel/polyfill';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import addAuthRoutes from './routes/authRoutes';
import addUserRoutes from './routes/userRoutes';
import addBusRoutes from './routes/busRoutes';
import addTripRoutes from './routes/tripRoutes';
import addBookingRoutes from './routes/bookingRoutes';

const docs = require('./wayfarer.json');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(docs));

addAuthRoutes(server);
addUserRoutes(server);
addBusRoutes(server);
addTripRoutes(server);
addBookingRoutes(server);

export default server;
