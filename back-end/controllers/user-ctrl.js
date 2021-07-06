const db = require("../models")
const User = db.users

exports.create = (req, res) => {
    
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        // photo: req.body.photo,
        // isAdmin: req.body.isAdmin,
    }

    User.create(user)
        .then((data) => { 
            res.send(data) 
        })
        .catch((error) => res.status(403).json({error}))
}

exports.getOne = (req, res) => {
    
}

exports.getAll = (req, res) => {

}

exports.delete = (req, res) => {

}

exports.modify = (req, res) => {

}
