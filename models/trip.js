const mongoose = require('mongoose');
const    Schema = mongoose.Schema;
const trip = require('./user');
//departsAt -change
const TripSchema = new Schema({

    Origin         : { type: String, required: false},
    Return         : { type: String, required: false},

    departsOn      : { type:Date, required: true },
    departsInThe   : { type: String, required: false},

    returnsOn      : { type:Date, required: false },
    returnsInThe   : { type: String, required: false },

    intialTrip     : { type: Schema.Types.ObjectId, ref: "Trip" },
    returnTrip     : { type: Schema.Types.ObjectId, ref: "Trip" },
    user           : { type: Schema.Types.ObjectId, ref: 'User' }

});

const myDate = new Date();
const myEpoch = myDate.getTime() / 1000.0;
// console.log("I am " + myEpoch + " UNIXtime");

TripSchema.statics.timesOfDay = function() {
  return [ "Early Morning", "Morning", "Noon", "Afternoon", "Evening", "Late"];
}


module.exports = mongoose.model('Trip', TripSchema);
