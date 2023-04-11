// middleware.js

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const middleware = express();

middleware.use(logger('dev'));
middleware.use(express.json());
middleware.use(express.urlencoded({ extended: false }));
middleware.use(cookieParser());

module.exports = middleware;
