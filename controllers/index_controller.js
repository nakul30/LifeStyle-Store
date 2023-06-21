module.exports.index = function( req , res ){
    // console.log(req.cookies) ; 
    // similarly i can change cookie 
    res.render('index' , {
        title : "lifestyle store"
    })
}
