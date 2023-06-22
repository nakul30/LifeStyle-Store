const { findById } = require('../models/user');
const User = require('../models/user');
const Product = require('../models/product');

module.exports.homeload = function (req, res) {
  res.render('home', {
    title: "Home"
  })
}
module.exports.home = function(req, res) {
  // Find all users
  User.find({})
    .exec()
    .then(users => {
      // Find all posts
      Post.find({})
        .populate('user') // Populate the 'user' field with User documents
        .populate({
          path: 'comments',
          populate: {
            path: 'user'
          }
        })
        .exec()
        .then(posts => {
          return res.render('home', {
            title: "Universe Home",
            posts: posts,
            all_users: users
          });
        })
        .catch(err => {
          console.error(err);
          // Handle the error, such as sending an error response or redirecting to an error page
        });
    })
    .catch(err => {
      console.error(err);
      // Handle the error, such as sending an error response or redirecting to an error page
    });
};
