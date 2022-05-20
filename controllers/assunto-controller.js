const mysql=require('../mysql').pool;


exports.getAssuntos=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        mysql.query(`
        SELECT assuntos.idassunto,
            assuntos.desingacao,
            Reunioes.idreuniao,
            Reunioes.descricao,
            Reunioes.local,
            Reunioes.tiporeuniao
        FROM Documentos
        INNER JOIN Reunioes
        ON Reunioes.idreuniao=Assuntos.idreuniao`,
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
                        tiporeuniao:documento.tiporeuniao,
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
        [req.params.id_reuniao],
        (error,result,fields)=>{
            if(error) return res.status(500).send({error:error});
            if(result.length==0) return res.status(404).send({mensagem:'Reunião não encontrada'});
        });

        connection.query('INSERT INTO assuntos (designacao,idreuniao,numeracao,voto) VALUES (?,?,?,?)',
        [req.body.designacao,req.params.id_reuniao,req.body.numeracao,req.body.voto],
        (error,result,field)=>{
              
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
                    idreuniao:req.params.id_reuniao,
                    idassunto:result.insertedId,
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
        res.status(201).send({DocumentoCriado});
         });
    
      });
}

exports.getAssunto=(req,res,next)=>{
    mysql.getConnection((erro,connection)=>{
        connection.query(`SELECT * FROM Documentos WHERE idassunto=${req.params.id_assunto}&& idreuniao=${req.params.id_reuniao}` ,
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

//ACABAR ESTES DOIS MÉTODOS
exports.patchAssunto=(req,res,next)=>{
//continuar a desenvolver os métodos
}
exports.deleteAssunto=(req,res,next)=>{
    const novoAssunto={
        idreuniao:{
           mensagem:`Pertence á reunião com o id ${req.params.id_assunto}` 
        },
        designacao:req.body.designacao,
        numeracao:req.body.numeracao,
        votacao:req.body.votacao,
        tomadacon:req.body.tomadacon
    }
    res.status(200).send({mensagem:'Assunto removido com sucesso!',novoAssunto});
}