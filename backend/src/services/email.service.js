/* eslint-disable no-return-await */
/* eslint-disable no-console */
const sgMail = require('@sendgrid/mail');
const config = require('@/config/config');
const { defaultURL } = require('@/config/config');
const log = require('@/utils/misc/log');

sgMail.setApiKey(config.sendGrid.apiKey);

const generateEmail = (tempCode) => ({
  subject: 'Forgot Password',
  messageBody: `Hello! Click this link to change your password: ${defaultURL}/password/change?temp=${tempCode}`,
});

const sendEmail = async (msgRecipient, msgSubject, msgBody) => {
  log('The recieved variables.\n');
  log(msgRecipient);
  log(msgSubject);
  log(msgBody);
  const msg = {
    to: msgRecipient.toLowerCase(),
    from: config.app.email.toLowerCase(),
    subject: msgSubject,
    text: msgBody,
    html: `<strong>${msgBody}</strong>`,
  };
  const today = new Date();
  return process.env.NODE_ENV !== 'test' ? config.noMoreCredits && (today.getMonth() <= config.noMoreCredits.getMonth()) ? 'NOCREDITS' : sgMail.send(msg)
    .then(() => {
      log('Email sent');
      return true;
    })
    .catch((error) => {
      log('There was an ERROR:', error);
      if (error.response && error.response.body && error.response.body.errors) {
        log('EMBEDDED ERRORS:', error.response.body.errors);
        if (error.response.body.errors[0].message === 'Maximum credits exceeded') {
          config.noMoreCredits = new Date();
          log('Set no more credits to true')
          return 'NOCREDITS'
        }
      }
      return false;
    }) : true;
};

const sendVerifyEmail = (email, tempCode) => {
  const emailBody = {
    subject: 'Verify Account Email',
    messageBody: `Hello! Click this link to verify your account email address: ${defaultURL}/auth/login?code=${tempCode}`,
  };
  return sendEmail(email, emailBody.subject, emailBody.messageBody);
};

module.exports = {
  sendEmail,
  generateEmail,
  sendVerifyEmail,
};
