const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');
const code = require('./utils/statusCodes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

routes(app);

// Custom middleware for error handling
app.use((message, req, res, next) => {
  res.status(code.USER_ERROR).send({ error: { code: code.USER_ERROR, message } });
});

module.exports = app;
