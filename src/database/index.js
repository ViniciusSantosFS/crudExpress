const { Sequelize } = require('sequelize');

const dialectOptions = process.env.NODE_ENV === 'production' ?  {
    ssl: {
        key: cKey,
        cert: cCert,
        ca: cCA
      }
} : {}

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    dialectOptions,
})

sequelize.authenticate()
.catch(error => {
    console.error(`something went wrong ${error}`)
    sequelize.close()
})

module.exports = sequelize