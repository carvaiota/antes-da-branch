import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuarioRepository from "../repositories/usuarioRepository.js";
import usuario from "../models/usuario.js";

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta_ulti_gas";


class usuarioService {
  async cadastrar(email, senha) {
    const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) {
      throw new Error("este email ja esta em uso.");
    }

    const salt = await bcrypt.genSalt(10);
    
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = new usuario(senhaHash, null, email);

    const idGerado = await usuarioRepository.salvar(novoUsuario);
    novoUsuario.idusuario = idGerado;

    return novoUsuario;
  }

  async autenticar(email, senha) {
    const usuarioEncontrado = await usuarioRepository.buscarPorEmail(email);
    
    
    if (!usuarioEncontrado) {
      throw new Error("Email ou senha incorretos.");
    }

   
    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha_hash);
    
    
    if (!senhaValida) {
      throw new Error("Email ou senha incorretos.");
    }
  
    const token = jwt.sign(
      { idusuario: usuarioEncontrado.idusuario, email: usuarioEncontrado.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {usuario: usuarioEncontrado, token}
  }
  async buscarPorId(idusuario) {
    const usuarioEncontrado = await usuarioRepository.buscarPorId(idusuario);
    return usuarioEncontrado;
  }

  async buscarPorEmail(email) {
  const usuarioEncontrado = await usuarioRepository.buscarPorEmail(email);
  return usuarioEncontrado;
}
}

export default new usuarioService();