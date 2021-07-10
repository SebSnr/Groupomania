const db = require("../models")
const User = db.users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {

    console.log(req.body) 

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
                .then((valid) => {
                    console.log(valid)
                    if (!valid) { 
                        return res.status(401).json({error: "Mot de passe incorrect !"})
                    }
                    res.status(200).json({
						// userId: user.id, 
						// token: jwt.sign({userId: user.id}, "monTokenSuperSecret1984", {expiresIn: "24h"}),
					})
                })
                .catch((error) => res.status(403).json({error})) 
        })
                
}

exports.login= (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            console.log(user)
            console.log(req.body.password)
            if (!user) {
				return res.status(401).json({error: "Utilisateur non trouvé !"}) 
			}
            bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) { 
						return res.status(401).json({error: "Mot de passe incorrect !"})
					}
					res.status(200).json({
                        userId: user.id,
						token: jwt.sign({userId: user.id}, "monTokenSuperSecret1984", {expiresIn: "24h"}),
                        userFirstName: user.firstName,
                        userLastName: user.lastName,
                        userPicture: "",
					})
				})
				.catch((error) => res.status(500).json({error}))
        })
		.catch((error) => res.status(500).json({error})) 

}





exports.getOne = (req, res) => {
    
}

exports.getAll = (req, res) => {

}

exports.delete = (req, res) => {

}

exports.modify = (req, res) => {

}
