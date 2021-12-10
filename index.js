require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/database')
const router = require('./src/routes/product')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(router)

sequelize.sync()

router.use((req, res) => {
    res.send('404 not found')
})

router.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send("Something went wrong with server =/")
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})

module.exports = app