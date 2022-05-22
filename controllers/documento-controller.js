const mysql=require('../mysql').pool;

exports.getDocumentos=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
    if(err) return res.status(500).send({error:err});    
    mysql.query(`
    SELECT Documentos.iddocumento,
        Reunioes.idreuniao,
        Reunioes.duracao,
        Reunioes.descricao,
        Reunioes.local,
        Reunioes.dinicio,
        Reunioes.tiporeuniao
    FROM Documentos
    INNER JOIN Reunioes
    ON Reunioes.idreuniao=Documentos.idreuniao;`,
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
            documentos:result.map(documento=>{
                return {
                    idreuniao:documento.idreuniao,
                    descricao:documento.descricao,
                    local:documento.local,
                    duracao:documento.duracao,
                    dinicio:documento.dinicio,
                    tiporeuniao:documento.tiporeuniao,
                    documento:{
                        iddocumento:documento.iddocumento
                    },
                    request:{
                        tipo:'GET',
                        descricao:`Retorna os detalhes de um documento`,
                        url:'http://localhost:3000/documentos/'+documento.iddocumento
                    }
            }

            })
        }
        res.status(201).send({resposta});
    });});

}


exports.postDocumento=(req,res,next)=>{

    mysql.getConnection((erro,connection)=>{

        connection.query('SELECT * FROM Reunioes WHERE idreuniao=?',
        [req.params.id_reuniao],
        (error,result,fields)=>{
            if(error) return res.status(500).send({error:error});
            if(result.length==0) return res.status(404).send({mensagem:'Reunião não encontrada'});
        });

          connection.query('INSERT INTO Documentos (idreuniao,nome,designacao,formato,tipodoc) VALUES (?)',
          [req.params.id_reuniao,req.body.nome,req.body.designacao,req.body.formato,req.body.tipodoc],
          (error,result,field)=>{
              
        connection.release();
    
        if(error){
            return res.status(500).send({
                error:error,
                Response:null
            });
        }
        const DocumentoCriado={
            mensagem:'Documento inserido com sucesso!',
            documento:{ 
                    idreuniao:req.params.id_reuniao,
                    iddocumento:result.insertedId,
                    nome:req.body.nome,
                    designacao:req.body.designacao,
                    formato:req.body.formato,
                    tipodoc:req.body.tipodoc,
                    request:{
                            tipo:'POST',
                            descricao:`Inserir um novo documento`,
                            url:'http://localhost:3000/documentos'
                            }        
                     }
        }
        res.status(201).send({DocumentoCriado});
         });
    
      });
    
    }

    exports.getDocumento=(req,res,next)=>{

        mysql.getConnection((erro,connection)=>{
        const id=req.params.id_documento;
    
        connection.query(`SELECT * FROM Documentos WHERE iddocumento=${id}&& idreuniao=${req.body.id_reuniao}` ,
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
                    mensagem:'Não foi encontrado nenhum documento com este ID nesta reunião'
                });
            }
            const resposta={
                mensagem:'Documento retornado com sucesso!',
                Documento:{
                    idreuniao:result[0].idreuniao,
                    iddocumento:result[0].iddocumento,
                    nome:result[0].nome,
                    designacao:result[0].designacao,
                    formato:result[0].formato,
                    tipodoc:result[0].tipodoc,
                    request:{
                        tipo:'GET',
                        descricao:`Retornar detalhes de um documento`,
                        url:'http://localhost:3000/documentos'
                    }
    
                }
                
            }
    
            res.status(201).send({resposta});
        });
    
      });
    
    }

    exports.patchDocumento=(req,res,next)=>{
        mysql.getConnection((erro,connection)=>{
    
        const id=req.params.id_documento;
        connection.query(`UPDATE Documentos SET idreuniao=?,iddocumento=?
        WHERE idreuniao=${req.params.id_reuniao} AND iddocumento=${id}`,
        [req.body.idreuniao,req.body.iddocumento],
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
                        idreuniao:req.body.idreuniao,
                        iddocumento:req.body.iddocumento,
                        nome:req.body.nome,
                        designacao:req.body.designacao,
                        formato:req.body.formato,
                        tipodoc:req.body.tipodoc,
                        request:{
                                tipo:'PATCH',
                                descricao:`Alterar os detalhes de um documento`,
                                url:'http://localhost:3000/documentos'+id
                                }        
                         }
            }
            res.status(202).send({DocumentoAtualizado})
        });
    
      });
    
    }

    exports.deleteDocumento=(req,res,next)=>{
    
        mysql.getConnection((erro,connection)=>{
            
        const id=req.params.id_documento;
        mysql.query(`DELETE FROM Documentos WHERE iddocumento=${id} `,
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
        });
    
      });
    
    }