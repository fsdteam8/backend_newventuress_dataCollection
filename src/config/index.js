import { configDotenv } from 'dotenv'

configDotenv()

const serverPort = process.env.PORT || 8000
const dbUrl = process.env.DATABASE_URL

const mailUser = process.env.EMAIL_ADDRESS
const mailPassword = process.env.APP_PASSWORD

export { serverPort, dbUrl, mailUser, mailPassword }
