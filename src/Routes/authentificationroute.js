const express = require('express')

//mergeParams:true to get the tourId from the rout 
const router = express.Router();
const authentification = require('../Controllers/authentification')

router.post('/login', authentification.login)
router.post('/loginAdmin', authentification.loginAdmin)
router.post('/loginSuperAdmin', authentification.loginSuperAdmin)
router.post('/loginClient', authentification.loginClient)


router.post('/signup', authentification.signup)
router.post('/createUser', authentification.createuser)
router.post('/createClient', authentification.createClient)
router.post('/createAdmin', authentification.createAdmin)
module.exports = router;