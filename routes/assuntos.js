const express=require('express');
const { pool } = require('../mysql');
const router = express.Router();
const login=require('../middleware/login');
const AssuntoController=require('../controllers/assunto-controller');



//RETORNA TODAS OS ASSUNTOS PERTENCENTES A UMA REUNIÃO
router.get('/',AssuntoController.getAssuntos);
//INSERE/ADICIONA UM ASSUNTO A UMA DETERMINADA REUNIÃO
router.post('/adicionar-assunto/:id_reuniao',AssuntoController.postAssunto);
//RETORNA UM ASSUNTO DE UMA REUNIÃO
router.get('/:idreuniao/:id_assunto',AssuntoController.getAssunto);
//ATUALIZAR/EDITAR UM ASSUNTO
router.patch('/:id_reuniao/:id_assunto',AssuntoController.patchAssunto);
//REMOVE/ELIMINA UM ASSUNTO DE UMA DETERMINADA REUNIÃO
router.delete('/:id_assunto',AssuntoController.deleteAssunto);


 module.exports=router;