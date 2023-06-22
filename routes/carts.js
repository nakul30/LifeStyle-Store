const express = require('express') ; 
const router = express() ; 
const passport = require('passport') ; 
const cartcontroller = require ('../controllers/cart_controller') ;

router.get('/' , passport.checkAuthentication , cartcontroller.cartpage ) ; 
router.get('/:id' , passport.checkAuthentication , cartcontroller.addtocart ) ; 

module.exports = router ; 