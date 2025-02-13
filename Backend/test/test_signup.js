const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Testing route /signup', () => {
    const host = `http://localhost:3000`;
    const path = "/signup";

    it('should return status 500 if password is invalid', (done) => {
        chai.request(app)
            .post('/signup')
            .send({ fullname: 'Test User', username: 'testuser', email: 'testuser@test.com', password: 'invalid', cpassword: 'invalid', phone: '1234567890', role: 'customer', gender: 'male', birthdate: '2000-01-01' })
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

    it('should return status 500 if passwords do not match', (done) => {
        chai.request(app)
            .post('/signup')
            .send({ fullname: 'Test User', username: 'testuser', email: 'testuser@test.com', password: 'Test1234#', cpassword: 'Test1234', phone: '1234567890', role: 'customer', gender: 'male', birthdate: '2000-01-01' })
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

    it('should return status 500 if username already exists', (done) => {
        chai.request(app)
            .post('/signup')
            .send({ fullname: 'Test User', username: 'testuser', email: 'testuser@test.com', password: 'Test1234#', cpassword: 'Test1234#', phone: '1234567890', role: 'customer', gender: 'male', birthdate: '2000-01-01' })
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

    it('should return status 500 if email already exists', (done) => {
        chai.request(app)
            .post('/signup')
            .send({ fullname: 'Test User', username: 'newtestuser', email: 'testuser@test.com', password: 'Test1234#', cpassword: 'Test1234#', phone: '1234567890', role: 'customer', gender: 'male', birthdate: '2000-01-01' })
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

    it('should return status 200 and redirect to login page if signup is successful', (done) => {
        chai.request(app)
            .post('/signup')
            .send({ fullname: 'Test User', username: 'newtestuser', email: 'newtestuser@test.com', password: 'Test1234#', cpassword: 'Test1234#', phone: '1234567890', role: 'customer', gender: 'male', birthdate: '2000-01-01' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.redirectTo('/login');
                done();
            });
    });
});
