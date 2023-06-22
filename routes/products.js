const express = require('express') ; 
const router = express() ; 
const productcontroller = require('../controllers/home_controller') ; 
const passport = require('passport') ; 

router.get('/' , passport.checkAuthentication  ,productcontroller.homeload ) ; 
router.get('/listproduct' , passport.checkAuthentication , productcontroller.listload ) ;
router.post('/createproduct' , passport.checkAuthentication , productcontroller.createproduct) ;

module.exports = router ; 