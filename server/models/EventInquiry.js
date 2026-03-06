const mongoose = require('mongoose');

const eventInquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  guestCount: { type: Number, required: true },
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['new', 'contacted', 'booked', 'declined'],
    default: 'new'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventInquiry', eventInquirySchema);
