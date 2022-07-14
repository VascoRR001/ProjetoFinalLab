const mysql=require('../mysql').pool;


exports.getAssuntos=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        connection.query(`
        SELECT Assuntos.idassunto,
            Assuntos.designacao,
            Reunioes.idreuniao,
            Reunioes.descricao,
            Reunioes.local
        FROM Assuntos 
        INNER JOIN Reunioes 
        ON Assuntos.idreuniao=Reunioes.idreuniao;`,
        (error,result,field)=>{
            connection.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            const resposta={
                quantidade:result.length,
                assuntos:result.map(assunto=>{
                    return {
                        idreuniao:assunto.idreuniao,
                        descricao:assunto.descricao,
                        local:assunto.local,
                        assunto:{
                            idassunto:assunto.idassunto,
                            designacao:assunto.designacao
                        },
                        request:{
                            tipo:'GET',
                            descricao:`Retorna os detalhes de um assunto pertencenete a uma reunião`,
                            url:'http://localhost:3000/assuntos/'+assunto.idassunto
                        }
                }
    
                })
            }
            res.status(201).send({resposta});
        });});
}

exports.postAssunto=(req,res,next)=>{
    mysql.getConnection((erro,connection)=>{
        connection.query('SELECT * FROM Reunioes WHERE idreuniao=?',
        [req.body.id_reuniao],
        (error,result,fields)=>{
            if(error) return res.status(500).send({error:error});
            if(result.length==0) return res.status(404).send({mensagem:'Reunião não encontrada'});
        });

        connection.query('INSERT INTO Assuntos (designacao,idreuniao,numeracao,votacao) VALUES (?,?,?,?)',
        [req.body.designacao,req.body.id_reuniao,req.body.numeracao,req.body.votacao],
        (error,result,field)=>{
              
        if(error){
            return res.status(500).send({
                error:error,
                Response:null
            });
        }
        connection.query('INSERT INTO IntervenienteshasAssuntos (idinterv,idassunto) VALUES(?,?)',
        [req.body.id_interv,result.insertId],
        (error,resultado,field)=>{
            connection.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            const AssuntoCriado={
                mensagem:'Assunto inserido com sucesso!',
                assunto:{ 
                        idreuniao:req.body.id_reuniao,
                        idassunto:result.insertId,
                        designacao:req.body.designacao,
                        numeracao:req.body.numeracao,
                        votacao:req.body.votacao,
                        request:{
                                tipo:'POST',
                                descricao:`Inserir um novo assunto associado a uma reunião`,
                                url:'http://localhost:3000/documentos'
                                }        
                         }
            }
            res.status(201).send({AssuntoCriado});

        });
        
         });
    
      });
}

exports.getAssunto=(req,res,next)=>{
    mysql.getConnection((erro,connection)=>{
        connection.query(`SELECT * FROM Assuntos WHERE idassunto=${req.params.id_assunto} AND idreuniao=${req.params.id_reuniao}` ,
        (error,result,field)=>{
            connection.release();      
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            if(result.length==0){
                return res.status(404).send({
                    mensagem:'Não foi encontrado nenhum assunto com este ID nesta reunião'
                });
            }
            const resposta={
                mensagem:'Assunto retornado com sucesso!',
                Documento:{
                    mensagem:`O documento pertence á reunião com o id ${req.params.id_reuniao}`,
                    idassunto:result[0].idassunto,
                    designacao:result[0].designacao,
                    numeracao:result[0].numeracao,
                    votacao:result[0].votacao,
                    request:{
                        tipo:'GET',
                        descricao:`Retornar detalhes de um assunto`,
                        url:'http://localhost:3000/assuntos'
                    }
    
                }
                
            }
    
            res.status(201).send({resposta});
        });
    
      });
}
exports.getAssuntosReuniao=(req,res,next)=>{
    mysql.getConnection((erro,connection)=>{
        connection.query(`SELECT * FROM Assuntos WHERE idreuniao=${req.params.id_reuniao}` ,
        (error,result,field)=>{
            connection.release();      
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            if(result.length==0){
                return res.status(404).send({
                    mensagem:'Não existem assuntos que perteçam a esta reunião'
                });
            }
            const resposta={
                quantidade:result.length,
                assuntos:result.map(assunto=>{
                    return {
                        idreuniao:assunto.idreuniao,
                        assunto:{
                            idassunto:assunto.idassunto,
                            designacao:assunto.designacao
                        },
                        request:{
                            tipo:'GET',
                            descricao:`Retorna os detalhes de um assunto pertencente a uma reunião`,
                            url:'http://localhost:3000/assuntos/'+assunto.idassunto
                        }
                }
    
                })
            }
    
            res.status(201).send({resposta});
        });
    
      });
}

exports.patchAssunto=(req,res,next)=>{
    mysql.getConnection((erro,connection)=>{
    
        const id=req.params.id_assunto;

        connection.query('SELECT * FROM Assuntos WHERE idreuniao=? AND idassunto=?',
        [req.params.id_reuniao,req.params.id_assunto],
        (error,result,field)=>{
        if(error){
            return res.status(500).send({
                error:error,
                Response:null
            });
        }
        if(result.length==0){
            return res.status(404).send({
                mensagem:'Não existe nenhuma assunto com esse id que pertença a esta reunião'
            });
        }
        connection.query(`UPDATE Assuntos SET designacao=?,numeracao=?,votacao=?
        WHERE idreuniao=${req.params.id_reuniao} AND idassunto=${id}`,
        [req.body.designacao,req.body.numeracao,req.body.numeracao,req.body.votacao],
        (error,resultado,field)=>{
            connection.release();
    
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            const DocumentoAtualizado={
                mensagem:'Documento alterado com sucesso!',
                documento:{ 
                        idreuniao:req.params.id_reuniao,
                        iddocumento:req.params.id_documento,
                        nome:req.body.nome,
                        designacao:req.body.designacao,
                        numeracao:req.body.numeracao,
                        votacao:req.body.votacao,
                        request:{
                                tipo:'PATCH',
                                descricao:`Alterar os detalhes de um documento`,
                                url:'http://localhost:3000/documentos'+id
                                }        
                         }
            }
            res.status(202).send({DocumentoAtualizado})
        })});
    
      });
    
}
exports.deleteAssunto=(req,res,next)=>{
    mysql.getConnection((erro,connection)=>{
            
        const id=req.params.id_assunto;
        connection.query('SELECT * FROM Assuntos WHERE idreuniao=? AND idassunto=?',
        [req.params.id_reuniao,req.params.id_assunto],
        (error,resultado,field)=>{
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            if(resultado.length==0){
                return res.status(404).send({
                    mensagem:'Id da reunião ou Id do assunto incorretos'
                });
            }
            connection.query(`DELETE FROM IntervenienteshasAssuntos WHERE idassunto=${id}`,
            (error,resultado,field)=>{
                if(error){
                    return res.status(500).send({
                        error:error,
                        Response:null
                    });
                }
                connection.query(`DELETE FROM Assuntos WHERE idassunto=${id} `,
                (error,result,field)=>{
                connection.release();
                   if(error){
                    return res.status(500).send({
                    error:error,
                    Response:null
                   });
                }
            
                const DocumentoRemovido={
                    mensagem:'Documento removido com sucesso!',
                    documento:{ 
                            request:{
                                    tipo:'DELETE',
                                    descricao:`Remover um documento`,
                                    url:'http://localhost:3000/documentos/'+id
                                    }        
                             }
                }
        
                res.status(202).send({DocumentoRemovido})
            
             })

            });

        });
    
      });
}