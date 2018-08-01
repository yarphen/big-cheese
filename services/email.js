const nodemailer = require('nodemailer');

const sendMail = ({
  // smtp
  host, port, user, pass, secure,
  // emails
  to, from,
  // content
  subject, text,
}) => {
  if (!to || !from || !user || !pass) {
    throw new Error('One of email parameters is missing or invalid!');
  }
  const smtpTransport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
  return smtpTransport.sendMail({
    to,
    from,
    subject,
    text,
  });
};
module.exports = {
  sendMail,
};
