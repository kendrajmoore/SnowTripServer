const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TripSchema = new Schema({
    departsOn      : { type:Date, required: true },
    departsInThe   : { type: String, required: true},

    returnsOn      : { type:Date, required: true },
    returnsInThe   : { type: String, required: true},

    intialTrip     : { type: Schema.Types.ObjectId, ref: "Trip"},
    returnTrip     : { type: Schema.Types.ObjectId, ref: "Trip"}
});

TripSchema.statics.timesOfDay = function() {
  return ["Early Morning", "Morning", "Noon", "Afternoon", "Evening", "Late"];
}


module.exports = mongoose.model('Trip', TripSchema);
