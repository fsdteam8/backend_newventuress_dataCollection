import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import WaitList from '../models/waitListModel.js'

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

    res
      .status(201)
      .json({ message: 'Successfully added to waitlist', data: newEntry })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export default createWaitlist
