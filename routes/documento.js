const express=require('express');
const router = express.Router();
const DocumentosController=require('../controllers/documento-controller');


/**
 * @swagger
 * /documentos:
 *  get:
 *    summary: Retorna todos os documentos
 *    tags:
 *          - Documentos
 *    responses:
 *      200:
 *        description: Documentos retornados com sucesso
 *      500:
 *        description: Erro no retorno dos documentos
 */
//RETORNA TODAS OS DOCUMENTOS
router.get('/',DocumentosController.getDocumentos);
/**
 * @swagger
 * /documentos/adicionar-documento/{id_reuniao}:
 *  post:
 *      summary: Insere um documento numa reunião
 *      tags:
 *          - Documentos
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: Documento
 *          description: O documento a ser criado
 *          schema:
 *              type: object
 *              required:
 *                - nome
 *                - designacao
 *                - formato
 *                - tipodoc
 *              properties:
 *                  designacao:
 *                      type: string
 *                  nome:
 *                      type: string
 *                  formato:
 *                      type: string
 *                  tipodoc:
 *                      type: string
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o documento irá pertencer
 * 
 *      responses:
 *          201:
 *              description: Documento criado com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro na criação do documento
 */
//INSERE UM DOCUMENTO
router.post('/adicionar-documento/:id_reuniao',DocumentosController.postDocumento);
/**
 * @swagger
 * /documentos/{id_reuniao}/{id_documento}:
 *  get:
 *      summary: Retorna um documento de uma reunião
 *      tags:
 *          - Documentos
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o documento irá pertencer
 *        - in: path
 *          name: id_documento
 *          schema:
 *              type: number
 *          required: true
 *          description: id do documento a ser retornado
 * 
 *      responses:
 *          201:
 *              description: Documento retornado com sucesso
 *          404:
 *              description: Não existe nenhuma reunião/documento com esse id
 *          500:
 *              description: Erro no retorno do documento
 */
//RETORNA UM DOCUMENTO DE UMA REUNIÃO
router.get('/:id_reuniao/:id_documento',DocumentosController.getDocumento);
/**
 * @swagger
 * /documentos/atualizar-documento/{id_reuniao}/{id_documento}:
 *  patch:
 *      summary: Atualiza um documento de uma reunião
 *      tags:
 *          - Documentos
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: Documento
 *          description: O documento a ser atualizado
 *          schema:
 *              type: object
 *              required:
 *                - nome
 *                - designacao
 *                - formato
 *                - tipodoc
 *              properties:
 *                  designacao:
 *                      type: string
 *                  nome:
 *                      type: string
 *                  formato:
 *                      type: string
 *                  tipodoc:
 *                      type: string
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o documento a atualizar pertence
 *        - in: path
 *          name: id_documento
 *          schema:
 *              type: number
 *          required: true
 *          description: id do documento a ser atualizado
 * 
 *      responses:
 *          201:
 *              description: Documento atualizado com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro na atualização do documento
 */
//ATUALIZAR/EDITAR UM DOCUMENTO
router.patch('/atualizar-documento/:id_reuniao/:id_documento',DocumentosController.patchDocumento);
/**
 * @swagger
 * /documentos/remover-documento/{id_reuniao}/{id_documento}:
 *  delete:
 *      summary: Remove um documento pertencente a uma reunião
 *      tags:
 *          - Documentos
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o documento a remover pertence
 *        - in: path
 *          name: id_documento
 *          schema:
 *              type: number
 *          required: true
 *          description: id do documento a ser removido
 *          
 * 
 *      responses:
 *          201:
 *              description: documento removido com sucesso
 *          404:
 *              description: Não existe nenhuma reunião/documento com esse id
 *          500:
 *              description: Erro na remoção do documento
 */
//REMOVE/ELIMINA UM DOCUMENTO
router.delete('/remover-documento/:id_reuniao/:id_documento',DocumentosController.deleteDocumento);


 module.exports=router;