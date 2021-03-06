import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../server';

chai.use(chaiHttp);
chai.should();

let user;
let token;
let user_id;

describe('Users Routes', () => {
  const apiPrefix = '/api/v1';
  const login = `${apiPrefix}/auth/signin`;
  const signup = `${apiPrefix}/auth/signup`;
  const userRoute = `${apiPrefix}/users`;
  user = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  
  describe('Fetch All Users', () => {
    it('should get all the users in the database for the Admin alone', async () => {
      try {
        let result = await chai
          .request(app)
          .post(login)
          .send({ email: 'dakoloz@wayfarer.com', password: 'yppZgpjXNl61GvMmgzeV5' });
        result.should.have.status(200);
        const { data } = result.body;
        token = data.token;
        
        result = await chai
          .request(app)
          .get(userRoute)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Fetch a particular user', () => {
    it('should get a specific user from the database', async () => {
      try {
        let result = await chai
          .request(app)
          .post(signup)
          .send(user);
        result.should.have.status(201);
        const { data } = result.body;
        user_id = data.id;
        token = data.token;
        
        result = await chai
          .request(app)
          .get(`${userRoute}/${user_id}`)
          .set('token', token);
        result.should.have.status(200);
        result.body.should.property('data');
        const { data: returnedUser } = result.body;
        user_id.should.be.equal(returnedUser.id);
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Update a user route', () => {
    it('should allow user to update their accounts', async () => {
      try {
        const result = await chai
          .request(app)
          .patch(`${userRoute}/${user_id}`)
          .set('token', token)
          .send({
            email: faker.internet.email(),
            firstName: faker.name.lastName(),
          });
          
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Delete a user route', () => {
    let adminToken;
    
    it('should allow the admin alone to delete user accounts', async () => {
      try {
        let result = await chai
          .request(app)
          .post(login)
          .send({ email: 'dakoloz@wayfarer.com', password: 'yppZgpjXNl61GvMmgzeV5' });
        result.should.have.status(200);
        const { data } = result.body;
        adminToken = data.token;
        
        result = await chai
          .request(app)
          .delete(`${userRoute}/${user_id}`)
          .set('token', adminToken);
          
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should return error for attempting to delete a user that does not exist', async () => {
      try {
        const result = await chai
          .request(app)
          .delete(`${userRoute}/10`)
          .set('token', adminToken);
          
        result.should.have.status(404);
        result.body.should.have.property('error');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
