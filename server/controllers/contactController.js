const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/sendEmail');

async function create(req, res, next) {
  try {
    const c = new Contact(req.body);
    await c.save();
    const html = `
      <h2>Message Received</h2>
      <p>Dear ${c.name},</p>
      <p>Thank you for reaching out. We will respond to your inquiry regarding "${c.subject}" as soon as possible.</p>
      <p>Ember & Crest | 123 Congress Ave, Austin, TX 78701</p>
    `;
    await sendEmail({ to: c.email, subject: `We received your message - ${c.subject}`, html });
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getAll };
