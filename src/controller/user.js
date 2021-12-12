const UserModel = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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
        return user
    } catch(error) {
        throw new Error(error)
    }
}

const isFieldsRight = (body) => {
    for (const field in body) {
        if (body[field] === undefined || body[field] === '') {
            res.status(400).send({error: "Fields cannot be empty"})
        }
    }
}

const create = async (req, res) => {
    if (Object.keys(req.body).length <= 0) {
        res.status(400).send({error: "Bad Request"})
    }
    isFieldsRight(req.body)   
    const {username, email, password} = req.body

    try{
        const hasUser = await hasUserRegister(username, email)
        if (hasUser !== null) {
            res.status(401).send({error: "username or email has already been registered"})
        }else {
            const encryptedPassword = await encrypt(password)
            UserModel.create({
                username,
                email,
                password: encryptedPassword
            })
            res.status(201).send({message: "success"})
        }
    }catch(error){
        res.status(500).send({error})
    }
}

const auth = async (req, res) => {
    isFieldsRight(req.body)
    const {username, email, password} = req.body

    try{
        const user = await hasUserRegister(username, email)
        console.log(user)
        if(user === null) res.status(400).send({error: 'email is incorret'})
        
        const isPasswordRight = await comparePassword(password, user.password)

        if(isPasswordRight){
            const { id } = user
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300
            })
            res.status(200).send({auth: true, token})
        }else {
            res.status(400).send({error: "Password incorrect"})
        }
    }catch(error){
        res.status(500).send({error})
    }
}   


module.exports = {
    create,
    auth
}