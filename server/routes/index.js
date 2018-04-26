const express = require('express');
const passport = require('passport');

const UserController = require('../controllers/user');

module.exports = (app) => {
  app.get('/', UserController.greeting);
  app.get('/api/authorize', UserController.authorize);
  app.get('/api/error/:errorMsg', UserController.error);
  app.get('/callback', UserController.signIn);
};
