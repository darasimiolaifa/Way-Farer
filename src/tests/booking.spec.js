import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

let user;
let token;
let bookingId;

describe('Booking Routes', () => {
  user = {
    email: 'dakoloz@wayfarer.com',
    password: 'yppZgpjXNl61GvMmgzeV5',
  };
  
  const apiPrefix = '/api/v1';
  const login = `${apiPrefix}/auth/signin`;
  const allBookings = `${apiPrefix}/bookings`;
  
  const booking = {
    trip_id: 1,
    user_id: 1,
  };
  
  describe('Create a booking', () => {
    it('should allow any logged-in user to create a booking', async () => {
      try {
        let result = await chai
          .request(app)
          .post(login)
          .send(user);
        result.should.have.status(200);
        result.body.should.have.property('data');
        const { data } = result.body;
        token = data.token;
        
        result = await chai
          .request(app)
          .post(allBookings)
          .set('token', token)
          .send(booking);
        result.should.have.status(201);
        result.body.should.have.property('data');
        const { data: bookingData } = result.body;
        bookingId = bookingData.id;
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should return an error for an empty request body', async () => {
      try {
        const result = await chai
          .request(app)
          .post(allBookings)
          .set('token', token)
          .send({});
          
        result.should.have.status(400);
        result.body.should.have.property('error');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Create a booking with a seat number', () => {
    it('should return an error for attempting to register with a seat number greater than bus capacity', async () => {
      try {
        const result = await chai
          .request(app)
          .post(allBookings)
          .set('token', token)
          .send({ ...booking, seat_number: 20 });
          
        result.should.have.status(400);
        result.body.should.have.property('error');
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should allow a user to specify a seat number while booking successfully', async () => {
      try {
        const result = await chai
          .request(app)
          .post(allBookings)
          .set('token', token)
          .send({ ...booking, seat_number: 7 });
        
        result.should.have.status(201);
        result.body.should.have.property('data');
        const { data } = result.body;
        data.should.be.an('object');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Fetch all bookings', () => {
    it('should fetch all the bookings in the database', async () => {
      try {
        const result = await chai
          .request(app)
          .get(allBookings)
          .set('token', token);
          
        result.should.have.status(200);
        result.body.should.have.property('data');
        const { data } = result.body;
        data.should.be.an('array');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Fetch a particular booking', () => {
    it('should fetch a specifc booking from the database', async () => {
      try {
        const result = await chai
          .request(app)
          .get(`${allBookings}/${bookingId}`)
          .set('token', token);
          
        result.should.have.status(200);
        result.body.should.have.property('data');
        const { data } = result.body;
        data.should.be.an('object');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Update a particular booking', () => {
    it('should update a specifc booking from the database', async () => {
      try {
        const result = await chai
          .request(app)
          .patch(`${allBookings}/${bookingId}`)
          .set('token', token)
          .send({
            seat_number: 10,
          });
        
        result.should.have.status(200);
        result.body.should.have.property('data');
        const { data } = result.body;
        data.should.be.an('object');
        data.should.have.property('message', 'Booking updated successfully.');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Delete a particular booking', () => {
    it('should delete a specifc booking from the database', async () => {
      try {
        const result = await chai
          .request(app)
          .delete(`${allBookings}/${bookingId}`)
          .set('token', token);
          
        result.should.have.status(200);
        result.body.should.have.property('data');
        const { data } = result.body;
        data.should.be.an('object');
        data.should.have.property('message', 'Booking deleted successfully.');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
