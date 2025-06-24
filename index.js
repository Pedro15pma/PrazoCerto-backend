const express = require('express');
const cors = require('cors');
const estabelecimentos = require('./src/routes/estabelecimentos');
const produtos = require('./src/routes/produtos');
const carrinhos = require('./src/routes/carrinhos');
const carrinhosItem = require('./src/routes/carrinhosItem');
const compras = require('./src/routes/compras');
const reservas = require('./src/routes/reservas');
const usuarios = require('./src/routes/usuarios');

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is online!!!!!!!!!!!!!!!!!!!');
});

app.use('/estabelecimentos', estabelecimentos);
app.use('/produtos', produtos);
app.use('/carrinhos', carrinhos);
app.use('/carrinhosItem', carrinhosItem);
app.use('/compras', compras);
app.use('/reservas', reservas);
app.use('/usuarios', usuarios);

app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});
