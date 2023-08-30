const passport = require('passport') ; 
const LocalStrategy = require('passport-local').Strategy ; 


const User = require('../models/user')
//authenticaiton useing passport 
passport.use( new LocalStrategy({
    usernameField : 'email' // fron schema 
    } ,
    async function( email , password , done ){
        try {
            const user = await User.findOne({ email: email });
          
            if (!user || user.password !== password) {
              console.log('Invalid username/password');
              return done(null, false);
            }
          
            return done(null, user);
        } catch (err) {
            console.log('Error in finding user -- Passport', err);
            return done(err);
        }
          
          
    } 

)) ; 


//cerealise and decerialise function 

// serialise the user to decide which key to kept in cookie 

passport.serializeUser( function( user , done ){
    done( null , user.id) ; 
}) ; 

// whichi identi is in the user base so decreralise 
passport.deserializeUser(async function(id, done) {
    try {
      let finder = await User.findById(id).exec();
      if (finder) {
        // console.log(finder);
        return done(null, finder);
      }
    } catch (err) {
      console.log("ERROR: ", err);
      return done(err);
    }
  });

  
// check if user is authenticated 
passport.checkAuthentication = async function( req , res , next ){
    // if user signed in the pass to funcion controlleraction
    try{
        if ( req.isAuthenticated()){
            // console.log(req.user.name ) ; 
            return next()
        }
        return res.redirect('/users/signin') ;
    }
    catch( err ){
        console.log("ERR") ; 
    }
     
}
passport.dontload = async function( req , res , next ){
    try{
        if ( req.isAuthenticated()){
            return res.redirect('/products') ; 
        }
        return next() ;
    }
    catch( err ){
        console.log( "ERR APPERA") ; 
    }
}
//chekc if user is signed in 
passport.setAuthenticateduser = function( req , res, next  ){
    if ( req.isAuthenticated()){
        // console.log("ERR") ; 
        //whenevere user is signed in we get its id in req.user as wwe are using user now transfer to response locals for the views 
        res.locals.user = req.user ; 
        // next() ; 
    }
    next() ; 
}
module.exports = passport ; 