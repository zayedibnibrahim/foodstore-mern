const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const fs = require('fs')

dotenv.config()
const app = express()

connectDB()
app.use(express.json())

// routes middleware -auto load
fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

const PORT = process.env.PORT || 4200
app.listen(PORT, console.log('Server running at 4200'.yellow.bold))
