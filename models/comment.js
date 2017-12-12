
const mongoose = require('mongoose');
const    Schema = mongoose.Schema;
//create comment model
const CommentSchema = new Schema({
  content            : { type: String},
  reason           : { type: String },
  summary          : { type: String },
  user             : { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
