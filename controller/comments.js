const trip = require('../models/trip');
const user = require('../models/user');

module.exports = (app) => {

  // CREATE
  app.post('/trips/:tripId/comments', (req, res) => {
    const currentUser = req.user;
    const postId = req.params.postId;
    // FIND THE POST AND CREATE A NEW COMMENT
    Trip.findById(postId).then((post) => {
      const comment = new Comment
    });
    post.comments.unshift(comment);
    // ADD COMMENT TO FRONT OF ARRAY
    post.save().then((post) => {
     res.redirect(`/trips/` + trip._id);
   }).catch((err) => {
        console.log(err);
    });
 });
}
