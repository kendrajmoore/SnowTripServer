
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create comment model
const CommentSchema = new Schema({
  content            : { type: String, required: true },
  comments           : [this],
  


});

module.exports = mongoose.model('Comment', CommentSchema);
