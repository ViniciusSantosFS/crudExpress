const express = require('express')
const router = express.Router()
const product = require('../controller/product')


router.post('/create', product.create)
router.get('/list', product.list)
router.get('/list/:id', product.listOne)
router.delete('/delete/:id?', product.drop)
router.put('/edit', product.update)

module.exports = router;