const mysql=require('../mysql').pool;

exports.getIntervenientes=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        connection.query(`SELECT ReunioeshasIntervenientes.idinterv,
        Intervenientes.nome,
        Intervenientes.apelido,
    FROM ReunioeshasIntervenientes
    INNER JOIN Intervenientes
    ON ReunioeshasIntervenientes.idinterv=Intervenientes.idinterv AND ReunioeshasIntervenientes.idreuniao=;${req.params.id_reuniao}`,
        (error,result,field)=>{
            connection.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            if(result.length==0){
                return res.status(500).send({
                    mensagem:`Não existe nenhuma reunião com o id ${req.params.id_reuniao}`
                });
            }
            const resposta={
                quantidade:result.length,
                mensagem:`Os ${result.length} intervenientes que foram convocados para a reunião com o id ${req.params.id_reuniao} são:`,
                intervenientes:result.map(interveniente=>{
                    return {
                        id_interv:interveniente.idinterv,
                        nome:interveniente.nome,
                        apelido:interveniente.apelido,
                        request:{
                            tipo:'GET',
                            descricao:`Retorna todos os intervenientes convocados para a reunião`,
                            url:'http://localhost:3000/reunioes/intervenientes/mostrar-intervenientes/'+req.params.id_reuniao
                        }
                }
    
                })
            }
            res.status(201).send({resposta});
        });});
}


exports.getReunioes=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        connection.query(`SELECT ReunioeshasIntervenientes.idreuniao,
        Reunioes.descricao,
        Reunioes.local,
    FROM ReunioeshasIntervenientes
    INNER JOIN Reunioes
    ON ReunioeshasIntervenientes.idreuniao=Reunioes.idreuniao AND ReunioeshasIntervenientes.idinterv=;${req.params.id_interv}`,
        (error,result,field)=>{
            connection.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            if(result.length==0){
                return res.status(500).send({
                    mensagem:`Não existe nenhum interveniente com o id ${req.params.id_interv}`
                });
            }
            
            const resposta={
                mensagem:`O interveniente com o id ${req.params.id_interv} foi convocado para ${result.length} reuniões.`,
                reuniao:result.map(reuniao=>{
                    return {
                        id_reuniao:reuniao.idreuniao,
                        descricao:reuniao.descricao,
                        local:reuniao.local,
                        request:{
                            tipo:'GET',
                            descricao:`Retorna todas as reuniões que o interveniente foi convocado`,
                            url:'http://localhost:3000/reunioes/intervenientes/mostrar-reunioes/'+req.params.id_interv
                        }
                }
    
                })
            }
            res.status(201).send({resposta});
        });});
}

exports.getReunioesEmCurso=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        connection.query(`SELECT ReunioeshasIntervenientes.idreuniao,
        Reunioes.descricao,
        Reunioes.local,
    FROM ReunioeshasIntervenientes
    INNER JOIN Reunioes
    ON ReunioeshasIntervenientes.idreuniao=Reunioes.idreuniao AND ReunioeshasIntervenientes.idinterv=;${req.params.id_interv}
    AND Reunioes.dinicio <= ${Date.toDateString()} AND Reunioes.dfim==${NULL}`,
        (error,result,field)=>{
            connection.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            if(result.length==0){
                return res.status(500).send({
                    mensagem:`Não existe nenhum interveniente com o id ${req.params.id_interv}`
                });
            }
            const resposta={
                mensagem:`O interveniente com o id ${req.params.id_interv} tem ${result.length} reuniões em curso`,
                reuniao:result.map(reuniao=>{
                    return {
                        id_reuniao:reuniao.idreuniao,
                        descricao:reuniao.descricao,
                        local:reuniao.local,
                        request:{
                            tipo:'GET',
                            descricao:`Retorna todas as reuniões em curso de um determinado interveniente`,
                            url:'http://localhost:3000/reunioes/intervenientes/mostrar-reunioes-em-curso/'+req.params.id_interv
                        }
                }
    
                })
            }
            res.status(201).send({resposta});
        });});
}

