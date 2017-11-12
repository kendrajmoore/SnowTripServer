const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const trip = require('./user');

const TripSchema = new Schema({
    departsOn      : { type:Date, required: true },
    departsInThe   : { type: String, required: true},

    returnsOn      : { type:Date, required: false },
    returnsInThe   : { type: String, required: false},

    intialTrip     : { type: Schema.Types.ObjectId, ref: "Trip"},
    returnTrip     : { type: Schema.Types.ObjectId, ref: "Trip"}
});

TripSchema.statics.timesOfDay = function() {
  return [ "Early Morning", "Morning", "Noon", "Afternoon", "Evening", "Late"];
}


module.exports = mongoose.model('Trip', TripSchema);
