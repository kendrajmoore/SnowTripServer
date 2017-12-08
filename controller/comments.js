const Trip = require('../models/trip');
const User = require('../models/user');

module.exports = (app) => {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body)

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment.save().then((comment) => {
    return User.findById(req.params.userId)
  }).then((user) => {
    user.comments.unshift(comment)
    return user.save()
  }).then((user) => {
    res.redirect(`/`)
  }).catch((err) => {
    console.log(err)
  })

}
