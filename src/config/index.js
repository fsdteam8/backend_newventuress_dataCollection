import { configDotenv } from "dotenv"

configDotenv()

const serverPort = process.env.PORT || 8000
const dbUrl = process.env.DATABASE_URL

const mailUser = 
const mail

export { serverPort, dbUrl }