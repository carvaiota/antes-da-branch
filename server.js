import 'dotenv/config'; // DEVE SER A PRIMEIRA LINHA DO ARQUIVO
import express from 'express';
import usuarioRoutes from './src/routers/usuarioRoute.js';
const app = express();

app.use(express.json());

// Registra as rotas
app.use('/usuarios', usuarioRoutes);

// Pega a porta do .env ou usa a 3000 como padrão
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});