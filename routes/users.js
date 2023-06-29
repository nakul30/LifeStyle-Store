// console.log('chekkpint 2.0') ; 
const express = require('express') ;
// console.log('chekkpint 2.0.1') ; 
const router = express() ;  
const passport = require ('passport') ; 
// console.log('chekkpint 2.0.3') ; 
const userscontroller = require('../controllers/user_controller');
// console.log('chekkpint 2.0.4') ; 
router.get('/' , passport.checkAuthentication , userscontroller.profile);
router.get('/profile' , passport.checkAuthentication , userscontroller.profile) ;
router.get('/profile/:id' , passport.checkAuthentication , userscontroller.profile) ; 
router.post('/update/:id' , passport.checkAuthentication , userscontroller.update) ; 
// console.log("chkpoint r2.1")
router.get('/signin' , userscontroller.signin) ; 
router.get('/signup' , userscontroller.signup) ; 
router.post('/create' , userscontroller.create );
router.post('/create-session', passport.authenticate(
    'local' , 
    {failureRedirect : 'signin'} , 
) ,userscontroller.createsession) ; 

console.log("chkpoint r2.2") ; 
router.get('/auth/google' , passport.authenticate('google' , {scope:['profile' , 'email']})) ; 
router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect:"/users/signin"}) , userscontroller.createsession) ;
router.get('/sign-out' , userscontroller.destroySession) ; 
module.exports = router ; 