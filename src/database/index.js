const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})


sequelize.authenticate()
.catch(error => {
    console.error(`something went wrong ${error}`)
    sequelize.close()
})

module.exports = sequelize