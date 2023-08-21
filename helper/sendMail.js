const { smtpUsername, smtpPassword } = require('../secret')
const  nodemailer =  require("nodemailer")

const sendMail = ({ to, sub, msg }) => {
    // create trams transport
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: smtpUsername,
        pass: smtpPassword
      },
    });
  
    // send activation mail
    transport.sendMail({
      from: `Wolmart <${to}>`,
      to: to,
      subject: sub,
      text: msg,
    });
  };

//   exports
module.exports = { sendMail }