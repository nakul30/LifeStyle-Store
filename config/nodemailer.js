const nodemailer = require('nodemailer') ; 
const SMTPPool = require('nodemailer/lib/smtp-pool');
const ejs = require('ejs') ; 
const path = require('path') ; 

let transporter = nodemailer.createTransport({ 
    service: 'gmail' ,
    host: 'smtp.gmail.com' , 
    port : 587 ,
    secure : false ,
    auth: { 
        user : 'karanbansal.0009@gmail.com' ,
        pass :'iamnakulgarg'
    }
}) ;

let renderTemplate = ( data , relativePath) => { 
    let mailHTML ; 
    ejs.renderFile(
        path.join(__dirname , '../views/mailers' , relativePath) , 
        data , 
        function( err , template ){
            if ( err){console.log( err ) ; return ;}

            mailHTML = template ;
        }
    )
    return mailHTML ;
}

module.exports ={ 
    transporter : transporter , 
    renderTemplate : renderTemplate
}

// .setupmauler files and templates 