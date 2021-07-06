const db = require("../models")
const User = db.users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {

    bcrypt
        .hash(req.body.password, 10, (err, hash) => {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                // photo: req.body.photo,
                // isAdmin: req.body.isAdmin,
            }

            User.create(user)
                .then((data) => { 
                    res.send(data) 
                }) 
            .catch((error) => res.status(403).json({error}))
        })
                
}

exports.login= (req, res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
				return res.status(401).json({error: "Utilisateur non trouvé !"})
			}
             



        })
}





exports.getOne = (req, res) => {
    
}

exports.getAll = (req, res) => {

}

exports.delete = (req, res) => {

}

exports.modify = (req, res) => {

}
