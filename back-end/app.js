const express = require("express")
const path = require("path")
const helmet = require("helmet")
const cookieSession = require("cookie-session")

const app = express()

// separate sensitive connect data
require("dotenv").config()
cookieName = process.env.NAME_COOKIE
secretCookie = process.env.SECRET_COOKIE

// synchronise Sequelize with database & insert testData
const db = require("./models/index")
db.sequelize.sync().then(() => require("./config/testData"))

// secure cookie http-only
app.use(
	cookieSession({
		name: cookieName,
		secret: secretCookie,
		maxAge: 86400000, //24h
		secure: true,
		httpOnly: true,
		domain: "http://www.sebsnr.fr",
	})
)

app.use(helmet()) // secure app by various HTTP headers (like disable cache, protect against injection etc...)

// allow different access control
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
	next()
})

// Parsers for POST data
app.use(express.json({limit: "20mb"}))
app.use(express.urlencoded({extended: true}))

// file route
app.use("/images", express.static(path.join(__dirname, "uploads")))

// user routes
require("./routes/user-routes")(app)

// article routes
require("./routes/article-routes")(app)

// comment routes
require("./routes/comment-routes")(app)

module.exports = app
