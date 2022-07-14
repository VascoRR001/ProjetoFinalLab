const express=require('express');
const { pool } = require('../mysql');
const router = express.Router();
//const login=require('../middleware/login');
const AssuntoController=require('../controllers/assunto-controller');
const AutenticacaoUtilizador=require('../middleware/autenticacao');


/**
 * @swagger
 * /assuntos:
 *  get:
 *    summary: Retorna todos os assuntos
 *    tags:
 *          - Assuntos
 *    responses:
 *      '200':
 *        description: Assuntos retornados com sucesso
 */
router.get('/'/*,AutenticacaoUtilizadores.autenticacaoUtilizadores*/,AssuntoController.getAssuntos);
/**
 * @swagger
 * /assuntos/adicionar-assunto:
 *  post:
 *      summary: Insere um assunto numa reunião
 *      tags:
 *          - Assuntos
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: assunto
 *          description: O assunto a ser criado
 *          schema:
 *              type: object
 *              required:
 *                - id_reuniao
 *                - descricao
 *                - numeracao
 *                - id_interv
 *              properties:
 *                  designacao:
 *                      type: string
 *                  id_reuniao:
 *                      type: number
 *                  numeracao:
 *                      type: number
 *                  votacao:
 *                      type: number
 *                  id_interv:
 *                      type: number
 * 
 *      responses:
 *          201:
 *              description: Assunto criado com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro na criação do assunto
 */
//INSERE/ADICIONA UM ASSUNTO A UMA DETERMINADA REUNIÃO
router.post('/adicionar-assunto',AssuntoController.postAssunto);//sim
/**
 * @swagger
 * /assuntos/{id_reuniao}/{id_assunto}:
 *  get:
 *      summary: Retorna um assunto pertencente a uma reunião
 *      tags:
 *          - Assuntos
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_assunto
 *          schema:
 *              type: number
 *          required: true
 *          description: id do assunto que pertence a uma determinada reunião
 * 
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o assunto pertence
 *          
 * 
 *      responses:
 *          201:
 *              description: Assunto retornado com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro no retorno do assunto
 */
//RETORNA UM ASSUNTO DE UMA REUNIÃO
router.get('/:id_reuniao/:id_assunto',AssuntoController.getAssunto);
/**
 * @swagger
 * /assuntos/{id_reuniao}:
 *  get:
 *      summary: Retorna todos os assuntos pertencentes a uma reunião
 *      tags:
 *          - Assuntos
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que os assuntos pertencem
 *          
 * 
 *      responses:
 *          201:
 *              description: Assuntos retornados com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro no retorno dos assuntos
 */
//Retorna todos os assuntos de uma reunião
router.get('/:id_reuniao',AssuntoController.getAssuntosReuniao);
/**
 * @swagger
 * /assuntos/atualizar-assunto/{id_reuniao}/{id_assunto}:
 *  patch:
 *      summary: Atualiza um assunto de uma determinada reunião
 *      tags:
 *          - Assuntos
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: assunto
 *          description: O assunto a ser atualizado
 *          schema:
 *              type: object
 *              required:
 *                - descricao
 *                - numeracao
 *                
 *              properties:
 *                  designacao:
 *                      type: string
 *                  numeracao:
 *                      type: number
 *                  votacao:
 *                      type: number
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o assunto pertence
 *        - in: path
 *          name: id_assunto
 *          schema:
 *              type: number
 *          required: true
 *          description: id do assunto a ser atualizado
 *         
 *      responses:
 *          201:
 *              description: Assunto atualizado com sucesso
 *          404:
 *              description: Não existe nenhuma reunião/assunto com esse id
 *          500:
 *              description: Erro na atualização do assunto
 */
//ATUALIZAR/EDITAR UM ASSUNTO
router.patch('/atualizar-assunto/:id_reuniao/:id_assunto',AssuntoController.patchAssunto);
/**
 * @swagger
 * /assuntos/{id_reuniao}/{id_assunto}:
 *  delete:
 *      summary: Remove um assunto pertencente a uma reunião
 *      tags:
 *          - Assuntos
 *                  
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o assunto a remover pertence
 *        - in: path
 *          name: id_assunto
 *          schema:
 *              type: number
 *          required: true
 *          description: id do assunto a ser removido
 *          
 * 
 *      responses:
 *          201:
 *              description: Assunto removido com sucesso
 *          404:
 *              description: Não existe nenhuma reunião/assunto com esse id
 *          500:
 *              description: Erro na remoção do assunto
 */
//REMOVE/ELIMINA UM ASSUNTO DE UMA DETERMINADA REUNIÃO
router.delete('/:id_reuniao/:id_assunto',AssuntoController.deleteAssunto);


 module.exports=router;