const User = require('../models/user'); //required for authentication purpose also wheersover User used tehre needed 
const fs = require('fs' ) ;
const path = require('path') ; 


module.exports.profile = function (req, res) {
    //if params had came then it would run else onluy pass local users 
    User.findById(req.params.id)
        .exec()
        .then(user => {
            return res.render('user_profile', {
                title: 'User Profile',
                profilebyparam: user
            });
        })
        .catch(err => {
            console.error(err);
            // Handle the error, such as sending an error response or redirecting to an error page
        });
};
module.exports.update = async function (req, res) {
    // console.log(req.body.name) ;
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) (console.log('*****MulterERror', err));

                //   console.log(req.file);
                // console.log(user.avatarPath);
                // here not able to red by body beauese multer 

                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    // console.log( user.avatar) ; 
                    if (user.avatar) {
                        // console.log("here..........." ) ; 
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving patho of uploaddd file into avatar file of use 
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    // console.log(user.avatar) ; 
                }
                user.save();
                return res.redirect('back');
            })
        }
        catch {
            return res.redirect('back');
        }

    }
    else {
        req.flash('error', 'Unauthorised');
        return res.status(401).send('Unauthorsied');
    }
}

module.exports.signup = function (req, res) {
    // so that button is not accesible when ishgned in 
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render("user_signup", {
        title: "SIGNUP",
    })
}

module.exports.signin = function (req, res) {
    // console.log(req.user.name) ;  
    // so that button us no tvisiboe when use signed in 
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_signin', {
        title: "Sign IN",
        // console.log(req.user.name) 
    })
}
module.exports.create = async function (req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {

            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                contact: req.body.contact,
                address: req.body.address
            })
            // console.log(req.body.name) ; 
            return res.redirect('/users/signin');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error:", err);
        return res.redirect('/');
    }
};
module.exports.createsession = function (req, res) {
    //todo--------> using passport authentication 
    // return res.redirect('/users/profile') ; 
    // req.flash('success' , 'Logged In') ;  
    return res.redirect('/products');
};
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log("ERR");
            return;
        }
        // req.flash('success' , 'You have Logged out') ; 
        return res.redirect('/');
    });
    // return res.redirect('/') ; 
}
