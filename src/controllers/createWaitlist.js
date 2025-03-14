import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import WaitList from '../models/waitListModel.js'
import { sendEmail } from '../utils/sendMail.js'

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const csvFilePath = path.join(__dirname, '../data/waitlist.csv')

const appendToCSV = (entry) => {
  const isFileExists = fs.existsSync(csvFilePath)
  const header =
    'Full Name,Business Name,Country,Email,Social Media Link,Phone Number,Website\n'
  const row = `${entry.fullName},${entry.businessName},${entry.country},${entry.email},${entry.socialMediaLink},${entry.phoneNumber},${entry.website}\n`

  if (!isFileExists) {
    fs.writeFileSync(csvFilePath, header, { flag: 'w' })
  }
  fs.appendFileSync(csvFilePath, row, { flag: 'a' })
}

// const sendEmailNotification = async (entry) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail', // You can use other services like Outlook, Yahoo, etc.
//       auth: {
//         user: 'your-email@gmail.com', // Replace with your email
//         pass: 'your-email-password', // Use an app password if using Gmail
//       },
//     })

//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       to: 'work.saif',
//       subject: 'New Waitlist Entry',
//       text: `A new entry has been added to the waitlist:\n\n
//       Full Name: ${entry.fullName}\n
//       Business Name: ${entry.businessName}\n
//       Country: ${entry.country}\n
//       Email: ${entry.email}\n
//       Social Media: ${entry.socialMediaLink}\n
//       Phone: ${entry.phoneNumber}\n
//       Website: ${entry.website}\n
//       `,
//     }

//     await transporter.sendMail(mailOptions)
//     console.log('Email sent successfully!')
//   } catch (error) {
//     console.error('Error sending email:', error)
//   }
// }

const createWaitlist = async (req, res) => {
  try {
    const {
      fullName,
      businessName,
      country,
      email,
      socialMediaLink,
      phoneNumber,
      website,
    } = req.body

    const existingEntry = await WaitList.findOne({ email })
    if (existingEntry) {
      return res
        .status(400)
        .json({ message: 'Email is already in the waitlist' })
    }

    const newEntry = new WaitList({
      fullName,
      businessName,
      country,
      email,
      socialMediaLink,
      phoneNumber,
      website,
    })

    await newEntry.save()
    appendToCSV(newEntry)
    let data = `
          Full Name: ${fullName}\n
          Business Name: ${businessName}\n
          Country: ${country}\n
          Email: ${email}\n
          Social Media: ${socialMediaLink}\n
          Phone: ${phoneNumber}\n
          Website: ${website}\n
          `

    sendEmail('work.saif9795@gmail.com', 'new entry', data)

    return res
      .status(201)
      .json({ message: 'Successfully added to waitlist', data: newEntry })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export default createWaitlist
