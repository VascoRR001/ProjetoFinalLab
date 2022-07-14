const mysql=require('../mysql').pool;

exports.getIntervenientes=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        connection.query(`SELECT ReunioeshasIntervenientes.idinterv,
        Intervenientes.nome,
        Intervenientes.apelido
    FROM ReunioeshasIntervenientes
    INNER JOIN Intervenientes
    ON ReunioeshasIntervenientes.idinterv=Intervenientes.idinterv AND ReunioeshasIntervenientes.idreuniao=${req.params.id_reuniao}`,
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
        Reunioes.local
    FROM ReunioeshasIntervenientes
    INNER JOIN Reunioes
    ON ReunioeshasIntervenientes.idreuniao=Reunioes.idreuniao AND ReunioeshasIntervenientes.idinterv=${req.params.id_interv}`,
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
        const date = new Date().toDateString();   
        connection.query(`SELECT ReunioeshasIntervenientes.idreuniao,
        Reunioes.descricao,
        Reunioes.local
    FROM ReunioeshasIntervenientes
    INNER JOIN Reunioes
    ON ReunioeshasIntervenientes.idreuniao=Reunioes.idreuniao AND ReunioeshasIntervenientes.idinterv=${req.params.id_interv}
    AND Reunioes.dfim IS NULL`,
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
                    mensagem:`O interveniente não possui reuniões em curso`
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
        const date = new Date().toDateString();
        if(err) return res.status(500).send({error:err});    
        connection.query(`SELECT ReunioeshasIntervenientes.idreuniao,
        Reunioes.descricao,
        Reunioes.local
    FROM ReunioeshasIntervenientes
    INNER JOIN Reunioes
    ON ReunioeshasIntervenientes.idreuniao=Reunioes.idreuniao AND ReunioeshasIntervenientes.idinterv=${req.params.id_interv}
    AND Reunioes.dfim IS NOT NULL`,
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
    connection.query(`UPDATE ReunioeshasIntervenientes SET presente=?
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
        if(resultado.length==0){
            return res.status(404).send({
                mensagem:'Falha na marcação da presença'
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
        res.status(200).send(Presenca);
    }); 
   });
}

exports.postVotacao=(req,res,next)=>{
    mysql.getConnection((err,connection)=>{
        if(err) return res.status(500).send({error:err});    
        connection.query(`SELECT * FROM Assuntos 
        WHERE idassunto=${req.params.id_assunto} AND votacao=${1} AND idreuniao=(
            SELECT idreuniao
            FROM Reunioes 
        WHERE idreuniao=${req.params.id_reuniao}
        );`,
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
                connection.query(`UPDATE IntervenienteshasAssuntos SET idinterv=?,idassunto=?,voto=? WHERE idassunto=${req.params.id_assunto} AND idinterv=${req.body.id_interv}`,
                [req.body.id_interv,result[0].idassunto,req.body.voto],
                (error,result,field)=>{

        if(error){
            return res.status(404).send({
                error:error,
                Response:null
            });
        }

        connection.query(`SELECT Reunioes.idreuniao, Reunioes.descricao,Assuntos.idassunto,Assuntos.designacao,
                          Intervenientes.idinterv,Intervenientes.nome,Intervenientes.apelido
        FROM Reunioes
    INNER JOIN Assuntos
      ON Assuntos.idreuniao= Reunioes.idreuniao
    INNER JOIN IntervenienteshasAssuntos
      ON IntervenienteshasAssuntos.idassunto AND Assuntos.idassunto
    INNER JOIN Intervenientes
      ON Intervenientes.idinterv = IntervenienteshasAssuntos.idinterv`,
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
            mensagem:`O interveniente com o id ${req.body.id_interv} votou no assunto com o id ${req.params.id_assunto} com o valor de (${req.body.voto})`,
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
                        tipo:'PATCH',
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



    exports.postIntervEmReun=(req,res,next)=>{//Apenas os secretários de reunião podem fazer isto
        
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
          [/*req.body.id_interv ||*/ result.insertId,req.params.id_reuniao],
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
            for(let i=0;i<req.body.Intervenientes.length;i++){
                IntervenientesArray.push({
                    nome:req.body.Intervenientes[i].nome,
                    apelido:req.body.Intervenientes[i].apelido
                });
            }

            IntervenientesArray.forEach(interv=>{connection.query('INSERT INTO Intervenientes (nome,apelido) VALUES (?,?)',
            [interv.nome,interv.apelido],
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
                      id:result.insertId,
                      nome:interv.nome,
                      apelido:interv.apelido
                  } 
              }
              res.status(201).send({
                IntervInserido
              });
          });
           })});
      
        });
    }