const express = require("express")
const path = require("path")

const app = express()

const db = require("./models/index")
db.sequelize.sync() 

// drop the table if already exists
// db.sequelize.sync({ force: true }).then(() => {console.log("Drop and re-sync db.");});

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

// article routes
require("./routes/article-routes")(app)
app.use('/images', express.static(path.join(__dirname, 'uploads')))

// user routes
require("./routes/user-routes")(app) 

// upload routes
global.__basedir = __dirname;
require("./routes/upload-routes")(app)


module.exports = app 

