const express=require('express');
const app=express();
const rotaReunioes=require('./routes/reuniao');
const rotaDocumentos=require('./routes/documento');
const rotaAssuntos=require('./routes/assuntos');
const rotaUsuarios=require('./routes/registos');
const rotaReunioesInterv=require('./routes/reuniaointerv');
const rotaAutenticacao=require('./middleware/autenticacao');
const morgan=require('morgan');
//const basicAuth=require('./middleware/basic-auth');
const bodyParser=require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
const cookieParser = require('cookie-parser')
const Handler = require('./routes/handler.');



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).send({});
    }
    next();
});

/*app.post('/welcome',welcomeHandler);
app.get('/refresh',refreshHandler);
app.post('/logout',logoutHandler);*/
const Options={
    definition:{
        info:{
            title:"Software de gestão de atas API",
            description:"Documentação de uma API que tem como principal funcionalidade disponibilizar serviços aos seus clientes. Esta API consome serviços de API's externas tendo a funcionalidade de autenticação. A documentação dos métodos da API é separada por endpoints mais gerais (/assuntos,/documentos,/reunioes,/reunioes-intervenientes). O servidor para onde as requisições estão a ser enviadas é o localhost que comunica com o port 3000 e a base de dados é implementada em MariaDB/Mysql. Todos este métodos apenas funcionarão se o localhost estiver ligado e o docker da base de dados também. Tecnologia utilizada: Node.js/Ambiente de desenvolvimento: Visual Studio Code",
            contact:{
                email:'vascao2001@gmailcom'
            }
        },
        externalDocs:{
            description:'Find out more about swagger',
            url:'https://swagger.io'
        },
        servers:[
            {
                url:"http://localhost:3000"
            }
        ],
    },
    apis:["./controllers/*.js","./middleware/*.js","./routes/*.js"]
}

const swaggerDocs=swaggerJSDoc(Options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
app.use('/',Handler);
app.use('/reunioes',rotaReunioes);
app.use('/documentos',rotaDocumentos);
app.use('/usuarios',rotaUsuarios);
app.use('/assuntos',rotaAssuntos);
app.use('/reunioes-intervenientes',rotaReunioesInterv);
//app.use('/AutenticacaoUTAD',rotaAutenticacao);





//Quando não encontra rota,entra aqui
app.use((req,res,next)=>{
    const erro=new Error('Não encontrado');
    erro.status=404;
    next(erro);
});

app.use((error,req,res,next)=>{
     res.status(error.status || 500).send({erro:{
        mensagem:error.message
    }
   });
   res.end();
   
});

module.exports=app;