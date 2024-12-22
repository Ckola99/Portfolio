require('dotenv').config()

const PORT = process.env.PORT
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
	PORT,
	GITHUB_TOKEN,
	ALLOWED_ORIGINS,
	NODE_ENV
}
