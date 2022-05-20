const express=require('express');
const { pool } = require('../mysql');
const router = express.Router();
const login=require('../middleware/login');
const ReunioesController=require('../controllers/reuniao-controller');
const DocRouter=require('../routes/documento');
const { Router } = require('express');

//RETORNA TODAS AS REUNIÕES
router.get('/',ReunioesController.getReunioes);
//INSERE UMA REUNIÃO IMPLEMENTAR O getConnection para cada um dos verbos!!!!
router.post('/',login,ReunioesController.postReuniao);
//RETORNA OS DADOS DE UMA REUNIÃO
router.get('/:id_reuniao',ReunioesController.getReuniao);
//ALTERA UMA REUNIÃO
router.patch('/:id_reuniao',login,ReunioesController.patchReuniao);
//REMOVE UMA REUNIÃO
router.delete('/:id_reuniao',login,ReunioesController.deleteReuniao);
//TERMINA UMA REUNIÃO
router.post('/:id_reuniao',login,ReunioesController.TerminaReuniao);

module.exports=router;