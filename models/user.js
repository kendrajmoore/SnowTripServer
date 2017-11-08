const UserSchema = new Schema({
    firstName       : { type: String }
  , lastName      : { type: String }

  , email       : { type: String }
  , password      : { type: String }
   phoneNumber      : { type: Number }
});


module.exports = mongoose.model('User', UserSchema);
