const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const Comment = require('../models/comment')

module.exports = function(app) {

    // API INDEX ROUTE
    //
    app.get('/trips', function (req, res) {
      Trip.findById(function(err, trips) {
        if (err) {
          console.log(err)
        }
          res.send({trips: trips, userLoggedIn: !!req.user });
      })
    })

    // WEB INDEX
    app.get('/', function (req, res) {
      const now = new Date();
      Trip.find({ departsOn: { $gt: now } }).sort('departsOn desc').exec(function(err, trips) {
        if (err) { return console.log(err) }
         res.render('trips-index', {trips: trips, userLoggedIn: !!req.user });
      })
    })

    // NEW
    app.get('/trips/new', function (req, res) {
      res.render('trips-new', { timesOfDay: Trip.timesOfDay(), userLoggedIn: !!req.user  });
    })

    app.get('/return', function (req, res) {
      res.render('return', { timesOfDay: Trip.timesOfDay(), userLoggedIn: !!req.user  });
    })

    // TODO: Display trips
    //trips#create
      //departsOn, origin, destination => save tripA
      //if returnsOn is present?
        //make a tripB with origin: destination, desitnation: origin with departsOn: returnsOn, initialTrip = tripA, tripA.returnTrip = tripB
      //else (one way trip)
        //do nothing

    //CREATE()
    app.post('/trips', function (req, res) {
      // Set trip to PST time
      req.body.departsOn = new Date(req.body.departsOn + " PST")
      // Set trip user to be current user
      req.body.user = req.user._id

      let tripA = new Trip(req.body);

      tripA.save(req.body, function(err, trip) {
        // If there is a return trip
        if (req.body.returnsOn) {
          req.body.returnsOn = new Date(req.body.returnsOn + " PST")
          let tripB = new Trip({
            origin: req.body.destination,
            destination: req.body.origin,
            departsOn: req.body.returnsOn,
            initialTrip: tripA._id,
            user: req.user._id
          })

          tripB.save();

          // set returnsOn on tripA
          trip.returnsOn = req.body.returnsOn;
          trip.save()

          // --------------------
          // const tripBPromise = tripB.save();
          //
          // // set returnsOn on tripA
          // trip.returnsOn = req.body.returnsOn;
          // const tripAPromise = trip.save()
          // Promise.all([tripAPromise, tripBPromise]).then((values) => {
          //   // values => [tripA, tripB]
          //   // ...
          // }).catch((err) => {
          //   console.log(err.message)
          // })
          // --------------------
        }

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
    })

    //
    app.post('/trips/returns', function (req, res) {
      // req.body.departsOn = new Date(req.body.departsOn + " PST")
      req.body.returnsOn = new Date(req.body.returnsOn + " PST")

      // Consider new Trip() consider using promise here.
      Trip.create(req.body, function(err, trip) {
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
          return res.redirect('/trips/return/' + trip._id);
        }
      })
    })

    // SHOW
    app.get('/trips/:id', function (req, res) {
      Trip.findById(req.params.id).exec(function (err, trip) {

        // a == b <- same values
        // a === b <- same value same type
        // Consider === over == most of the time.

        if (req.header('Content-Type') == 'application/json') {
          return res.send({ trip: trip }); //=> RETURN JSON
        } else {
          return res.render('trips-show', { trip: trip, userLoggedIn: !!req.user });
        }
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
};
