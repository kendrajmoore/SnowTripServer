
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Trip = require('../models/trip.js');


module.exports = (app) => {
  // API INDEX ROUTE
  // app.get('/login', function (req, res) {
  //   User.find(function(err, user) {
  //     if (err) {
  //       console.log(err)
  //     }
  //       res.send({user: user});
  //   })
  // })
  //
  //


  // app.get('/', function (req, res) {
  //   const user = new User;
  //   User.find({ departsOn: { $gt: now } }).sort('departsOn desc').exec(function(err, user) {
  //     if (err) { return console.log(err) }
  //      res.render('/login', { user: user });
  //   })
  // })

  //NEW
  app.get('/sign-up', function (req, res) {
    res.render('sign-up', { user: user });
  })

  //CREATE
  // app.post('/sign-up', function (req, res) {
  //   User.create(req.body, function(err, user) {
  //     if (req.header('Content-Type') == 'application/json') {
  //       if (err) {
  //         console.log(err)
  //         return res.status(400).send({ message: "There was a problem creating your trip."})
  //       }
  //       return res.send({ user: user }); //=> RETURN JSON
  //     } else {
  //       if (err) {
  //         console.log(err)
  //         return res.redirect('/sign-up')
  //       }
  //       return res.redirect('/login');
  //     }
  //   })
  // })

  // SHOW
  // app.get('/trips/:id', function (req, res) {
  //   Trip.findById(req.params.id).exec(function (err, trip) {
  //     if (req.header('Content-Type') == 'application/json') {
  //       return res.send({ trip: trip }); //=> RETURN JSON
  //     } else {
  //       return res.render('trips-show', {trip: trip});
  //     }
  //   })
  // })

  //UPDATE
  // app.put('/trips/:id', function (req, res) {
  //   req.body.departsOn = new Date(req.body.departsOn + " PST")
  //   req.body.returnsOn = new Date(req.body.returnsOn + " PST")
  //
  //   Trip.findByIdAndUpdate(req.params.id,  req.body, function(err, trip) {
  //     if (err) { return console.log(err) }
  //     res.redirect('/trips/' + trip._id);
  //   })
  // })

  // EDIT
  // app.get('/trips/:id/edit', function (req, res) {
  //   Trip.findById(req.params.id, function(err, trip) {
  //     if (err) { return console.log(err) }
  //     res.render('trips-edit', { trip: trip, timesOfDay: Trip.timesOfDay() });
  //   })
  // })

  // // DELETE
  // app.delete('/trips/:id', function (req, res) {
  //   console.log('hello')
  //   Trip.findByIdAndRemove(req.params.id, function(err) {
  //     if (err) { return console.log(err) }
  //     console.log('hello 2')
  //     if (req.header('Content-Type') == 'application/json') {
  //       return res.send({"message": "Trip deleted sucessfully"}).status(200) //=> RETURN JSON
  //     } else {
  //       return res.redirect('/');
  //     }
  //   })
  // })


};
