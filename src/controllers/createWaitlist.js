// import fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import WaitList from '../models/waitListModel.js'
// import { sendEmail } from '../utils/sendMail.js'

// // Fix for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const csvFilePath = path.join(__dirname, '../data/waitlist.csv')

// const appendToCSV = (entry) => {
//   const isFileExists = fs.existsSync(csvFilePath)
//   const header =
//     'Full Name,Business Name,Country,Email,Social Media Link,Phone Number,Website\n'
//   const row = `${entry.fullName},${entry.businessName},${entry.country},${entry.email},${entry.socialMediaLink},${entry.phoneNumber},${entry.website}\n`

//   if (!isFileExists) {
//     fs.writeFileSync(csvFilePath, header, { flag: 'w' })
//   }
//   fs.appendFileSync(csvFilePath, row, { flag: 'a' })
// }

// const createWaitlist = async (req, res) => {
//   try {
//     const {
//       fullName,
//       businessName,
//       country,
//       email,
//       socialMediaLink,
//       phoneNumber,
//       website,
//     } = req.body

//     const existingEntry = await WaitList.findOne({ email })
//     if (existingEntry) {
//       return res
//         .status(400)
//         .json({ message: 'Email is already in the waitlist' })
//     }

//     const newEntry = new WaitList({
//       fullName,
//       businessName,
//       country,
//       email,
//       socialMediaLink,
//       phoneNumber,
//       website,
//     })

//     await newEntry.save()
//     appendToCSV(newEntry)
//     let data = `
//           Full Name: ${fullName}\n
//           Business Name: ${businessName}\n
//           Country: ${country}\n
//           Email: ${email}\n
//           Social Media: ${socialMediaLink}\n
//           Phone: ${phoneNumber}\n
//           Website: ${website}\n
//           `

//     sendEmail(
//       'work.saif9795@gmail.com',
//       'New entry has been added in the waitlist',
//       data
//     )

//     return res
//       .status(201)
//       .json({ message: 'Successfully added to waitlist', data: newEntry })
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message })
//   }
// }

// export default createWaitlist

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

const logCSVData = () => {
  try {
    const csvData = fs.readFileSync(csvFilePath, 'utf8')
    console.log('Current CSV Data:\n', csvData)
  } catch (error) {
    console.error('Error reading CSV file:', error.message)
  }
}

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

    // Log CSV data after inserting
    logCSVData()

    let data = `
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #4CAF50; text-align: center;"> New Entry Has Been Enlisted!</h2>

            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f9f9f9;">📌 Full Name:</td>
                    <td style="padding: 10px;">${fullName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f9f9f9;">🏢 Business Name:</td>
                    <td style="padding: 10px;">${businessName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f9f9f9;">🌍 Country:</td>
                    <td style="padding: 10px;">${country}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f9f9f9;">📧 Email:</td>
                    <td style="padding: 10px;"><a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f9f9f9;">🔗 Social Media:</td>
                    <td style="padding: 10px;"><a href="${socialMediaLink}" target="_blank" style="color: #4CAF50; text-decoration: none;">${socialMediaLink}</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f9f9f9;">📞 Phone:</td>
                    <td style="padding: 10px;">${phoneNumber}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f9f9f9;">🌐 Website:</td>
                    <td style="padding: 10px;"><a href="${website}" target="_blank" style="color: #4CAF50; text-decoration: none;">${website}</a></td>
                </tr>
            </table>
        </div>
    </body>
    `

    sendEmail(
      'work.saif9795@gmail.com',
      'New entry has been added in the waitlist',
      data
    )

    return res
      .status(201)
      .json({ message: 'Successfully added to waitlist', data: newEntry })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export default createWaitlist
