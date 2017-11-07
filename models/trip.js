const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TripSchema = new Schema({
    departsOn      : { type:Date, required: true },
    returnsOn      : { type:Date, required: true },
    returnTrip     : { type: Schema.Types.ObjectId, ref: "Trip"}
});

module.exports = mongoose.model('Trip', TripSchema);
