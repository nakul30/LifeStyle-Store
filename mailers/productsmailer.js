const nodeMailer = require('../config/nodemailer') ; 
exports.newProduct = (product) => { 
    console.log("insing mailer ") ; 
    console.log(product.puser.email) ;
    let htmlString = nodeMailer.renderTemplate({ product : product } , '/products/newproduct.ejs')
    nodeMailer.transporter.sendMail({
        from : 'karanbansal.0009@gmail.com' ,
        to : product.puser.email ,
        subject :"NEW Product Added",
        html : htmlString
    },( err , info )=>{
        if ( err){console.log( err ) ; return ;}
        console.log('Message Sent ' , info ) ;
        return ;
    })
}