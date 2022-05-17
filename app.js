const express = require('express');
const cors = require('cors');

const { globalErrorHandler } = require('./controllers/errors.controller');

const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

app.use('*', globalErrorHandler);

module.exports = { app };
