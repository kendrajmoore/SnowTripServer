module.exports = function (app) {

// **************************** USER ******************************

// User Routes
app.get('/sign-up', function(req, res, next) {
  console.log('Sign up!!!!')
  res.render('sign-up');
});
    });
// Creating an user
    app.post('/user/new', function (req, res) {
        User.create(req.body, function (err, user) {
            console.log(req.body);
            res.render('article-index', {user: user})
        });
    });
};
