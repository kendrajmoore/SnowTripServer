const Trip = require('../models/trip');
const User = require('../models/user');

module.exports = (app) => {
  //new
    app.get('profile/comments/new', function (req, res) {
      console.log(hi)
      res.render('comments-new', {});
    })

    app.post('/profile/comments', function (req,res) {
      Comment.create(req.body, function(err, comment) {
        res.redirect('/');
      })
    })
}
