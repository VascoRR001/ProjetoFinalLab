const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{//irá funcionar como um middleware que irá receber o token e decodificá-lo,depois irá passar esse token na requisição de cada verbo
//(ou seja, cada verbo (post,patch e delete) só se irão realizar caso o token seja válido)
    try{
        const token=req.headers.authorization.split(' ')[1];
        const decode=jwt.verify(token,'segredo');
        req.utlizador=decode;
        next();
    }catch(erro){
        return res.status(401).send({mensagem:'Falha na autenticação!'});
    }
}