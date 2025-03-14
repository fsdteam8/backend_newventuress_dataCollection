const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.APP_PASSWORD,
  },
})

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'no-reply@pacificrimfusion.com',
      to: to,
      subject: subject,
      text: text,
      html: `<p>${text}</p>`,
    }
    const info = await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email: ', error)
  }
}

module.exports = { sendEmail }
