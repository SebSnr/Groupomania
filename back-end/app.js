const express = require("express")
const path = require("path")
const helmet = require("helmet")
const cookieSession = require("cookie-session")
const fakeData = require("./config/fakeData")

const app = express()

// separate sensitive connect data
require("dotenv").config()
cookieName = process.env.NAME_COOKIE
secretCookie = process.env.SECRET_COOKIE

// synchronise with database models
const db = require("./models/index")
db.sequelize.sync() 


// secure cookie http-only
app.use(
	cookieSession({
		name: "notadefaultname4e84fesZ7dzsdhgVD",
		secret: "frdgsvyu68411dfvd451csNVd",
		maxAge: 86400000, //24h
		secure: true,
		httpOnly: true,
		domain: "http://localhost:3000",
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
app.use('/images', express.static(path.join(__dirname, 'uploads')))

// user routes
require("./routes/user-routes")(app) 

// article routes
require("./routes/article-routes")(app)

// comment routes
require("./routes/comment-routes")(app) 

// add fake datas
fakeData.createFakeArticles(app)
fakeData.createFakeUsers(app)
fakeData.createFakeComments(app)

module.exports = app 

