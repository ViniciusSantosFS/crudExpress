const { Sequelize } = require('sequelize');

const dialectOptions = process.env.NODE_ENV === 'production' ?  {
   ssl: {
       require: true
   }
} : {
    ssl: {
        require: false
    }
}

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    ssl: process.env.NODE_ENV === 'production' ? true : false,
    dialectOptions,
})

sequelize.authenticate()
.catch(error => {
    console.error(`something went wrong ${error}`)
    sequelize.close()
})

module.exports = sequelize