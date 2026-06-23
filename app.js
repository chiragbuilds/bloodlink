const express = require("express")
const mongoose = require('mongoose')

const { unknownEndPoints } = require("./utils/middleware")
const registerRouter = require('./controllers/register')
const { MONGODB_URI } = require("./utils/config")
const loginRouter = require("./controllers/login")
const statsRouter = require("./controllers/stats")
const requestsRouter = require("./controllers/request")

const app = express()

app.use(express.json())

mongoose
    .connect(MONGODB_URI, {family: 4})
    .then(()=>console.log('Connected to mongoDB'))
    .catch(error => console.error('connection failed to mongoDB: ',error))


app.use('/api/register',registerRouter)
app.use('/api/login',loginRouter)
app.use('/api/requests', requestsRouter)


app.use('/api/stats', statsRouter)


app.get('/', (req, res) => {
    res.json({msg: "hello, world"})
})

app.use(unknownEndPoints)

module.exports = app