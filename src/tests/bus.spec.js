/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

let user;
let token;
let busId;

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
        numberPlate: 'H25FY',
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
          .set('x-access-token', token)
          .send(bus);
          
        result.should.have.status(201);
        result.body.should.have.property('data');
        const { data } = result.body;
        busId = data.bus_id;
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should return an error for invalid input', async () => {
      try {
        const result = await chai
          .request(app)
          .post(allBuses)
          .set('x-access-token', token)
          .send({
            numberPlate: 'H25FY',
            manufacturer: 'Honda',
            model: 'Traveller',
            year: 'Last year',
            capacity: 'Large',
          });
        result.should.have.status(400);
        result.body.should.have.property('errors');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
