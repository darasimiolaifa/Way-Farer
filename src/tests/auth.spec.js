import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../server';

chai.use(chaiHttp);
chai.should();

let user;

describe('Authentication routes', () => {
  const apiPrefix = '/api/v1/auth';
  const signup = `${apiPrefix}/signup`;
  const login = `${apiPrefix}/signin`;
  
  user = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  
  describe('Signup Route', () => {
    it('should successfully sign up a new user', async () => {
      try {
        const result = await chai
          .request(app)
          .post(signup)
          .send(user);
        result.should.have.status(201);
        result.body.should.have.property('data');
        const { data } = result.body;
        data.should.have.property('token');
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should return an error message when one of the fields is empty, missing, or invalid', async () => {
      const incompleteUser = {
        first_name: faker.internet.email(),
        email: faker.name.lastName(),
        password: '',
      };
      
      try {
        const result = await chai
          .request(app)
          .post(signup)
          .send(incompleteUser);
        result.should.have.status(400);
        result.body.should.have.property('error');
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should return an error for registering with the same email twice', async () => {
      try {
        const result = await chai
          .request(app)
          .post(signup)
          .send(user);
        result.should.have.status(400);
        result.body.should.have.property('error');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  
  describe('Signin Route', () => {
    it('should log in a registered user', async () => {
      try {
        const { email, password } = user;
        const result = await chai
          .request(app)
          .post(login)
          .send({ email, password });
        result.should.have.status(200);
        result.body.should.have.property('data');
      } catch (error) {
        throw new Error(error);
      }
    });
    
    it('should reject a login attempt by an unregistered user', async () => {
      const anotherUser = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      
      try {
        const result = await chai
          .request(app)
          .post(login)
          .send(anotherUser);
        result.should.have.status(401);
        result.body.should.have.property('error');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
