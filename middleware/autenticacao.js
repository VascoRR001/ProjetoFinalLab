const http = require('http');
const express=require('express');
const router = express.Router();
const fetch = require('node-fetch');
router.use(express.static('public'));
router.use(express.json({limit:'1mb'}));
const mysql=require('../mysql').pool;
const uuid = require('uuid')


//Cada sessão criada estará vinculada a um user e esse user terá como atributos um username,IUPI e expiresAt
class Session {
  constructor(username,IUPI, expiresAt) {
      this.username = username;
      this.IUPI=IUPI;
      this.expiresAt = expiresAt;
  }

  //método que determina se a sessão expirou ou não
  isExpired() {
      this.expiresAt < (new Date())
  }
}

//Este objeto irá armazenar todas as sessões ativas dos users
const sessions = {}


const signinHandler=async (req,res,next)=>{

//autentica alunos e docentes
  var api_url='https://api.utad.pt/ms/IUTADAuthSimul/UTADAuth.svc/Autenticar';
  var credentials = btoa(`ext_user_reunioes:ssp5Gp6jL9k6mb9fm6HX`);

       await fetch(api_url,{
        method:'POST',
        body:JSON.stringify({
          username:req.body.username,
          password:req.body.password
        }),
        headers: {
          'Authorization' : `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(response=>{
      const user = {
        IUPI:response.IUPI,
        username:response.Username
      }
     // funciona como um session_token
    const sessionToken = uuid.v4();

    // tempo de expiração 120s
    const now = new Date()
    const expiresAt = new Date(+now + 120 * 1000)

    // cria a sessão com as informações do user
    const session = new Session(user.username,user.IUPI, expiresAt)
    //adiciona a sessão do user á estrutura de dados
    sessions[sessionToken] = session

    // In the response, set a cookie on the client with the name "session_cookie"
    // and the value as the UUID we generated. We also set the expiry time
    res.cookie("session_token", sessionToken, { expires: expiresAt })
    return res.end();
    })
    .catch(erro=>res.status(401).send({//caso a autenticação esteja errada (username inválido) este catch não envia a resposta
    error:{
      mensagem:'Erro na autenticação do utilizador',
      erro
    }
    }));
    next();

}

const welcomeHandler = (req, res) => {
  
  if (!req.cookies) {
      res.status(401).end()
      return
  }

  
  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
      res.status(401).end()
      return
  }

  
  userSession = sessions[sessionToken]
  if (!userSession) {
      res.status(401).end()
      return
  }
 
  if (userSession.isExpired()) {
      delete sessions[sessionToken]
      res.status(401).end()
      return
  }

  
  res.send(`Welcome  ${userSession.username}!`).end()
}

const refreshHandler = (req, res) => {
  
  if (!req.cookies) {
      res.status(401).end()
      return
  }

  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
      res.status(401).end()
      return
  }

  userSession = sessions[sessionToken]
  if (!userSession) {
      res.status(401).end()
      return
  }
  if (userSession.isExpired()) {
      delete sessions[sessionToken];
      res.status(401).end();
      return
  }
  

  //criar um novo session_token
  const newSessionToken = uuid.v4();

  //atualizar o tempo de expiração (mais 120s)
  const now = new Date();
  const expiresAt = new Date(+now + 120 * 1000);
  const session = new Session(userSession.username,userSession.IUPI, expiresAt);

  //adicionar a nova sessão ao mesmo user á estrutura de dados e remover a sessão antiga
  sessions[newSessionToken] = session;
  delete sessions[sessionToken];

  //atribuir o session token ao novo valor criado
  res.cookie("session_token", newSessionToken, { expires: expiresAt });
  res.end();
}

const logoutHandler = (req, res) => {
  if (!req.cookies) {
      res.status(401).end();
      return;
  }

  const sessionToken = req.cookies['session_token'];
  if (!sessionToken) {
      res.status(401).end();
      return;
  }

  delete sessions[sessionToken];

  res.cookie("session_token", "", { expires: new Date() });
  res.end();
}

module.exports={signinHandler,welcomeHandler,refreshHandler,logoutHandler};
