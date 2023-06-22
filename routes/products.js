const express = require('express') ; 
const router = express() ; 
const productcontroller = require('../controllers/home_controller') ; 
const passport = require('passport') ; 

router.get('/' , passport.checkAuthentication  ,productcontroller.homeload ) ; 
router.get('/listproduct' , passport.checkAuthentication , productcontroller.listload ) ;

module.exports = router ; 