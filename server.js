const express = require('express');
const bodyParser = require('body-parser');
const usuarioService = require('./usuarioService');

const app = express();

app.use(bodyParser.json());

app.use('/usuarios', usuarioService);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
