const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  partySize: { type: Number, required: true, min: 1, max: 20 },
  seatingPreference: {
    type: String,
    enum: ['Indoor', 'Outdoor Patio', 'Private Dining Room', 'Bar Area'],
    required: true
  },
  specialOccasion: {
    type: String,
    enum: ['None', 'Birthday', 'Anniversary', 'Business Dinner', 'Proposal', 'Other'],
    default: 'None'
  },
  specialRequests: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  bookingRef: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
