const express = require("express")
const { unknownEndPoints } = require("./utils/middleware")

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({msg: "hello, world"})
})

app.use(unknownEndPoints)

module.exports = app