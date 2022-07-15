const express=require('express');
const router = express.Router();
const ReunioesIntervController=require('../controllers/reuniaointerv-controller');



/**
 * @swagger
 * /reunioes-intervenientes/mostrar-intervenientes/{id_reuniao}:
 *  get:
 *      summary: Retorna os intervenientes convocados para uma reunião
 *      tags:
 *          - Reuniões/intervenientes
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a ser pesquisada
 * 
 *      responses:
 *          201:
 *              description: Intervenientes retornados com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro no retorno dos intervenientes
 */

//RETORNA TODOS OS INTERVENIENTES QUE FORAM CONVOCADOS PARA AQUELA REUNIÃO
router.get('/mostrar-intervenientes/:id_reuniao'/*,AutenticacaoUtilizador.VerificacaoAuntenticacao*/,ReunioesIntervController.getIntervenientes);//sim
/**
 * @swagger
 * /reunioes-intervenientes/mostrar-reunioes/{id_interv}:
 *  get:
 *      summary: Retorna todas as reuniões que o interveniente foi convocado
 *      tags:
 *          - Reuniões/intervenientes
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_interv
 *          schema:
 *              type: number
 *          required: true
 *          description: id do interveniente a ser pesquisado
 * 
 *      responses:
 *          201:
 *              description: Reuniões retornadas com sucesso
 *          404:
 *              description: Não existe nenhum interveniente com esse id
 *          500:
 *              description: Erro no retorno das reuniões
 */
//RETORNA TODAS AS REUNIÕES QUE UM INTERVENIENTE FOI CONVOCADO
router.get('/mostrar-reunioes/:id_interv',ReunioesIntervController.getReunioes);//sim

/**
 * @swagger
 * /reunioes-intervenientes/mostrar-reunioes-em-curso/{id_interv}:
 *  get:
 *      summary: Retorna todas as reuniões em curso de um interveniente
 *      tags:
 *          - Reuniões/intervenientes
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_interv
 *          schema:
 *              type: number
 *          required: true
 *          description: id do interveniente a ser pesquisado
 * 
 *      responses:
 *          201:
 *              description: Reuniões em curso retornadas com sucesso
 *          404:
 *              description: Não existe nenhum interveniente com esse id
 *          500:
 *              description: Erro no retorno das reuniões em curso
 */
//RETORNA TODAS AS REUNIÕES QUE ESTÃO EM CURSO DE UM DETERMINADO INTERVENIENTE
router.get('/mostrar-reunioes-em-curso/:id_interv',ReunioesIntervController.getReunioesEmCurso);//sim
/**
 * @swagger
 * /reunioes-intervenientes/mostrar-reunioes-terminadas/{id_interv}:
 *  get:
 *      summary: Retorna todas as reuniões terminadas de um interveniente
 *      tags:
 *          - Reuniões/intervenientes
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id_interv
 *          schema:
 *              type: number
 *          required: true
 *          description: id do interveniente a ser pesquisado
 * 
 *      responses:
 *          201:
 *              description: Reuniões terminadas retornadas com sucesso
 *          404:
 *              description: Não existe nenhum interveniente com esse id
 *          500:
 *              description: Erro no retorno das reuniões terminadas
 */
router.get('/mostrar-reunioes-terminadas/:id_interv',ReunioesIntervController.getReunioesTerminadas);//Acabar o método
/**
 * @swagger
 * /reunioes-intervenientes/presencas/{id_reuniao}/{id_interv}:
 *  patch:
 *      summary: Marcar presença numa reunião
 *      tags:
 *          - Reuniões/intervenientes
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: presente
 *          description: O valor de presença (presente ou ausente)
 *          schema:
 *              type: object
 *              required:
 *                - presente
 *              properties:
 *                  presente:
 *                      type: string
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o interveniente irá marcar presença
 *        - in: path
 *          name: id_interv
 *          schema:
 *              type: number
 *          required: true
 *          description: id do interveniente que irá marcar presença
 * 
 * 
 *      responses:
 *          201:
 *              description: Presença marcada com sucesso
 *          404:
 *              description: Não existe nenhuma reunião/interveniente com esse id
 *          500:
 *              description: Erro na marcação da presença
 */
