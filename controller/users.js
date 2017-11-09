// 
//
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.js');
//
//
// module.exports = (app) => {
//
//   // SIGN UP FORM
//   // SIGN UP POST
//   app.get('/sign-up', function(req, res, next) {
//     console.log('Sign up!!!!')
//     res.render('sign-up');
//   });
//
//   app.post('/sign-up', function(req, res, next) {
//     // Create User and JWT
//     const user = new User(req.body);
//     console.log(user)
//
//     user.save().then((user) => {
//       const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
//       res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//       console.log(req.cookies)
//       res.redirect('/');
//     }).catch((err) => {
//       console.log(err.message);
//     });
//
//     // user.save(function (err) {
//     //   if (err) { return res.status(400).send({ err: err }) }
//     //
//     //   const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
//     //   res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//     //   console.log(req.cookies)
//     //   res.redirect('/');
//     // })
//   });
//
//
//   // LOGIN FORM
//   app.get('/login', function(req, res, next) {
//     res.render('login');
//   });
//
//   app.post('/login', function(req, res, next) {
//     User.findOne({ email: req.body.email }, "+password", function (err, user) {
//       if (!user) { return res.status(401).send({ message: 'Wrong email or password' }) };
//       user.comparePassword(req.body.password, function (err, isMatch) {
//         if (!isMatch) {
//           return res.status(401).send({ message: 'Wrong email or password' });
//         }
//
//         var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
//         res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//
//         res.redirect('/');
//       });
//     })
//   });
//
//
//   // LOGOUT
//   app.get('/logout', function(req, res, next) {
//     res.clearCookie('nToken');
//
//     res.redirect('/');
//   })
// }
