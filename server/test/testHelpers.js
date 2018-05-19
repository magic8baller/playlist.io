const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

const testReqUtil = (method) => (route, data) =>
  chai
    .request(app)
    [method](route)
    .send(data);

const postReq = testReqUtil('post');
const deleteReq = testReqUtil('delete');
const getReq = testReqUtil('get');

module.exports = {
  postReq,
  deleteReq,
  getReq
};
