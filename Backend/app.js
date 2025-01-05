const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const githubRouter = require('./controllers/github')

app.use(cors({
	origin: ['https://ckolaportfolio.vercel.app'], // Allow only your frontend
	methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed HTTP methods
	credentials: true, // Include cookies or authorization headers
}));

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/github', githubRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
