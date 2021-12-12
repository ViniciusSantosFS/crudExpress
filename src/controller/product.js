const ProductModel = require('../models/Product')

const create = (req, res) => {
    const {name, description, price} = req.body

    if(name.length <= 0) res.status(400).send({error: 'Name cant be undefined'})

    ProductModel.create({
        name,
        description,
        price
    }).then(() => {
        res.status(201).send('success')
    }).catch(error => {
        res.status(500).send({error})
    })
}


const list = (req, res) => {
    ProductModel.findAll()
    .then(products => {
        if(products === undefined) res.status(404).send({error: "not to show"})
        res.status(200).send(products)
    }).catch(error => {
        res.status(500).send({error})
    })
}


const listOne = (req, res) => {
    const { id } = req.params
    ProductModel.findOne({
        where: {
            id
        }
    })
    .then(product => {
        if(product === undefined) res.status(404).send({error: "not found"})
        res.status(200).send(product)
    }).catch(error => {
        res.status(500).send({error})
    })
}



const drop = (req, res) => {
    const { id } = req.params
    if (id === undefined) res.status(400).send({error: "bad request"})
    
    ProductModel.destroy({
        where: {
            id
        }
    }).then((product) => {
        if (product === 0) res.status(404).send({error: "no product to delete"})
        res.status(200).send("success")
    }).catch(error => res.status(500).send({error}))
}


const update = (req, res) => {
    const {id, name, description, price} = req.body
    
    if (id === undefined || id.length <= 0) res.status(400).send({error: "bad request"})

    ProductModel.update({
        name, description, price
    }, {
        where: {
            id
        }
    }).then(() => {
        res.status(200).send({message: "success"})
    }).catch(error => {
        res.status(500).send({error})
    })
}

module.exports = {
    create,
    list,
    listOne,
    drop,
    update
}