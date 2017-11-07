const Trip = require('../models/trip.js');

module.exports = function(app) {

    // API INDEX ROUTE
    app.get('/trips', function (req, res) {
      Trip.find(function(err, trips) {
        res.send({trips: trips});
      })
    })

    // WEB INDEX
    app.get('/', function (req, res) {
      Trip.find(function(err, trips) {
        res.render('trips-index', {trips: trip});
      })
    })

    // NEW
    app.get('/trips/new', function (req, res) {
      res.render('trips-new', {});
    })

    app.post('/trips', function (req, res) {
      Trip.create(req.body, function(err, trip) {

        if (req.header('Content-Type') == 'application/json') {
          return res.send({ trip: trip }); //=> RETURN JSON
        } else {
          return res.redirect('/trips/' + trip._id);
        }
      })
    })

    app.get('/trips/:id', function (req, res) {
      Trip.findById(req.params.id).exec(function (err, trip) {
        res.render('trips-show', {trip: trip});
      })
    })

    //UPDATE
    app.put('/trips/:id', function (req, res) {
        console.log(req.body)
      Trip.findByIdAndUpdate(req.params.id,  req.body, function(err, trip) {
        res.redirect('/trips/' + trip._id);
      })
    })

    app.get('/trips/:id/edit', function (req, res) {
      Trip.findById(req.params.id, function(err, trip) {
        res.render('trips-edit', {trip: trip});
      })
    })
    
    app.delete('/trips/:id', function (req, res) {
      Trip.findByIdAndRemove(req.params.id, function(err) {
        res.redirect('/');
      })
    })


};
