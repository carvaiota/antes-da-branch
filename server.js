import 'dotenv/config'; // DEVE SER A PRIMEIRA LINHA DO ARQUIVO
import express from 'express';
import usuarioRoutes from './src/routers/usuarioRoute.js';
import veiculoRoutes from './src/routers/veiculoRouter.js';
const app = express();

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/veiculos', veiculoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});