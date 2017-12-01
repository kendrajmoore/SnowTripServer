
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Trip = require('../models/trip.js');


module.exports = (app) => {
    //API INDEX ROUTE
    app.get('/login', function (req, res) {
      User.find(function(err, user) {
          res.render('login');
      })
    })

    app.get('/logout', (req, res) => {
      res.clearCookie('nToken');
      res.redirect('/');
    })

    app.get('/sign-up', function (req, res) {
      res.render('sign-up');
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


  //  LOGIN
app.post('/login', function(req, res, next) {
  User.findOne({ username: req.body.username }, "+password", function (err, user) {
    if (!user) { return res.status(401).send({ message: 'Wrong username or password' }) };
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong username or password' });
      }

      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

          res.redirect('/');
        });
      })
    });


  //SHOW
  app.get('/profile', function (req, res) {

    /*
    let user
    User.findById(req.params.id).then((foundUser) => {
      user = foundUser
      return Trip.find({ user })
    }).then((trips) => {
      console.log(user)
      console.log(trips)
      // ...
    }).catch((err) => {
      console.log(err.message);
    })
    */

    User.findById(req.params.id).exec(function (err, user) {

      const trip = { origon: "trip origin", return: "trip return" }

      if (req.header('Content-Type') == 'application/json') {
        return res.send({ user: user }); //=> RETURN JSON
      } else {
        return res.render('user-form', { user, trip });
      }
    })
  })

  //UPDATE
  app.put('/profile/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id,  req.body, function(err, user) {
      if (err) { return console.log(err) }
      res.redirect('/profile/' + trip._id);
    })
  })

  //EDIT
  app.get('/profile/:id/edit', function (req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err) { return console.log(err) }
      res.render('user-edit', { user: user });
    })
  })

  // DELETE
  app.delete('/profile/:id/delete', function (req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
      if (err) { return console.log(err) }
      if (req.header('Content-Type') == 'application/json') {
        return res.send({"message": "Account deleted sucessfully"}).status(200) //=> RETURN JSON
      } else {
        return res.redirect('/');
      }
    })
  })
}
