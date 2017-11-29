
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

    // LOGIN
// app.post('/login', function(req, res, next) {
//   User.findOne({ username: req.body.username }, "+password", function (err, user) {
//     if (!user) { return res.status(401).send({ message: 'Wrong username or password' }) };
//     user.comparePassword(req.body.password, function (err, isMatch) {
//       if (!isMatch) {
//         return res.status(401).send({ message: 'Wrong username or password' });
//       }
//
//       const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
//       res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//
//       res.redirect('/');
//     });
//   })
// });


// Create a new session, first testing username/password combo
//exports.create = function(request, response) {
  //  var email = request.body.email;
    //var candidatePassword = request.body.password;

    // Look for a user by the given username
    //User.findOne({
      //  email: email
  //  }, function(err, user) {
    //    if (err || !user) return invalid();

        // We have a user for that username, test password
      //  user.comparePassword(candidatePassword, function(err, match) {
        //    if (err || !match) return invalid();
          //  return valid(user);
      //  });
  //  });

    // respond with a 403 for a login error
  //  function invalid() {
    //    error(response, 403, 'Invalid username/password combination.');
  //  }

    // respond with a new session for a valid password, and send a 2FA token
  //  function valid(user) {
    //    Session.createSessionForUser(user, false, function(err, sess, authyResponse) {
      //      if (err || !sess) {
        //        error(response, 500,
          //          'Error creating session - please log in again.');
          //  } else {
                // Send the unique token for this session and the onetouch response
              //  response.send({
                //    token: sess.token,
                  //  authyResponse: authyResponse
              //  });
          //  }
      //  });
  //  }
//};



  //NEW

  app.get('/sign-up', function (req, res) {
    const user = new User;
    res.render('sign-up', { user : user });
  })

    app.post('/sign-up', function (req, res) {
      User.create(req.body, function(err, user) {
        console.log(user);

        res.redirect('/user/' + user._id);
      })
    })

  //CREATE
  // app.post('/sign-up', function(req, res) {
  //   const user = new User(req.body);
  //
  //   console.log(req.body)
  //   //AUTH USER TOKEN
  //   user.save().then((user) => {
  //     const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
  //     res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
  //     console.log(req.cookies)
  //     res.redirect('/');
  //   }).catch((err) => {
  //     console.log(err.message);
  //   });
  // });

  // app.post('/sign-up', function (req, res) {
  //   User.create(req.body, function(err, user) {
  //       if (err) {
  //         console.log(err)
  //         return res.status(400).send({ message: "There was a problem creating your account."})
  //     } else {
  //         return res.redirect('/login')
  //     }
  //   })
  // })
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
