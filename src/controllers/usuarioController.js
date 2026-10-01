import usuario from "../models/usuario.js";
import usuarioService from "../services/usuarioService.js";

class usuarioController {
    async cadastrar (req,res){
        try {
            const {email, senha} = req.body

            if (!email || !senha) {
                return  res.status(400).json({
                   message: "email e senha obrigatorios"
                })
            }
            const novoUsuario = await usuarioService.cadastrar(email, senha)

            return res.status(201).json({
                message: "Usuario cadastrado com sucesso!",
                usuario: {
                    idusuario: novoUsuario.idusuario,
                    email: novoUsuario.email
                }
            })
        }
        catch(error){
            return res.status(400).json({mensagem:error.message})
        }
        
    }

    async login(req, res){
        try{
            const{ email,senha} = req.body

            if(!email || !senha ){
                return  res.status(400).json({
                    message: "email e senha obrigatorio"
                })
            }
            const { usuario, token } = await usuarioService.autenticar(email, senha);            
            return res.status(200).json({
                message: "Login efetuado com secesso!",
                usuario: {
                    idusuario: usuario.idusuario,
                    email: usuario.email
                },
                token: token 
            })
        
        }
        catch(error){
            return res.status(401).json({message: error.message})
        }
    }

    async buscarPerfil(req, res) {
    try {
      return res.status(200).json({
        mensagem: "Acesso autorizado à conta!",
        usuarioIdLogado: req.usuarioId
      });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
        const { id } = req.params;
        const usuarioEncontrado = await usuarioService.buscarPorId(id);

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: "Utilizador não encontrado." });
        }

        return res.status(200).json({
            idusuario: usuarioEncontrado.idusuario,
            email: usuarioEncontrado.email
        });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }

}
async buscarPorEmail(req, res) {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ mensagem: "O email é obrigatório." });
        }

        const usuarioEncontrado = await usuarioService.buscarPorEmail(email);

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        return res.status(200).json({
            idusuario: usuarioEncontrado.idusuario,
            email: usuarioEncontrado.email
        });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

    
}



export default new usuarioController