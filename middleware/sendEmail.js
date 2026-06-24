const nodemailer = require("nodemailer");
const sendEmail = async (dest, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
      auth: {
        user: process.env.USER_SENDER,
        pass: process.env.USER_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: '"tarek mohamed 👻" <tarek@gmail.com>', // sender address
      to: dest, // list of recipients
      subject: "Hello", // subject line
      text: "Hello world?", // plain text body
      html: message,
    });
  } catch (error) {
    console.log("Error Can't send message..!", error);
  }
};
module.exports = sendEmail;
