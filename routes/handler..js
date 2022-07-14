const express=require('express');
const router = express.Router();
const handler=require('../middleware/autenticacao');

router.post('/signin',handler.signinHandler);
router.get('/welcome',handler.welcomeHandler);
router.post('/refresh',handler.refreshHandler);
router.get('/logout',handler.logoutHandler);

module.exports=router;