const mysql=require('../mysql').pool;


exports.getReunioes=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
    if(err) return res.status(500).send({error:err});    
    connection.query('SELECT * FROM Reunioes',
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
            reunioes:result.map(reuniao=>{
                return {
                    id_reuniao:reuniao.idreuniao,
                    descricao:reuniao.descricao,
                    local:reuniao.local,
                    duracao:reuniao.duracao+'h',
                    tiporeuniao:reuniao.tiporeuniao,
                    request:{
                        tipo:'GET',
                        descricao:`Retorna os detalhes de uma reunião`,
                        url:'http://localhost:3000/reunioes/'+reuniao.idreuniao
                    }
            }

            })
        }
        res.status(201).send({resposta});
    });});

    
}

exports.postReuniao=(req,res,next)=>{

    mysql.getConnection((erro,connection)=>{
          if(erro) return res.status(500).send({error:erro}); 
          connection.query('INSERT INTO Reunioes (descricao,duracao,local,dinicio,tiporeuniao) VALUES (?,?,?,?,?)',
          [req.body.descricao,req.body.duracao,req.body.local,req.body.dinicio,req.body.tiporeuniao],
          (error,result,field)=>{
        connection.release();
    
        if(error){
            return res.status(500).send({
                error:error,
                Response:null
            });
        }
        const reuniaoCriada={
            mensagem:'Reunião inserida com sucesso!',
            reuniao:{ 
                    id_reuniao:req.body.idreuniao,
                    descricao:req.body.descricao,
                    local:req.body.local,
                    duracao:req.body.duracao+'h',
                    dinicio:req.body.dinicio,
                    tiporeuniao:req.body.tiporeuniao,
                    request:{
                            tipo:'POST',
                            descricao:`Inserir uma nova reunião`,
                            url:'http://localhost:3000/reunioes'
                            }        
                     }
        }
        res.status(201).send({reuniaoCriada});
         });
    
      });
    
    }


    exports.getReuniao=(req,res,next)=>{

        mysql.getConnection((erro,connection)=>{
        const id=req.params.id_reuniao;
    
        connection.query(`SELECT * FROM Reunioes WHERE idreuniao=${id}` ,
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
                    mensagem:'Não foi encontrado nenhuma reunião com este ID'
                });
            }
            const resposta={
                mensagem:'Reunião retornada com sucesso!',
                reuniao:{
                    idreuniao:result[0].idreuniao,
                    descricao:result[0].descricao,
                    duracao:result[0].duracao+'h',
                    local:result[0].local,
                    dinicio:result[0].dinicio,
                    tiporeuniao:result[0].tiporeuniao,
                    request:{
                        tipo:'GET',
                        descricao:`Retornar detalhes de um reunião`,
                        url:'http://localhost:3000/reunioes'
                    }
    
                }
                
            }
    
            res.status(201).send({resposta});
        });
    
      });
    
    }

    exports.patchReuniao=(req,res,next)=>{
        mysql.getConnection((erro,connection)=>{
    
        const id=req.params.id_reuniao;
        connection.query(`UPDATE Reunioes SET descricao=?,duracao=?,local=?,dinicio=?,tiporeuniao=?
        WHERE idreuniao=${id} `,
        [req.body.descricao,req.body.duracao,req.body.local,req.body.dinicio,req.body.tiporeuniao],
        (error,resultado,field)=>{
            connection.release();
    
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            const reuniaoAtualizada={
                mensagem:'Reunião alterada com sucesso!',
                reuniao:{ 
                        id_reuniao:req.body.idreuniao,
                        descricao:req.body.descricao,
                        local:req.body.local,
                        duracao:req.body.duracao,
                        dinicio:req.body.dinicio,
                        tiporeuniao:req.body.tiporeuniao,
                        request:{
                                tipo:'PATCH',
                                descricao:`Alterar os detalhes de uma reunião`,
                                url:'http://localhost:3000/reunioes/'+req.body.idreuniao
                                }        
                         }
            }
            res.status(202).send({reuniaoAtualizada})
        });
    
      });
    
    }

    exports.deleteReuniao=(req,res,next)=>{
    
        mysql.getConnection((erro,connection)=>{
            
        const id=req.params.id_reuniao;
        mysql.query(`DELETE FROM Reunioes WHERE idreuniao=${id} `,
        (error,result,field)=>{
            connection.release();
    
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            
            const reuniaoRemovida={
                mensagem:'Reunião removida com sucesso!',
                reuniao:{ 
                        request:{
                                tipo:'DELETE',
                                descricao:`Remover uma reunião`,
                                url:'http://localhost:3000/reunioes/'+id
                                }        
                         }
            }
    
    
            res.status(202).send({reuniaoRemovida})
        });
    
      });
    
    }

exports.TerminaReuniao=(req,res,next)=>{//fazer uma query antes de dar update á tabela que irá verificar se a data atual é válida (data atual > dinicio0)
    mysql.getConnection((erro,connection)=>{
        if(erro) return res.status(500).send({error:erro}); 
        connection.query(`UPDATE Reunioes SET descricao=?,duracao=?,local=?,dinicio=?,tiporeuniao=? 
        WHERE idreuniao=${req.params.id_reuniao}
        AND dfim==${NULL}`,
        [req.body.descricao,req.body.duracao,req.body.local,req.body.dinicio,req.body.tiporeuniao],
        (error,result,field)=>{
      connection.release();
  
      if(error){
          return res.status(500).send({
              error:error,
              Response:null
          });
      }
      const reuniaoCriada={
          mensagem:'Reunião Terminada com sucesso!',
          reuniao:{ 
                  id_reuniao:req.body.idreuniao,
                  descricao:req.body.descricao,
                  duracao:req.body.duracao+'h',
                  dinicio:req.body.dinicio,
                  dfim:req.body.dfim,
                  request:{
                          tipo:'POST',
                          descricao:`Terminar uma reunião`,
                          url:'http://localhost:3000/reunioes'
                          }        
                   }
      }
      res.status(201).send({reuniaoCriada});
       });
  
    });
}