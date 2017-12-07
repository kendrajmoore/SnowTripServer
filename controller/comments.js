const trip = require('../models/trip');
const user = require('../models/user');

module.exports = (app) => {

  // CREATE
  app.post('/comments', (req, res) => {

      const comment = new Comment
      comment.save().then((comment) => {
      res.redirect('/profile');
      }).catch((err) => {
        console.log(err);
    });
 });
}
