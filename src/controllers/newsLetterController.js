import Newsletter from '../models/newsLetterModel.js'

const { sendEmail } = require('../service/nodemailerConfig')

const addNewsLetter = async (req, res) => {
  try {
    const { email } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: false, message: 'invalid email format' })
    }

    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: 'Email is required' })
    }
    const existingNewsletter = await Newsletter.findOne({ email })
    if (existingNewsletter) {
      return res.status(400).json({
        status: false,
        message: 'You have already subcribed the newsletter',
      })
    }
    const newNewsLetter = new Newsletter({ email })
    await newNewsLetter.save()
    return res.status(201).json({
      status: true,
      message: 'Newsletter added successfully',
      data: newNewsLetter,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Internal server error' })
  }
}

const getAllNewsLetter = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 10

    const totalItems = await Newsletter.countDocuments()
    const totalPages = Math.ceil(totalItems / limit)
    const skip = (page - 1) * limit

    const newsletters = await Newsletter.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return res.status(200).json({
      status: true,
      message: 'Fetch newsletters successfully',
      data: newsletters,
      meta: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
      },
    })
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Internal server error' })
  }
}

const getSingleNewsLetter = async (req, res) => {
  try {
    const id = req.params.id
    const newsLetter = await Newsletter.findById(id)
    if (!newsLetter) {
      return res
        .status(404)
        .json({ status: false, error: 'Newsletter not found' })
    }
    return res.status(200).json({
      status: true,
      message: 'get specific newsletter successfully',
      data: newsLetter,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: 'Internal server error' })
  }
}

const deleteNewsLetter = async (req, res) => {
  try {
    const id = req.params.id
    const deletedNewsletter = await Newsletter.findByIdAndDelete(id)
    if (!deletedNewsletter) {
      return res
        .status(404)
        .json({ status: true, data: 'Newsletter not found' })
    }
    return res
      .status(200)
      .json({ status: true, message: 'Newsletter deleted successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ status: true, message: 'internal server error' })
  }
}

const sendNewsletter = async (req, res) => {
  try {
    const { subject, text } = req.body
    const newsletters = await Newsletter.find()
    const email = newsletters.map((newsletter) => newsletter.email)
    sendEmail(email, subject, text)
    await sendEmail(email, subject, text)
    return res
      .status(200)
      .json({ status: true, message: 'Email sent successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ status: true, error: 'Internal server error' })
  }
}

const sendSingleNewsLetter = async (req, res) => {
  try {
    const { id } = req.params
    const { subject, text } = req.body

    const newsletters = await Newsletter.findById(id)

    await sendEmail(newsletters.email, subject, text)
    return res
      .status(200)
      .json({ status: true, message: 'Email sent successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ status: true, error: 'Internal server error' })
  }
}

module.exports = {
  addNewsLetter,
  getAllNewsLetter,
  getSingleNewsLetter,
  deleteNewsLetter,
  sendNewsletter,
  sendSingleNewsLetter,
}
