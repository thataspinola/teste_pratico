const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info('[INFO] Aplicação executando na porta: ', port);
});