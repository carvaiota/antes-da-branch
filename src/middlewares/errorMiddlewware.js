const errorMiddleware = (err, req, res, next) => {
  console.error("Erro capturado pelo Middleware Global:", err.stack);

  // Se o erro tiver um status customizado, usa ele; caso contrário, retorna 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  const mensagem = err.message || "Erro interno no servidor.";

  return res.status(statusCode).json({
    sucesso: false,
    mensagem: mensagem
  });
};

export default errorMiddleware;