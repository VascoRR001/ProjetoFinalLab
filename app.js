const express=require('express');
const app=express();
const rotaReunioes=require('./routes/reuniao');
const rotaDocumentos=require('./routes/documento');
const rotaAssuntos=require('./routes/assuntos');
const rotaUsuarios=require('./routes/registos');
const rotaReunioesInterv=require('./routes/reuniaointerv');
const morgan=require('morgan');
const bodyParser=require('body-parser');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));//apenas dados simples
app.use(bodyParser.json());//json de entrada no body
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/reunioes',rotaReunioes);
app.use('/documentos',rotaDocumentos);
app.use('/usuarios',rotaUsuarios);
app.use('/',rotaAssuntos);
app.use('/reunioes/intervenientes',rotaReunioesInterv);



//Quando não encontra rota,entra aqui
app.use((req,res,next)=>{
    const erro=new Error('Não encontrado');
    erro.status=404;
    next(erro);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.send({erro:{
        mensagem:error.message
    }
   });
});

module.exports=app;