const Trip = require('../models/trip.js');
const User = require('../models/user.js');

module.exports = function(app) {

    // API INDEX ROUTE
    //
    // app.get('/trips', (req, res) => {
    //   Trip.findById.then(trips) {
    //     res.send({ trips });
    //   }
    // })
    app.get('/trips', function (req, res) {
      Trip.find(function(err, trips) {
        if (err) {
          console.log(err)
        }
          res.send({trips: trips});
      })
    })

    // WEB INDEX
    app.get('/', function (req, res) {
      const now = new Date();
      Trip.find({ departsOn: { $gt: now } }).sort('departsOn desc').exec(function(err, trips) {
        if (err) { return console.log(err) }
         res.render('trips-index', {trips: trips});
      })
    })
      //NEW
      // app.get('/trips/new', (req, res) => {
      //   res.render('trips-new', { timesOfDay: Trip.timesofDay() });
      // })
    // NEW
    app.get('/trips/new', function (req, res) {
      res.render('trips-new', { timesOfDay: Trip.timesOfDay() });
    })

    //CREATE
    //
    // app.post('/trips', (req, res) => {
    //   req.body.departsOn = new Date(req.body.departsOn + " PST")
    //   req.body.returnsOn = new Date(req.body.returnsOn + " PST")
    //   Trip.create(req.body, (trip) => {
    //     if(req.header('Content-Type') ==
    //     'application/json') {
    //       return res.status(400)
    //     }
    //   })
    // })
    app.post('/trips', function (req, res) {
      req.body.departsOn = new Date(req.body.departsOn + " PST")
      req.body.returnsOn = new Date(req.body.returnsOn + " PST")

      Trip.create(req.body, function(err, trip) {
        if (req.header('Content-Type') == 'application/json') {
          if (err) {
            console.log(err)
            return res.status(400).send({ message: "There was a problem creating your trip."})
          }
          return res.send({ trip: trip }); //=> RETURN JSON
        } else {
          if (err) {
            console.log(err)
            return res.redirect('/trips/new')
          }
          return res.redirect('/trips/' + trip._id);
        }
      })
    })

    // SHOW
    app.get('/trips/:id', function (req, res) {
      Trip.findById(req.params.id).exec(function (err, trip) {
        if (req.header('Content-Type') == 'application/json') {
          return res.send({ trip: trip }); //=> RETURN JSON
        } else {
          return res.render('trips-show', {trip: trip});
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
        res.render('trips-edit', { trip: trip, timesOfDay: Trip.timesOfDay() });
      })
    })

    // DELETE
    app.delete('/trips/:id', function (req, res) {
      console.log('hello')
      Trip.findByIdAndRemove(req.params.id, function(err) {
        if (err) { return console.log(err) }
        console.log('hello 2')
        if (req.header('Content-Type') == 'application/json') {
          return res.send({"message": "Trip deleted sucessfully"}).status(200) //=> RETURN JSON
        } else {
          return res.redirect('/');
        }
      })
    })


};
