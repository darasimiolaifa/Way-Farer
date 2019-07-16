import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../server';

chai.use(chaiHttp);
chai.should();

let user;
let token;
let tripId;

describe('Trips Routes', () => {
  user = {
    email: 'dakoloz@wayfarer.com',
    password: 'yppZgpjXNl61GvMmgzeV5',
  };
  const apiPrefix = '/api/v1';
  const login = `${apiPrefix}/auth/signin`;
  const allTrips = `${apiPrefix}/trips`;
  
  describe('Create trips', () => {
    it('should allow only admin to create trips', async () => {
      const trip = {
        busId: 1,
        origin: faker.address.city(),
        destination: faker.address.city(),
        tripDate: faker.date.future(),
        fare: faker.finance.amount(),
      };
      
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
          .post(allTrips)
          .set('token', token)
          .send(trip);
        
        result.should.have.status(201);
        result.body.should.have.property('data');
        const { data: tripData } = result.body;
        tripId = tripData.trip_id;
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should return an error for invalid or missing input', async () => {
      try {
        const result = await chai
          .request(app)
          .post(allTrips)
          .set('token', token)
          .send({
            busId: 1,
            origin: faker.address.city(),
            destination: faker.finance.amount(),
            tripDate: faker.finance.amount(),
            fare: faker.random.word(),
          });
        result.should.have.status(400);
        result.body.should.have.property('errors');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Fetch all trips without filters', () => {
    it('should fetch all trips for any registered user', async () => {
      try {
        const result = await chai
          .request(app)
          .get(allTrips)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Fetch trips with certain filters', () => {
    it('should fetch all trips with a particular origin', async () => {
      try {
        const result = await chai
          .request(app)
          .get(`${allTrips}?origin=Lagos`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should fetch all trips with a particular destination', async () => {
      try {
        const result = await chai
          .request(app)
          .get(`${allTrips}?destination=Ibadan`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should fetch all trips occurring on/after a particular date', async () => {
      try {
        const result = await chai
          .request(app)
          .get(`${allTrips}?from=04/12/19`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should fetch all trips occurring on/before a particular date', async () => {
      try {
        const result = await chai
          .request(app)
          .get(`${allTrips}?to=04/20/20`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Fetch a particular trip', () => {
    it('should fetch a specific trip record', async () => {
      try {
        const result = await chai
          .request(app)
          .get(`${allTrips}/${tripId}`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Update a particular trip', () => {
    it('should update a specific trip record', async () => {
      try {
        const result = await chai
          .request(app)
          .patch(`${allTrips}/${tripId}/edit`)
          .set('token', token)
          .send({
            tripDate: faker.date.future(),
            fare: faker.finance.amount(),
          });
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Cancel trip', () => {
    it('should change the status of a trip to cancelled', async () => {
      try {
        const result = await chai
          .request(app)
          .patch(`${allTrips}/${tripId}`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Delete a particular trip', () => {
    it('should delete a specific trip record', async () => {
      try {
        const result = await chai
          .request(app)
          .delete(`${allTrips}/${tripId}`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
