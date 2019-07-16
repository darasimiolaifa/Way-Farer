import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

let user;
let token;
let bus_id;

describe('Bus Routes', () => {
  user = {
    email: 'dakoloz@wayfarer.com',
    password: 'yppZgpjXNl61GvMmgzeV5',
  };
  
  const apiPrefix = '/api/v1';
  const login = `${apiPrefix}/auth/signin`;
  const allBuses = `${apiPrefix}/buses`;
  
  describe('Create Buses', () => {
    it('should allow only the admin to create bus records', async () => {
      const bus = {
        number_plate: 'H25FY',
        manufacturer: 'Honda',
        model: 'Traveller',
        year: '2015',
        capacity: 10,
      };
      
      try {
        const result = await chai
          .request(app)
          .post(login)
          .send(user);
        result.should.have.status(200);
        result.body.should.have.property('data');
        const { data } = result.body;
        token = data.token;
      } catch (error) {
        throw new Error(error);
      }
      
      try {
        const result = await chai
          .request(app)
          .post(allBuses)
          .set('token', token)
          .send(bus);
          
        result.should.have.status(201);
        result.body.should.have.property('data');
        const { data } = result.body;
        bus_id = data.id;
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should return an error for invalid input', async () => {
      try {
        const result = await chai
          .request(app)
          .post(allBuses)
          .set('token', token)
          .send({
            number_plate: 'H25FY',
            manufacturer: 'Honda',
            model: 'Traveller',
            year: 'Last year',
            capacity: 'Large',
          });
        result.should.have.status(400);
        result.body.should.have.property('error');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Fetch all buses', () => {
    it('should fetch all the buses in the database', async () => {
      try {
        const result = await chai
          .request(app)
          .get(allBuses)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Fetch a particular bus', () => {
    it('should fetch a specific bus from the database', async () => {
      try {
        const result = await chai
          .request(app)
          .get(`${allBuses}/${bus_id}`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Update a particular bus', () => {
    it('should update a specific bus from the database', async () => {
      try {
        const result = await chai
          .request(app)
          .patch(`${allBuses}/${bus_id}`)
          .set('token', token)
          .send({
            year: '2012',
            capacity: 1,
          });
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Delete a particular buses', () => {
    it('should delete a specific bus from the database', async () => {
      try {
        const result = await chai
          .request(app)
          .delete(`${allBuses}/${bus_id}`)
          .set('token', token);
          
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
