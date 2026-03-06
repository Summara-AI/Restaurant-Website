const Reservation = require('../models/Reservation');
const { generateBookingRef } = require('../utils/generateRef');
const { sendEmail } = require('../utils/sendEmail');

async function create(req, res, next) {
  try {
    let bookingRef;
    let exists = true;
    while (exists) {
      bookingRef = generateBookingRef();
      const found = await Reservation.findOne({ bookingRef });
      if (!found) exists = false;
    }
    const body = { ...req.body };
    if (typeof body.date === 'string') body.date = new Date(body.date);
    const r = new Reservation({ ...body, bookingRef });
    await r.save();
    const html = `
      <h2>Reservation Confirmed</h2>
      <p>Dear ${r.name},</p>
      <p>Your reservation at Ember & Crest has been received.</p>
      <p><strong>Booking Reference:</strong> ${r.bookingRef}</p>
      <p><strong>Date:</strong> ${r.date.toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${r.time}</p>
      <p><strong>Party Size:</strong> ${r.partySize}</p>
      <p>123 Congress Ave, Austin, TX 78701</p>
      <p>Questions? Call (512) 555-0192</p>
    `;
    await sendEmail({ to: r.email, subject: `Reservation Confirmed - ${r.bookingRef}`, html });
    res.status(201).json({ reservation: r, bookingRef: r.bookingRef });
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const r = await Reservation.findById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Reservation not found' });
    res.json(r);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const r = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!r) return res.status(404).json({ message: 'Reservation not found' });
    res.json(r);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const r = await Reservation.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

async function checkAvailability(req, res, next) {
  try {
    const { date, time } = req.query;
    const count = await Reservation.countDocuments({
      date: new Date(date),
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });
    res.json({ count, nearCapacity: count >= 8 });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getAll, getById, update, remove, checkAvailability };
