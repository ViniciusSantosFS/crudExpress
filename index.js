require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/database')
const routes = require('./src/routes')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/api', routes)

sequelize.sync()

routes.use((req, res) => {
    res.status(404).send({error: '404 not found'})
})

routes.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send({error: "Something went wrong with server =/"})
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})

module.exports = app