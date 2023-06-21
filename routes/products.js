const express = require('express') ; 
const router = express() ; 
const productcontroller = require('../controllers/home_controller') ; 
const passport = require('passport') ; 

router.get('/' , passport.checkAuthentication  ,productcontroller.homeload ) ; 
router.get('/listproduct' , passport.checkAuthentication , productcontroller.productupload) ;
router.post('/create-product' ,passport.checkAuthentication , productcontroller.createproduct) ;  

module.exports = router ; 