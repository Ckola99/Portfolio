const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const githubRouter = require('./controllers/github')

const corsOptions = {
	origin: ['https://ckolaportfolio.vercel.app', 'http://localhost:5173'], // Allow your frontend origin
	methods: ['GET', 'POST'], // Specify allowed HTTP methods
	credentials: true, // Include cookies if needed
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/github', githubRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
