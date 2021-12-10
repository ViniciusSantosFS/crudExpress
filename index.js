require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/database')
const routes = require('./src/routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/api', routes)

sequelize.sync()

routes.use((req, res) => {
    res.status(404).send('404 not found')
})

routes.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send("Something went wrong with server =/")
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})

module.exports = app