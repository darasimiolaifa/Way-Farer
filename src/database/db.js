import { config } from 'dotenv';
import { Pool } from 'pg';

config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DATABASE_URL;
} else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DEV_DATABASE_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}


const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  console.log('Database connected');
  console.log(process.env.DATABASE_URL);
});

const createTables = () => {
  const sql = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS bookings CASCADE;
  DROP TABLE IF EXISTS trips CASCADE;
  DROP TABLE IF EXISTS buses CASCADE;
  DROP TYPE IF EXISTS trip_status;
  
  CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(120) NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
  );
  
  CREATE TABLE buses(
    bus_id SERIAL PRIMARY KEY,
    number_plate VARCHAR(10) NOT NULL,
    manufacturer VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year VARCHAR(4) NOT NULL,
    capacity INTEGER NOT NULL
  );
  
  CREATE TYPE trip_status AS ENUM ('active', 'cancelled');
  
  CREATE TABLE trips(
    trip_id SERIAL PRIMARY KEY,
    bus_id INTEGER NOT NULL,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    trip_date DATE NOT NULL,
    fare FLOAT NOT NULL,
    status trip_status DEFAULT 'active',
    FOREIGN KEY(bus_id) REFERENCES buses(bus_id)
  );
  
  CREATE TABLE bookings(
    booking_id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE,
    seat_number INTEGER NOT NULL,
    FOREIGN KEY(trip_id) REFERENCES trips(trip_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
  );
  
  INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES('Dara', 'Kunle', 'dakoloz@wayfarer.com', '$2a$10$GjnSwcQvJzW25spTGqBuq.0nhGwaI2au8kZ/cvz5NYrHhIMCrdHW.', true);
  INSERT INTO buses(number_plate, manufacturer, model, year, capacity) VALUES('W42XD', 'Toyota', 'Hiace', '2010', 18);
  INSERT INTO trips(bus_id, origin, destination, trip_date, fare) VALUES(1, 'Lagos', 'Ibadan', '2020-04-19T02:15:51.021Z', 1000.75);
  `;
  
  pool.query(sql)
    .then(() => {
      pool.end();
      console.log('Tables Created');
    })
    .catch((error) => {
      pool.end();
      throw new Error(error);
    });
};

createTables();
