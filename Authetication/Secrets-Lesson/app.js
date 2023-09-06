import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

dotenv.config()
const app = express()
const port = 3000
const saltRounds = 10

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://127.0.0.1:27017/usersDB")

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true]
	},
	password: {
		type: String,
		required: [true]
	}
})

const User = mongoose.model("User", userSchema)

app.get("/", (req, res) => {
	res.render("home")
})

app.get("/register", (req, res) => {
	res.render("register")
})

app.get("/login", (req, res) => {
	res.render("login")
})

app.post("/register", async (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash){
		if(!err){
			try {
				const user = new User({
					email: req.body.username,
					password: hash
				})
	
				user.save()
					.then(console.log("User saved"))
					.then(res.render("secrets"))
			} catch (error) {
				console.log(error)
				res.sendStatus(404)
			}
		}
	})
})

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ email: username }).exec();
    
    if (user) {
			bcrypt.compare(password, user.password, function(err, result){
				if(result){
					res.render("secrets");
				} else {
					res.sendStatus(403);
				}
			})
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, () => {
    console.log(`Server listennig on port: ${port}`)
})