//MARCA AS PRESENÇAS DOS INTERVENIENTES QUE ESTABELECERAM CONEXÃO NUMA REUNIÃO ESPECÍFICA
router.patch('/presencas/:id_reuniao/:id_interv',ReunioesIntervController.postPresenças);
//ACABAR O PEDIDO SWAGGER E MELHOR O MÉTODO DE VOTAR NUM ASSUNTO
/**
 * @swagger
 * /reunioes-intervenientes/votar-em-assunto/{id_reuniao}/{id_assunto}:
 *  patch:
 *      summary: Votar num assunto pertencente a uma determinada reunião
 *      tags:
 *          - Reuniões/intervenientes
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: Interveniente e voto do mesmo
 *          description: Identifica o interveniente que irá votar e o respetivo voto
 *          schema:
 *              type: object
 *              required:
 *                - id_interv
 *                - voto
 *              properties:
 *                  id_interv:
 *                      type: number
 *                  voto:
 *                      type: string
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o interveniente irá votar no assunto
 *        - in: path
 *          name: id_assunto
 *          schema:
 *              type: number
 *          required: true
 *          description: id do assunto em que o interveniente vai votar
 * 
 * 
 *      responses:
 *          201:
 *              description: Voto efetuado com sucesso
 *          404:
 *              description: Não existe nenhuma reunião/assunto com esse id
 *          500:
 *              description: Erro ao efetuar o voto
 */
//VERIFICA SE UM ASSUNTO PERTENCENTE A UMA DETERMINADA REUNIÃO É POR VOTAÇÃO OU POR TOMADA DE CONHECIMENTO 
router.patch('/votar-em-assunto/:id_reuniao/:id_assunto',ReunioesIntervController.postVotacao);

/**
 * @swagger
 * /reunioes-intervenientes/adicionar-interveniente/{id_reuniao}:
 *  post:
 *      summary: Adicionar um interveniente a uma reunião
 *      tags:
 *          - Reuniões/intervenientes
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: Interveniente
 *          description: O interveniente a ser adicionado
 *          schema:
 *              type: object
 *              required:
 *                - nome
 *                - apelido
 *              properties:
 *                  nome:
 *                      type: string
 *                  apelido:
 *                      type: string
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que o interveniente será adicionado
 * 
 *      responses:
 *          201:
 *              description: Interveniente adicionado com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro no adicionamento do interveniente á reunião
 */
//ADICIONA UM INTEVENIENTE A UMA REUNIÃO
router.post('/adicionar-interveniente/:id_reuniao',ReunioesIntervController.postIntervEmReun);//sim
/**
 * @swagger
 * /reunioes-intervenientes/adicionar-intervenientes/{id_reuniao}:
 *  post:
 *      summary: Adicionar múltiplos intervenientes a uma reunião
 *      tags:
 *          - Reuniões/intervenientes
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: Intervenientes
 *          description: Os intervenientes a serem adicionados
 *          schema:
 *              type: array
 *              required:
 *                - nome
 *                - apelido
 *              items:
 *                  properties:
 *                      nome:
 *                          type: string
 *                      apelido:
 *                          type: string
 *        - in: path
 *          name: id_reuniao
 *          schema:
 *              type: number
 *          required: true
 *          description: id da reunião a que os intervenientes serão adicionados
 * 
 *      responses:
 *          201:
 *              description: Intervenientes adicionados com sucesso
 *          404:
 *              description: Não existe nenhuma reunião com esse id
 *          500:
 *              description: Erro no adicionamento dos intervenientes á reunião
 */
//ADICIONA MÚLTIPLOS INTERVENIENTES A UMA REUNIÃO DE UMA VEZ
router.post('/adicionar-intervenientes/:id_reuniao',ReunioesIntervController.postIntervsEmReun);//sim

module.exports=router;