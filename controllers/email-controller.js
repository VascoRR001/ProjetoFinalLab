const nodemailer=require('nodemailer');

exports.sendEmail=(req,res)=>{
    const user=req.body.email;
    const pass=req.body.password;
    const transporter=nodemailer.createTransport({
        host:'smpt.mailtrap.io',
        port:2525,
        auth:{
            user,
            pass
        }
        
    });
    transporter.sendMail({
        from:"noreply@celke.com.pt",
        to:user,
        subject:'Convocatória para a reunião',
        text:`Olá!Foi convocado para uma nova reunião.Consulte os detalhes da reunião em ${'localhost:3000/reunioes/30'}`
    }).then(info=>{
        res.send(info)
    }).catch(err=>{
        res.send(err);
    });
}