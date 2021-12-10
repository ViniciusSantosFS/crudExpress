const productModel = require('../models/Product')

const create = (req, res) => {
    const {name, description, price} = req.body

    if(name.length <= 0) res.status(400).send({error: 'Name cant be undefined'})

    productModel.create({
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
    productModel.findAll()
    .then(products => {
        if(products === undefined) res.status(404).send("not to show")
        res.status(200).send(products)
    }).catch(error => {
        res.status(500).send({error})
    })
}


const listOne = (req, res) => {
    const { id } = req.params
    productModel.findOne({
        where: {
            id
        }
    })
    .then(product => {
        if(product === undefined) res.status(404).send("not found")
        res.status(200).send(product)
    }).catch(error => {
        res.status(500).send({error})
    })
}



const drop = (req, res) => {
    const { id } = req.params
    if (id === undefined) res.status(400).send("bad request")
    
    productModel.destroy({
        where: {
            id
        }
    }).then((product) => {
        console.log(product)
        if (product === 0) res.status(404).send("no product to delete")
        res.status(200).send("success")
    }).catch(error => res.status(500).send({error}))
}


const update = (req, res) => {
    const {id, name, description, price} = req.body
    
    if (id === undefined || id.length <= 0) res.status(400).send("bad request")

    productModel.update({
        name, description, price
    }, {
        where: {
            id
        }
    }).then(() => {
        res.status(200).send("success")
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