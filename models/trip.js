const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TripSchema = new Schema({
    departsOn      : Date,
    returnsOn      : Date,
    returnTrip     : { type: Schema.Types.ObjectId, ref: "Trip"}
});

module.exports = mongoose.model('Trip', TripSchema);
