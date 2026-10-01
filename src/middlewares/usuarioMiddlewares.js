import  jwt from "jsonwebtoken"

const usuarioMiddlewares = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader){
        return res.status (401).json({
            message: "Token de autenticação não fornecido"
        })
    }

    const parts = authHeader.split(" ")
    if (parts.length !== 2){
        return res.status(401).json({
            message: "erro no formato de token"
        })
    }
    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({
            message:"token malformatado"
        })
    }

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
         throw new Error("ERRO GRAVE: A variável JWT_SECRET não está definida nas variáveis de ambiente!");
}

        const decoded = jwt.verify(token,process.env.JWT_SECRET) //|| "chave_secreta_ulti_gas") serve pra quando nn tiver um jwt_secret (extremamente perigoso !!!)
    
        req.usuarioID = decoded.idusuario;

        return next()
    }
    catch  (error){
        return res.status(401).json({
            messagem: "Token invalido ou expirado"
        })
    }
}

export default usuarioMiddlewares