const jwt = require('jsonwebtoken');
const { connect } = require('./autenticacao');
const mysql=require('../mysql').pool;

module.exports=(req,res,next)=>{//irá funcionar como um middleware que irá receber o token e decodificá-lo,depois irá passar esse token na requisição de cada verbo
//(ou seja, cada verbo (post,patch e delete) só se irão realizar caso o token seja válido)
        mysql.getConnection((err,connection)=>{
          if(err){return res.status(500).send({
            mensagem:'Erro na conexão!',
            err
          });}
          connection.query('SELECT * FROM Utilizador WHERE IUPI=?',
          [req.body.IUPI],
          (erro,result,fields)=>{
            connection.release();
            if(erro){
              return res.status(404).send({
                mensagem:'IUPI Inválido!',
                erro
              });
            }
          });
        });
    
    
}