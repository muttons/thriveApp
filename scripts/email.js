const nodemailer = require("nodemailer");

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.API_USER, 
      pass: process.env.API_KEY 
    }
  });

  // send mail with defined transport object
  let mailOptions ={
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "help.desk@thriveupstate.org", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

testMailer = () => {
transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log('error', err);
  } else {
    console.log('it worked');
  }
});
}


