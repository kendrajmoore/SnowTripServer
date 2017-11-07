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
        res.render('trips-index', {trips: trips});
      })
    })

    // NEW
    app.get('/trips/new', function (req, res) {
      res.render('trips-new', {});
    })

    app.post('/trips', function (req, res) {
      Trip.create(req.body, function(err, trips) {

        if (req.header('Content-Type') == 'application/json') {
          return res.send({ trips: trips }); //=> RETURN JSON
        } else {
          return res.redirect('/trips/' + this._id);
        }
      })
    })

    app.get('/trips/:id', function (req, res) {
      Trip.findById(req.params.id).exec(function (err, trips) {
        res.render('trips-show', {trips: trips});
      })
    })

    //UPDATE
    app.put('/trips/:id', function (req, res) {
        console.log(req.body)
      Trip.findByIdAndUpdate(req.params.id,  req.body, function(err, trips) {
        res.redirect('/trips/' + this._id);
      })
    })

    app.get('/trips/:id/edit', function (req, res) {
      Trip.findById(req.params.id, function(err, trips) {
        res.render('trips-edit', {trips: trips});
      })
    })

    app.delete('/trips/:id', function (req, res) {
      Trip.findByIdAndRemove(req.params.id, function(err) {
        res.redirect('/');
      })
    })


};