exports.getReunioesTerminadas=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        connection.query(`SELECT ReunioeshasIntervenientes.idreuniao,
        Reunioes.descricao,
        Reunioes.local,
    FROM ReunioeshasIntervenientes
    INNER JOIN Reunioes
    ON ReunioeshasIntervenientes.idreuniao=Reunioes.idreuniao AND ReunioeshasIntervenientes.idinterv=;${req.params.id_interv}
    AND Reunioes.dinicio <= ${Date.toDateString()} AND Reunioes.dfim>=Reunioes.dinicio`,
        (error,result,field)=>{
            connection.release();
            if(error){
                return res.status(500).send({
                    error:error,
                    Response:null
                });
            }
            if(result.length==0){
                return res.status(500).send({
                    mensagem:`Não existem Reuniões terminadas para o interveniente com o id=${req.params.id_reuniao}`
                });
            }
            const resposta={
                mensagem:`O interveniente com o id ${req.params.id_interv} tem ${result.length} reuniões terminadas`,
                reuniao:result.map(reuniao=>{
                    return {
                        id_reuniao:reuniao.idreuniao,
                        descricao:reuniao.descricao,
                        local:reuniao.local,
                        request:{
                            tipo:'GET',
                            descricao:`Retorna todas as reuniões terminadas de um determinado interveniente`,
                            url:'http://localhost:3000/reunioes/intervenientes/mostrar-reunioes-em-terminadas/'+req.params.id_interv
                        }
                }
    
                })
            }
            res.status(201).send({resposta});
        });});   
}



exports.postPresenças=(req,res,next)=>{//atributo presenças pertençe á tabela ReunioeshasIntervenientes
   mysql.getConnection((err,connection)=>{//melhorar
    connection.query(`INSERT INTO ReunioeshasIntervenientes (presente) VALUES(?)
                      WHERE idinterv=${req.params.id_interv} AND idreuniao=${req.params.id_reuniao}`,
    [req.body.presente],
    (error,resultado,field)=>{
        connection.release();
        if(error){
            return res.status(500).send({
                error:error,
                Response:null
            });
        }
        const Presenca={
            mensagem:`O interveniente com o id ${req.params.id_interv} esteve presente na reunião ${req.params.id_reuniao}`,
            interveniente:{
                id_interv:req.params.id_interv,
                presente:req.body.presente
            },
            request:{
              tipo:'POST',
              descricao:`Marcar presença numa determinada reunião`,
              url:'http://localhost:3000/reunioes'
              } 
        }
    }); 
   });
}

