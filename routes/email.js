const express=require('express');
const { pool } = require('../mysql');
const router = express.Router();
const login=require('../middleware/login');
const nodemailer=require('nodemailer');
const EmailController=require('../controllers/email-controller');


router.get('/',EmailController.sendEmail);

module.exports=router;