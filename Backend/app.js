const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const githubRouter = require('./controllers/github')

const corsOptions = {
	origin: 'https://ckolaportfolio.vercel.app',
	methods: ['GET', 'POST', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Explicitly allow preflight (OPTIONS) requests for this specific endpoint
app.options('/api/github/fetch-profile', cors(corsOptions));

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/github', githubRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
