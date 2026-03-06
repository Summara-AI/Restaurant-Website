const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return null;
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
  return transporter;
}

async function sendEmail({ to, subject, html, text }) {
  const t = getTransporter();
  if (!t) {
    console.warn('Email not configured (EMAIL_USER/EMAIL_PASS missing). Skipping send.');
    return { ok: true, skipped: true };
  }
  await t.sendMail({
    from: `"Ember & Crest" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: html || text,
    text: text || html
  });
  return { ok: true };
}

module.exports = { sendEmail };
