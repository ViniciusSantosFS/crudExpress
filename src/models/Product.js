const { DataTypes } = require('sequelize/dist')
const sequelize = require('../database')

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
    },

    price: {
        type: DataTypes.FLOAT,
        defaultValue: 5.00
    },
})


module.exports = Product