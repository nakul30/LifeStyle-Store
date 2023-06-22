const express = require('express') ; 
const router = express() ; 
const homecontroller = require('../controllers/home_controller') ; 
const productcontroller= require('../controllers/product_controller')
const passport = require('passport') ; 

router.get('/' , passport.checkAuthentication  ,homecontroller.homeload ) ; 
router.get('/listproduct' , passport.checkAuthentication , productcontroller.listload ) ;
router.post('/createproduct' , passport.checkAuthentication , productcontroller.createproduct) ;
router.get('/destroy/:id' , passport.checkAuthentication ,productcontroller.destroy ) ;

module.exports = router ; 