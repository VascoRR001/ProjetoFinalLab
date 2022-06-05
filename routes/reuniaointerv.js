const express=require('express');
const { pool } = require('../mysql');
const router = express.Router();
const login=require('../middleware/login');
const ReunioesIntervController=require('../controllers/reuniaointerv-controller');

//RETORNA TODOS OS INTERVENIENTES QUE FORAM CONVOCADOS PARA AQUELA REUNIÃO
router.get('/mostrar-intervenientes/:id_reuniao',ReunioesIntervController.getIntervenientes);
//RETORNA TODAS AS REUNIÕES QUE UM INTERVENIENTE FOI CONVOCADO
router.get('/mostrar-reunioes/:id_interv',ReunioesIntervController.getReunioes);
//RETORNA TODAS AS REUNIÕES QUE ESTÃO EM CURSO DE UM DETERMINADO INTERVENIENTE
router.get('/mostrar-reunioes-em-curso/:id_interv',ReunioesIntervController.getReunioesEmCurso);
router.get('/mostrar-reunioes-terminadas/:id_interv',ReunioesIntervController.getReunioesTerminadas);//Acabar o método
//MARCA AS PRESENÇAS DOS INTERVENIENTES QUE ESTABELECERAM CONEXÃO NUMA REUNIÃO ESPECÍFICA
router.post('/presencas/:id_interv/:id_reuniao',ReunioesIntervController.postPresenças);
//VERIFICA SE UM ASSUNTO PERTENCENTE A UMA DETERMINADA REUNIÃO É POR VOTAÇÃO OU POR TOMADA DE CONHECIMENTO 
router.post('/votar-em-assunto',ReunioesIntervController.postVotacao);
//ADICIONA UM INTEVENIENTE A UMA REUNIÃO
router.post('/:id_reuniao',ReunioesIntervController.postIntervEmReun);
//ADICIONA MÚLTIPLOS INTERVENIENTES A UMA REUNIÃO DE UMA VEZ
router.post('/multiplos-intervenientes/:id_reuniao',ReunioesIntervController.postIntervsEmReun);

module.exports=router;