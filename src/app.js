const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mySqlConnection = require('./config/mySqlConnection.config');

const app = express();
const index = require('./routes/index');
const automovelRoutes = require('./routes/automovel.route');
const motoristaRoutes = require('./routes/motorista.route');
const utilizacaoRoutes = require('./routes/utilizacao.route');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));
app.use(cors());
app.set('mysql connection', mySqlConnection.connect);

mySqlConnection.connect((err) => {
  if (err) {
    console.error('[ERROR] ', err);
    throw err;
  }

  console.info('[INFO] Conexão com MySQL estabelecida');
});

app.use(index);
app.use('/api/v1/automovel/', automovelRoutes);
app.use('/api/v1/motorista/', motoristaRoutes);
app.use('/api/v1/utilizacao/', utilizacaoRoutes);

module.exports = app;
