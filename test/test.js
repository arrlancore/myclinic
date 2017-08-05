process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);
describe('Request test', () => {
it('Main Page Status', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});

it('register Page Status', function(done) {
  chai.request(server)
    .get('/register')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});

it('should list patient users with GET', function(done) {
  chai.request(server)
    .get('/users/listpatient')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
});

it('should list doctor users with GET', function(done) {
  chai.request(server)
    .get('/users/listdoctor')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
});

it('should list ALL medicals data with GET', function(done) {
  chai.request(server)
    .get('/medicals/all')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
});

it('it should not register a user', (done) => {
        let user = {
            name: "Jenny",
            username: "jenny",
            password: "password"
        }
        chai.request(server)
            .post('/users/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
              done();
            });
      });
});