const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    owner: { Type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extreInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number
});

const PlaceModel = mongoose.model('place', placeSchema);

module.exports = PlaceModel;