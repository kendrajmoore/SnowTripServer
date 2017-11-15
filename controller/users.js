
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Trip = require('../models/trip.js');


module.exports = (app) => {
  //API INDEX ROUTE
  app.get('/login', function (req, res) {
    User.find(function(err, user) {
      if (err) {
        console.log(err)
      }
        res.send({user: user});
    })
  })

    app.get('/logout', (req, res) => {
      res.clearCookie('nToken');
      res.redirect('/');
    })

  // app.get('/', function (req, res) {
  //   const user = new User;
  //   User.find({ departsOn: { $gt: now } }).sort('departsOn desc').exec(function(err, user) {
  //     if (err) { return console.log(err) }
  //      res.render('/login', { user: user });
  //   })
  // })

  //NEW

  app.get('sign-up', (req, res) => {
    const user = new User;
    res.render('sign-up', { user:user });
  })


  // app.get('/sign-up', function (req, res) {
  //   const user = new User;
  //   res.render('sign-up', { user : user });
  // })

  //CREATE
  app.post('/sign-up', function (req, res) {
    User.create(req.body, function(err, user) {
      if (req.header('Content-Type') == 'application/json') {
        if (err) {
          console.log(err)
          return res.status(400).send({ message: "There was a problem creating your account."})
        }
        return res.send({ user: user }); //=> RETURN JSON
      } else {
        if (err) {
          console.log(err)
          return res.redirect('/sign-up')
        }
        return res.redirect('/profile');
      }
    })
  })

  //SHOW
  app.get('/profile', function (req, res) {
    User.findById(req.params.id).exec(function (err, user) {
      if (req.header('Content-Type') == 'application/json') {
        return res.send({ user: user }); //=> RETURN JSON
      } else {
        return res.render('user-profile', { user: user });
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
  app.delete('/profile/:id', function (req, res) {
    console.log('hello')
    User.findByIdAndRemove(req.params.id, function(err) {
      if (err) { return console.log(err) }
      console.log('hello 2')
      if (req.header('Content-Type') == 'application/json') {
        return res.send({"message": "Account deleted sucessfully"}).status(200) //=> RETURN JSON
      } else {
        return res.redirect('/');
      }
    })
  })
}
