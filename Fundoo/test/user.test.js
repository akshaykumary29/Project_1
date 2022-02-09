const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const app = require('../index');

chai.should();
chai.use(chaiHttp);

const rawData = fs.readFileSync('test/user.json');
const userJSON = JSON.parse(rawData);
var jwToken = '';

describe('registration', () => {
    it('given Registration Details when Proper should Save In DB', (done) => {
    const registrationDetails = userJSON.UserData;

        chai
          .request(app)
          .post('/register')
          .send(registrationDetails)
          .end((err, res) => {
            if (err) {
              return done(err, "Please check details again and re-enter the details with proper format");
            }
            res.should.have.status(200);
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql('User Registered');
            done();
          });
      })

      it('given Registration Details when ImpProper should not Save in DB', (done) => {
        const registartionDetails = userJSON.registrationWithImproperDetails;
        
        chai
          .request(app)
          .post('/register')
          .send(registartionDetails)
          .end((err, res) => {
            if (err) {
              return done(err, "Please check details again and re-enter the details with proper format");
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Wrong Input Validations');
            done();
          });
      });
      it('given Registration Details without email should not Save in DB', (done) => {
        const registartionDetails = userJSON.registrationWithOutEmail;
        
        chai
          .request(app)
          .post('/register')
          .send(registartionDetails)
          .end((err, res) => {
            if (err) {
              return done(err, "Please check details again and re-enter the details with proper format");
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Wrong Input Validations');
            done();
          });
      });
      it('given Registration Details without firstName should not Save in DB', (done) => {
        const registartionDetails = userJSON.registrationWithOutfirstName;
        
        chai
          .request(app)
          .post('/register')
          .send(registartionDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Wrong Input Validations');
            done();
          });
      });
    });

    describe('login', () => {
      it('given Login Details when proper should able to Login', (done) => {
        const loginDetails = userJSON.login;

        chai
          .request(app)
          .post('/login')
          .send(loginDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql('User logged in successfully');
            done();
          });
      });
      it('given Login Details when improper should unable to Login', (done) => {
        const loginDetails = userJSON.loginWithImproperDetails;
        
        chai
          .request(app)
          .post('/login')
          .send(loginDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Unable to login. Please enter correct info');
            done();
          });
      });
    });

    describe("forgetpassword", () => {
      it('given Valid Data when proper should able to send Email to User Email', (done) => {
        const forgetPassword = userJSON.properEmail;
        
        chai
        .request(app)
        .post('/forgetPassword')
        .send(forgetPassword)
        .end((err, res) =>{
          if(err) {
            return done(err);
          }
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Email sent successfully');
          done();
        });
      });
    });

    it('given InValid Email should not able to Send Email to User Email', (done) => {
      const forgotPassword = userJSON.improperEmail;
      
      chai
      .request(app)
      .post('/forgotPassword')
      .send(forgotPassword)
        .end((err, res) => {
          if (err) {
            return done('email-id is empty or unable to fetch details');
          }
          res.should.have.status(400);
          done();
        });
    });
    