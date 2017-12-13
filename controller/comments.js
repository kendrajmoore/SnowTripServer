const Trip = require('../models/trip');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
    //
    app.get('/comments', function (req, res) {
      Comment.find(function(err, comments) {
        res.render('comments-index', {comments: comments, userLoggedIn: !!req.user });
      })
    })

    // NEW
    app.get('/users/:userId/trips/:tripId/reviews/new', function (req, res) {
      res.render('comments-new', { tripId: req.params.tripId, userLoggedIn: !!req.user });
    })

    // CREATE
    app.post('/trips/:tripId/comments', function (req, res) {
      req.body.user = req.user._id;
      Comment.create(req.body, function(err, comment) {
        res.redirect('/trips/' + req.params.tripId);
      })
    })

    //
    app.get('/comments/:id', function (req, res) {
      Comment.findById(req.params.id).exec(function (err, comment) {
        res.render('comments-show', { comment: comment, userLoggedIn: !!req.user });
      })
    })

    //UPDATE
    app.put('/comments/:id', function (req, res) {
      Comment.findByIdAndUpdate(req.params.id,  req.body, function(err, comment) {
        res.redirect('/comments/' + comment._id);
      })
    })

    //
    app.get('/comments/:id/edit', function (req, res) {
      Comment.findById(req.params.id, function(err, comment) {
        res.render('comments-edit', { comment: comment, userLoggedIn: !!req.user });
      })
    })

    //
    app.delete('/comments/:id', function (req, res) {
      Comment.findByIdAndRemove(req.params.id, function(err) {
        res.redirect('/');
      })
    })
}
