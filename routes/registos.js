const express=require('express');
const { pool } = require('../mysql');
const router = express.Router();
const RegistosController=require('../controllers/registos-controller');

//REGISTO DO USUÁRIO NA BASE DE DADOS E ENCRIPTAÇÃO DAS PASSWORDS
router.post('/cadastro',RegistosController.cadastroUtilizador);
//LOGIN DO UTILIZADOR E VERIFICAÇÃO DAS CREDENCIAIS E CRIAÇÃO DO TOKEN
router.post('/login',RegistosController.loginUtilizador);


module.exports=router;