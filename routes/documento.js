const express=require('express');
const { pool } = require('../mysql');
const router = express.Router();
const login=require('../middleware/login');
const DocumentosController=require('../controllers/documento-controller');


//ATUALIZAR ATRIBUTOS NA TABELA DOCUMENTOS NA BASE DE DADOS

//RETORNA TODAS OS DOCUMENTOS
router.get('/',DocumentosController.getDocumentos);
//INSERE UM DOCUMENTO
router.post('/:id_reuniao',login,DocumentosController.postDocumento);
//RETORNA UM DOCUMENTO DE UMA REUNIÃO
router.get('/:id_documento',DocumentosController.getDocumento);
//ATUALIZAR/EDITAR UM DOCUMENTO
router.patch('/:id_documento',login,DocumentosController.patchDocumento);
//REMOVE/ELIMINA UM DOCUMENTO
router.delete('/:id_documento',login,DocumentosController.deleteDocumento);



 module.exports=router;