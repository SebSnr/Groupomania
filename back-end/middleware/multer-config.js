const multer = require("multer")

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
}

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		console.log(req)
		callback(null, "./uploads/") 
	},
	filename: (req, file, callback) => {
		console.log(req) 
		const name = file.originalname.split(" ").join("_")
		const extension = MIME_TYPES[file.mimetype]
		callback(null, name + Date.now() + "." + extension)
		callback(null, Date.now() + file.originalname);
	},
})

module.exports = multer({storage: storage}).single("picture")
