const express = require('express')
const routes = express.Router()

const productController = require('../controller/product')
const userController = require('../controller/user')

routes.get('/product/list', productController.list)
routes.get('/product/list/:id', productController.listOne)
routes.post('/product/create', productController.create)
routes.delete('/product/delete/:id?', productController.drop)
routes.put('/product/edit', productController.update)

routes.post('/user/create', userController.create)
routes.post('/user/login', userController.auth)

module.exports = routes