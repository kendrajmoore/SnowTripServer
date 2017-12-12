
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Trip = require('../models/trip.js');
const Comment = require('../models/comment')


module.exports = (app) => {
    //API INDEX ROUTE
    app.get('/login', function (req, res) {
      // User.find(function(err, user) {
          res.render('login');

          // { userLoggedIn: !!req.user });
      // })
    })

    app.get('/logout', (req, res) => {
      res.clearCookie('nToken');
      res.redirect('/');
    })

    app.get('/sign-up', function (req, res) {
      res.render('sign-up', { userLoggedIn: !!req.user });
    })

    app.post('/sign-up', (req, res) => {
      const user = new User(req.body);

      console.log(user)

      //AUTH USER TOKEN
      user.save((err) => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        if (req.header('Content-Type') == 'application/json') {
          // MOBILE/JSON
          if (err) { return console.log (err) }
          res.send({ nToken: token });
        } else {
          // WEB/HTML
          if (err) { return console.log (err) }

          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
          res.redirect('/');
        }
      });
    });

    //LOGIN

    app.post("/login", function(req, rest, next) {
      res.redirect('/');
    })


  //  LOGIN
// app.post('/login', function(req, res, next) {
//   User.findOne({ username: req.body.username }, "+password", function (err, user) {
//     console.log(user);
//     if (!user) { return res.status(401).send({ message: 'Wrong username or password' }) };
//     user.comparePassword(req.body.password, function (err, isMatch) {
//       console.log(!isMatch);
//       if (!isMatch) {
//         return res.status(401).send({ message: 'Wrong username or password' });
//       }
//
//       const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
//       res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//
//           res.redirect('/');
//         });
//       })
//     });

  //SHOW
  app.get('/profile', function (req, res) {
    User.findById(req.user._id).exec(function (err, user) {
      if (req.header('Content-Type') == 'application/json') {
        return res.send({ user: user }); //=> RETURN JSON
      } else {
        return res.render('profile', { user: user, userLoggedIn: !!req.user  });
      }
    })
  })

  //UPDATE
  app.put('/profile', function (req, res) {
    User.findByIdAndUpdate(req.user.id,  req.body, function(err, user) {
      if (err) { return console.log(err) }
      res.redirect('/profile');
    })
  })

  //EDIT
  app.get('/profile/edit', function (req, res) {
    User.findById(req.user.id, function(err, user) {
      if (err) { return console.log(err) }
      res.render('user-edit', { user: user, userLoggedIn: !!req.user });
    })
  })

  // DELETE
  app.delete('/profile/:id/delete', function (req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
      if (err) { return console.log(err) }
      if (req.header('Content-Type') == 'application/json') {
        return res.send({ "message": "Account deleted sucessfully" }).status(200) //=> RETURN JSON
      } else {
        return res.redirect('/');
      }
    })
  })
}
