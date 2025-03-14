import WaitList from '../models/waitListModel.js'

const createWaitlist = async (req, res) => {
  try {
    const {
      fullName,
      businessName,
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
      email,
      socialMediaLink,
      phoneNumber,
      website,
    })

    await newEntry.save()

    res
      .status(201)
      .json({ message: 'Successfully added to waitlist', data: newEntry })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export default createWaitlist
