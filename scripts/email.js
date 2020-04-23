reguire('dotenv').config()

const nodemailer = require("nodemailer");

function testMailer() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: API_USER, // generated ethereal user
      pass: API_KEY // generated ethereal password
    }
  });

  // send mail with defined transport object
  let mailOptions ={
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };


transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log('error', err);
  } else {
    console.log('it worked');
  }
});

}
