const express = require('express') ; 
const router = express() ; 
const indexcontroller = require( '../controllers/index_controller') ; 
const homecontroller = require('../controllers/home_controller') ;
const passport = require('passport') ; 
console.log("ROUTER DEPLOYED ") ; 


router.get('/' , passport.dontload ,indexcontroller.index) ; 
console.log("chkpoint r1.1");
router.use('/users' , require('./users.js'));
router.use('/products' , require('./products')) ; 
router.use('/cart' , require('./carts')) ; 
router.get('/success' , homecontroller.success )
console.log("chkpoint r1.2")
module.exports = router ; 