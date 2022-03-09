const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 8080;
const environment = 'dev';
const apicache = require('apicache');

const app = express();
const cache = apicache.middleware;
const pingRouter = require('./routes/ping')
const postsRouter = require('./routes/posts')
//middleware setup
app.use(morgan(environment));
app.use(bodyParser.json());

app.use('/api/ping', cache('30 minutes'), pingRouter())
app.use('/api/posts', cache('30 minutes'), postsRouter())

module.exports = app;
