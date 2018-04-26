const express = require('express');
const passport = require('passport');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'there' });
  });
};
