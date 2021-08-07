const jwt = require("jsonwebtoken")

// separate sensitive connect data
require("dotenv").config()
secretTokenKey = process.env.TOKEN_SECRET

// check user token
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		const decodedToken = jwt.verify(token, secretTokenKey)
		const userId = decodedToken.userId
		if (req.body.userId && req.body.userId !== userId) {
			throw "Invalid user ID"
		} else {
			next()
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		})
	}
}
