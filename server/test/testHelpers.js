const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

const postReq = (route, data) =>
  chai
    .request(app)
    .post(route)
    .send(data);

module.exports = {
  postReq
};
