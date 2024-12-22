require('dotenv').config()

const PORT = process.env.PORT
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID

module.exports = {
	PORT,
	GITHUB_TOKEN,
	EMAILJS_PUBLIC_KEY,
	EMAILJS_SERVICE_ID,
	EMAILJS_TEMPLATE_ID
}
