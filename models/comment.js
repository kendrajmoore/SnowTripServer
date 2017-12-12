
const mongoose = require('mongoose');
const    Schema = mongoose.Schema;
//create comment model
const CommentSchema = new Schema({
  content            : { type: String},
  comment          : [this],
  reason           : { type: String },
  summary          : { type: String }
});

module.exports = mongoose.model('Comment', CommentSchema);
