const nodemailer = require('nodemailer')
const { mailUser, mailPassword } = require('../config/index.js')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailUser,
    pass: mailPassword,
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