exports.postVotacao=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        connection.query(`SELECT * FROM Reunioes 
        WHERE Reunioes.idreuniao==${req.params.id_reuniao} AND resAssunto==(
            SELECT * FROM Assuntos 
        WHERE Assuntos.idassunto==${req.params.id_assunto} AND Assuntos.votacao==${1}
        )`,
        (error,result,field)=>{
            if(error){
                return res.status(404).send({
                    error:error,
                    Response:null
                });
            }
            if(result.length==0){
                return res.status(500).send({
                    mensagem:`Não existe nenhum assunto com o id ${req.params.id_assunto} ou reunião com o id ${req.params.id_reuniao}`
                });
            }else{
                connection.query(`INSERT INTO IntervenienteshasAssuntos (idinterv,idassunto,voto) VALUES(?,?,?)`,
                [result[0].id_interv,result[0].id_reuniao,req.body.voto],//de seguida terá que se realizar uma insert com o valor do voto (aprovado,reprovado ou abstenção)
                (error,result,field)=>{

        if(error){
            return res.status(404).send({
                error:error,
                Response:null
            });
        }

        connection.query(`SELECT Reunioes.idreuniao, Reunioes.descricao,assuntos.idassunto,assuntos.designacao,
                          Intervenientes.idinterv,Intervenientes.nome,Intervenientes.apelido
        FROM Reunioes
    INNER JOIN Assuntos
      ON Assuntos.idreuniao= Reunioes.idreuniao
    INNER JOIN IntervenienteshasAssuntos
      ON IntervenienteshasAssuntos.idassunto AND Assuntos.idassunto
    INNER JOIN Intervenientes
      ON Intervenientes.idinterv = IntervenienteshasAsuntos.idinterv`,
      (error,result,field)=>{
        connection.release();

        if(error){
            return res.status(404).send({
                error:error,
                Response:null
            });
        }
        if(result.length==0){
            return res.status(500).send({
                mensagem:`Não existe nenhum assunto com o id ${req.params.id_assunto} ou reunião com o id ${req.params.id_reuniao}`
            });
        }

        const resposta={
            mensagem:`O interveniente com o id ${req.params.id_interv} votou no assunto ${req.params.id_assunto} com o valor de ${req.body.voto}`,
            reuniao: {
                    id_reuniao:result[0].idreuniao,
                    descricao:result[0].descricao,
                    id_interv:result[0].idinterv,
                    nome:result[0].nome,
                    apelido:result[0].apelido,
                    assunto:{
                        id_assunto:result[0].idassunto,
                        designacao:result[0].designacao,
                    },
                    request:{
                        tipo:'POST',
                        descricao:`Verifica se o assunto é para votar ou tomar conhecimento e posteriormente inserir o voto`,
                        url:'http://localhost:3000/reunioes/intervenientes/votar-em-assunto/'+req.params.id_interv
                    }
                 }

        }
        res.status(201).send({resposta});
        
      });

      });

            }
           
        });});

    }



    exports.postIntervEmReun=(req,res,next)=>{
        
        mysql.getConnection((erro,connection)=>{
            if(erro) return res.status(500).send({error:erro}); 
            connection.query('INSERT INTO Intervenientes (nome,apelido) VALUES (?,?)',
            [req.body.nome,req.body.apelido],
            (error,result,field)=>{
          
          if(error){
              return res.status(500).send({
                  error:error,
                  Response:null
              });
          }
          connection.query('INSERT INTO ReunioeshasIntervenientes (idinterv,idreuniao) VALUES(?,?)',
          [result.insertId,req.params.id_reuniao],
          (error,resultado,field)=>{
              connection.release();
              if(error){
                  return res.status(500).send({
                      error:error,
                      Response:null
                  });
              }
              const IntervInserido={
                  mensagem:`Interveniente inserido na reunião ${req.params.id_reuniao}`,
                  interveniente:{
                      id:resultado.insertedId,
                      nome:req.body.nome,
                      apelido:req.body.apelido
                  },
                  request:{
                    tipo:'POST',
                    descricao:`Inserir um interveniente a uma reunião`,
                    url:'http://localhost:3000/reunioes'
                    } 
              }
              res.status(201).send({IntervInserido});
          });
           });
      
        });
      

    }


    exports.postIntervsEmReun=(req,res,next)=>{
        mysql.getConnection((erro,connection)=>{
            if(erro) return res.status(500).send({error:erro});
            const IntervenientesArray=[];
            for(i=0;i<req.body.length;i++){
                IntervenientesArray.append(req.body[i].id_interv);
            }

            IntervenientesArray.forEach(connection.query('INSERT INTO Intervenientes (nome,apelido) VALUES (?,?)',
            [req.body[i].nome,req.body[i].apelido],
            (error,result,field)=>{
          
          if(error){
              return res.status(500).send({
                  error:error,
                  Response:null
              });
          }
          connection.query('INSERT INTO IntervenienteshasReunioes (idinterv,idreuniao) VALUES(?,?)',
          [result.insertedId,req.params.id_reuniao],
          (error,resultado,field)=>{
              connection.release();
              if(error){
                  return res.status(500).send({
                      error:error,
                      Response:null
                  });
              }
              const IntervInserido={
                  mensagem:`Interveniente inserido na reunião ${req.params.id_reuniao}`,
                  interveniente:{
                      id:result.insertedId,
                      nome:req.body.nome,
                      apelido:req.body.apelido
                  } 
              }
          });
          res.status(201).send({
              IntervInserido,
              request:{
                tipo:'POST',
                descricao:`Inserir um interveniente a uma reunião`,
                url:'http://localhost:3000/reunioes'
                }
            });
           }));
      
        });
    }