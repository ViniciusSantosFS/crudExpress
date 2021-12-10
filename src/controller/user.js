const UserModel = require('../models/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = (password) => bcrypt.hash(password, saltRounds).then(hash => hash)
const comparePassword = (password, hash) => bcrypt.compare(password, hash).then(result => result)

const hasUserRegister = async (username, email) => {
    try{
        const user = await UserModel.findOne({
            where: {
                username
            },
            where: {
                email
            }
        })
        if(user !== null) return true
        
        return false
    } catch(error) {
        throw new Error(error)
    }
}

const create = async (req, res) => {
    if (Object.keys(req.body).length <= 0) {
        res.status(400).send({error: "Bad Request"})
    }

    for (const field in req.body) {
        if (req.body[field] === undefined || req.body[field] === '') {
            res.status(400).send({error: "Fields cannot be empty"})
        }
    }

    const {username, email, password} = req.body

    try{
        const hasUser = await hasUserRegister(username, email)
        if (hasUser) {
            res.status(401).send("username or email has already been registered")
        }else {
            const encryptedPassword = await encrypt(password)
            UserModel.create({
                username,
                email,
                password: encryptedPassword
            })
            res.status(201).send("success")
        }
    }catch(error){
        res.status(500).send({error})
    }
}

module.exports = {
    create
}