const mongoose = require('mongoose');
const    Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    firstName       : { type: String },
    lastName        : { type: String },
    userName        : { type: String },
    password        : { type: String },
    email           : { type: String },
    phone           : { type: Number }

});

UserSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
})
  // ENCRYPT PASSWORD
//   const user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(user.password, salt, function(err, hash) {
//
//       user.password = hash;
//       next();
//     });
//   });
// });


// UserSchema.methods.comparePassword = function(password, done) {
//   bcrypt.compare(password, this.password, function(err, isMatch) {
//     done(err, isMatch);
//   });
// };

// Register this user if it's a new user
  //  authy.register_user(self.email, self.phone, self.countryCode,
      //  function(err, response) {
        //if(err){
          //  if(response && response.json) {
            //    response.json(err);
            //} else {
              //  console.error(err);
            //}
            //return;
        //}
        //self.authyId = response.user.id;
        //self.save(function(err, doc) {
          //  if (err || !doc) return next(err);
            //self = doc;
        //});

        // Send a OneTouch request to this user
//UserSchema.methods.sendOneTouch = function(cb) {
  //  var self = this;
    //self.authyStatus = 'unverified';
    //self.save();

    //onetouch.send_approval_request(self.authyId, {
      //  message: 'Request to Login to Twilio demo app',
      //  email: self.email
    //}, function(err, authyres){
      //  if (err && err.success != undefined) {
        //    authyres = err;
          //  err = null;
        //}
        //cb.call(self, err, authyres);
  //  });
//};
module.exports = mongoose.model('User', UserSchema);
