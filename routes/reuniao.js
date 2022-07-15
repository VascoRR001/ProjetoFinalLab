const express=require('express');
const router = express.Router();
const ReunioesController=require('../controllers/reuniao-controller');


/**
 * @swagger
 * /reunioes:
 *  get:
 *    summary: Retorna todas as reuniões
 *    tags:
 *          - Reuniões
 *    responses:
 *      200:
 *        description: Reuniões retornadas com sucesso
 *      500:
 *        description: Erro no retorno das reuniões
 */
//RETORNA TODAS AS REUNIÕES
router.get('/',ReunioesController.getReunioes);//sim
/**
 * @swagger
 * /reunioes/criar-reuniao:
 *  post:
 *      summary: Cria uma nova reunião
 *      tags:
 *          - Reuniões
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: Reunião
 *          description: A reunião a ser criado
 *          schema:
 *              type: object
 *              required:
 *                - descricao
 *                - duracao
 *                - local
 *                - dinicio
 *              properties:
 *                  descricao:
 *                      type: string
 *                  duracao:
 *                      type: number
 *                  local:
 *                      type: string
 *                  dinicio:
 *                      type: string
 * 
 *      responses:
 *          201:
 *              description: Reunião criada com sucesso
 *          500:
 *              description: Erro na criação da reunião
 */
//INSERE UMA REUNIÃO
router.post('/criar-reuniao',ReunioesController.postReuniao);//sim
/**
 * @swagger
 * /reunioes/{id_reuniao}:
 *  get:
 *      summary: Retorna uma determinada reunião
 *      tags:
 *          - Reuniões
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a ser retornada
 * 
 *      responses:
 *          201:
 *              description: Reunião retornada com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro no retorno da reunião
 */
//RETORNA OS DADOS DE UMA REUNIÃO
router.get('/:id_reuniao',ReunioesController.getReuniao);//sim
/**
 * @swagger
 * /reunioes/atualizar-reuniao/{id_reuniao}:
 *  patch:
 *      summary: Atualiza uma reunião
 *      tags:
 *          - Reuniões
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: Reunião
 *          description: A reunião a ser atualizada
 *          schema:
 *              type: object
 *              required:
 *                - descricao
 *                - duracao
 *                - local
 *                - dinicio
 *              properties:
 *                  descricao:
 *                      type: string
 *                  duracao:
 *                      type: number
 *                  local:
 *                      type: string
 *                  dinicio:
 *                      type: string
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: O id da reunião a ser atualizada
 * 
 *      responses:
 *          201:
 *              description: Reunião atualiazda com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro na criação da reunião
 */
//ALTERA UMA REUNIÃO
router.patch('/atualizar-reuniao/:id_reuniao',ReunioesController.patchReuniao);//sim
/**
 * @swagger
 * /reunioes/remover-reuniao/{id_reuniao}:
 *  delete:
 *      summary: Remove uma reunião
 *      tags:
 *          - Reuniões
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a remover
 * 
 *      responses:
 *          201:
 *              description: Reunião removida com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro na remoção da reunião
 */
//REMOVE UMA REUNIÃO
router.delete('/remover-reuniao/:id_reuniao',ReunioesController.deleteReuniao);//sim
//TERMINA UMA REUNIÃO
/**
 * @swagger
 * /reunioes/terminar-reuniao/{id_reuniao}:
 *  patch:
 *      summary: Terminar uma reunião
 *      tags:
 *          - Reuniões
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: O id da reunião a ser terminada
 * 
 *      responses:
 *          201:
 *              description: Reunião terminada com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro no termino da reunião
 */
//TERMINAR REUNIÃO
router.patch('/terminar-reuniao/:id_reuniao',ReunioesController.TerminaReuniao);//sim


module.exports=router;