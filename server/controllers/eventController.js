const EventInquiry = require('../models/EventInquiry');
const { sendEmail } = require('../utils/sendEmail');

async function create(req, res, next) {
  try {
    const body = { ...req.body };
    if (typeof body.date === 'string') body.date = new Date(body.date);
    const e = new EventInquiry(body);
    await e.save();
    const html = `
      <h2>Event Inquiry Received</h2>
      <p>Dear ${e.name},</p>
      <p>Thank you for your interest in hosting an event at Ember & Crest.</p>
      <p>We will contact you shortly regarding your ${e.eventType} for ${e.guestCount} guests on ${e.date.toLocaleDateString()}.</p>
      <p>123 Congress Ave, Austin, TX 78701 | (512) 555-0192</p>
    `;
    await sendEmail({ to: e.email, subject: 'Event Inquiry Received - Ember & Crest', html });
    res.status(201).json(e);
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const inquiries = await EventInquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const e = await EventInquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!e) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(e);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getAll, update };
