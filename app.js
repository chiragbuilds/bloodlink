const express = require("express")
const mongoose = require('mongoose')

const { unknownEndPoints } = require("./utils/middleware")
const registerRouter = require('./controllers/register')
const { MONGODB_URI } = require("./utils/config")
const loginRouter = require("./controllers/login")
const statsRouter = require("./controllers/stats")
const requestsRouter = require("./controllers/request")
const donorRouter = require("./controllers/donor")
const hospitalRouter = require("./controllers/hospital")
const bloodBankRouter = require("./controllers/bloodbank")
const adminRouter = require("./controllers/admin")

const app = express()

app.use(express.json())

mongoose
    .connect(MONGODB_URI, {family: 4})
    .then(()=>console.log('Connected to mongoDB'))
    .catch(error => console.error('connection failed to mongoDB: ',error))


app.use('/api/register',registerRouter)
app.use('/api/login',loginRouter)
app.use('/api/requests', requestsRouter)
app.use('/api/donor', donorRouter)
app.use('/api/hospital', hospitalRouter)
app.use('/api/bloodbank', bloodBankRouter)
app.use('/api/admin', adminRouter)


app.use('/api/stats', statsRouter)


app.get('/', (req, res) => {
    res.json({msg: "hello, world"})
})

app.use(unknownEndPoints)

module.exports = app