// import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// import my modules
const staticUserId = require('./modules/staticUserId');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { errorHandler, notFound } = require('./modules/errorHandler');
const { doesUserExist } = require('./modules/doesUserExist');
const { doesCardExist } = require('./modules/doesCardExist');

// connect mestodb
mongoose.connect('mongodb://localhost:27017/mestodb');

// app express
const app = express();

// PORT 3000
const { PORT = 3000 } = process.env;

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static user id
app.use(staticUserId);

// users
app.use('/users/:userId', doesUserExist);
app.use('/users', users);

// cards
app.use('/cards/:cardId', doesCardExist);
app.use('/cards', cards);

// error handler
app.use('*', notFound);
app.use(errorHandler);

app.listen(PORT);
