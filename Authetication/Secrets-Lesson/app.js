import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import mongoose from "mongoose"
import session from "express-session"
import passport from "passport"
import passportLocalMongoose from "passport-local-mongoose"
import { Strategy } from "passport-google-oauth20"
import findOrCreate from "mongoose-findorcreate"

dotenv.config()
const app = express()
const port = 3000

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
	secret: "Is in our blod Moooortal Kombat",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect("mongodb://127.0.0.1:27017/usersDB")
//mongoose.set("useCreateIndex", true)

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	googleId: String,
	secret: String
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User = mongoose.model("User", userSchema)

passport.use(User.createStrategy())

passport.serializeUser((user, done) => {
	done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id)
	done(null, user)
})

passport.use(new Strategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: "http://localhost:3000/auth/google/secrets",
	userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
	},
	function(accesToken, refreshToken, profile, cb){
		User.findOrCreate({googleId: profile.id}, (err, user) => {
			return cb(err, user)
		})
	}
))

app.get("/", (req, res) => {
	res.render("home")
})

app.get("/auth/google", 
	passport.authenticate("google", {scope: ["profile"]})
)

app.get("/auth/google/secrets",
	passport.authenticate("google", {failureRedirect: "/login"}),
	function(req, res){
		res.redirect("/secrets")
	}
)

app.get("/register", (req, res) => {
	res.render("register")
})

app.get("/login", (req, res) => {
	res.render("login")
})

app.get("/submit", (req, res) => {
	if(req.isAuthenticated()){
		res.render("submit")
	} else {
		res.redirect("/login")
	}
})

app.get("/logout", (req, res, next) => {
	req.logout()
	res.redirect("/")
})

app.get("/secrets", async (req, res) => {
	try {
		const users = await User.find({"secret": {$ne: null}})
		res.render("secrets", {usersWithSecrets: users})
	} catch (error) {
		console.log(error);
	}
})

app.post("/submit", async (req, res) => {
	const submittedSecret = req.body.secret
	try {
		const user = await User.findById(req.user.id)
		user.secret = submittedSecret
		user.save()
			.then(console.log("Secret save"))
			.then(res.redirect("/secrets"))
	} catch (error) {
		console.log(error);
	}
})

app.post("/register", (req, res) => {
	console.log(req.body)
	User.register({username: req.body.username}, req.body.password, (err, user) => {
		if (err) {
			console.log(err)
			res.redirect("/register")
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/secrets")
			})
		}
	})
})

app.post("/login", async (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password
	})

	req.login(user, function(err){
		if (err) {
			console.log(err)
			res.redirect("/register")
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/secrets")
			})
		}
	})
});


app.listen(port, () => {
    console.log(`Server listennig on port: ${port}`)
})