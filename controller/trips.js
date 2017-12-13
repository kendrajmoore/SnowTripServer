const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const Comment = require('../models/comment');

module.exports = function(app) {

        // API INDEX ROUTE
        //
        app.get('/trips', function (req, res) {
          Trip.find(function(err, trips) {
            if (err) {
              console.log(err)
            }
              res.send({ trips: trips });

                // userLoggedIn: !!req.user });
          })
        })

        // WEB INDEX
        app.get('/', function (req, res) {
          const now = new Date();
          Trip.find({ departsOn: { $gt: now } }).sort('departsOn desc').exec(function(err, trips) {
            if (err) { return console.log(err) }
             res.render('trips-index', { trips: trips, userLoggedIn: !!req.user });
          })
        })

        // NEW
        app.get('/trips/new', function (req, res) {
          res.render('trips-new', { timesOfDay: Trip.timesOfDay(), userLoggedIn: !!req.user  });
        })

        //CREATE()
        app.post('/trips', function (req, res, err) {
          // Set trip to PST time
          req.body.departsOn = new Date(req.body.departsOn + " PST")
          req.body.returnsOn = new Date(req.body.returnsOn + " PST")
          // Set trip user to be current user
          req.body.user = req.user._id

          let trip = new Trip(req.body);
              trip.save()

              if (req.header('Content-Type') == 'application/json') {
                if (err) {
                  console.log(err)
                  return res.status(400).send({ message: "There was a problem creating your trip."})
                }
                return res.send({ trip: trip, userLoggedIn: !!req.user }); //=> RETURN JSON
              } else {
                if (err) {
                  console.log(err)
                  return res.redirect('/trips/new')
                }
                return res.redirect('/trips/' + trip._id);
              }
            })


        // SHOW
        app.get('/trips/:id', function (req, res) {
          Trip.findById(req.params.id).exec(function (err, trip) {
            // trip.user //=> user._id
            Comment.find({user: trip.user}).exec(function (err, comments) {
              if (req.header('Content-Type') == 'application/json') {
                return res.send({ trip: trip }); //=> RETURN JSON
              } else {
                return res.render('trips-show', { trip: trip, userLoggedIn: !!req.user, reviews: comments });
              }
            })
          })
        })

        //UPDATE
        app.put('/trips/:id', function (req, res) {
          req.body.departsOn = new Date(req.body.departsOn + " PST")
          req.body.returnsOn = new Date(req.body.returnsOn + " PST")

          Trip.findByIdAndUpdate(req.params.id,  req.body, function(err, trip) {
            if (err) { return console.log(err) }
            res.redirect('/trips/' + trip._id);
          })
        })

        // EDIT
        app.get('/trips/:id/edit', function (req, res) {
          Trip.findById(req.params.id, function(err, trip) {
            if (err) { return console.log(err) }
            res.render('trips-edit', { trip: trip, timesOfDay: Trip.timesOfDay(), userLoggedIn: !!req.user });
          })
        })

        // DELETE
        app.delete('/trips/:id', function (req, res) {
          Trip.findByIdAndRemove(req.params.id, function(err) {
            if (err) { return console.log(err) }
            if (req.header('Content-Type') == 'application/json') {
              return res.send({"message": "Trip deleted sucessfully"}).status(200) //=> RETURN JSON
            } else {
              return res.redirect('/');
            }
          })
        })
   }


   //
   // tripA.save(req.body, function(err, trip) {
   //   // If there is a return trip
   //   if (req.body.returnsOn) {
   //     req.body.returnsOn = new Date(req.body.returnsOn + " PST")
   //     let tripB = new Trip({
   //       origin: req.body.destination,
   //       destination: req.body.origin,
   //       departsOn: req.body.returnsOn,
   //       initialTrip: tripA._id,
   //       // user: req.user._id
   //     })
   //
   //     tripB.save();
   //
   //     // set returnsOn on tripA
