const User = require('../models/user')

module.exports.homeload = function( req , res ){
    res.render('home' , {
        title : "Home"
    })
}

