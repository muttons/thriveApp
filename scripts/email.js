// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs



const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//emails.js
function testEmail() {
  const message = { 
  to : 'help.desk@thriveupstate.org', //email variable
  from : 'test@test.com',
  message : `Hi there!`,
  subject : "This is a test Email"
  }
  SGmail.send(message).then((sent) => {
    // Awesome Logic to check if mail was sent
  })
 }
 module.exports = {
  testEmail
 }