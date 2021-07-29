const passwordValidator = require('password-validator')

const passwordSchema = new passwordValidator()
passwordSchema
    .is().min(6)                                     // Minimum length 6
    .is().max(50)                                    // Maximum length 50
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase(1)                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .has().symbols(1)                               // Minimum length 1
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)){
        return res.status(400).json(`mot de passe trop faible. Le mot de passe doit contenir minimum 6 characteres, maximum 50, minimum 1 lettre majuscule et 1 lettre miniscule, minimum 1 chiffre, pas d'espace. \r Eror : ${passwordSchema.validate(req.body.password, {list: true})}`)
    } else {
        next()
    }
}