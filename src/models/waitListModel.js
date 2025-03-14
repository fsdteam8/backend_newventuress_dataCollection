import mongoose, { Schema } from 'mongoose'

const waitListSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    businessName: {
      type: String,
    },
    email: {
      type: String,
    },
    socialMediaLink: [
      {
        type: String,
      },
    ],
    phoneNumber: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const WaitList = mongoose.model('Waitlist', waitListSchema)
export default WaitList
