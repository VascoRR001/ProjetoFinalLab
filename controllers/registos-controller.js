const mysql=require('../mysql').pool;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.cadastroUtilizador=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err){ return res.status(500).send({error:err});}
        connection.query('SELECT * FROM Registos WHERE email=?',
        [req.body.email],
        (error,result)=>{
            if(error){ return res.status(500).send({error:error});}
            if(result.length>0){
                res.status(409).send({
                    mensagem:'Usuário já cadastrado com este email!'
                });
            }else{
                bcrypt.hash(req.body.password,10,(errBcrypt,hash)=>{
                    if(errBcrypt){return res.status(404).send({error:errBcrypt})}
                    connection.query(`INSERT INTO Registos (email,password) VALUES (?,?)`,
                    [req.body.email,hash],
                    (error,result)=>{
                        connection.release();
                        if(error){ return res.status(500).send({error:error});}
                        const resposta={
                            mensagem:'Usuário criado com sucesso!',
                            usuarioCriado:{
                                id_usuario:result.insertedId,
                                email:req.body.email
                            }
                        }
                        return res.status(201).send({resposta});
                    });
                })
            }
        });
        
    });

}

exports.loginUtilizador=(req,res,next)=>{
    mysql.getConnection((erro,connection)=>{
        if(erro){return res.status(500).send({error:erro});}
        const query='SELECT * FROM Registos WHERE email=?';
        connection.query(query,[req.body.email],(erro,results)=>{
            connection.release();
            if(erro){return res.status(500).send({error:erro});}
            if(results.length<1){//irá verificar se existe algum usuário registado com este email
                res.status(401).send({mensagem:'Falha na autenticação'});
            }

            bcrypt.compare(req.body.password,results[0].password,(erro,result)=>{//irá verificar se a senha enviada na requisição e a senha que está encriptada na base de dados são iguais
                if(erro){
                    return res.status(401).send({mensagem:'Falha na autenticação'});
                }
                if(result){
                    const token=jwt.sign({//assinatura do token para enviar ao cliente (ativo durante 1hora)
                        id_usuario:results[0].id_usuario,
                        email:results[0].email
                    },'segredo',{expiresIn:'1h'});
                    return res.status(200).send({mensagem:'Autenticado com sucesso!',token:token});
                }
                return res.status(401).send({mensagem:'Falha na autenticação'});
                
            });
        });
    });
}