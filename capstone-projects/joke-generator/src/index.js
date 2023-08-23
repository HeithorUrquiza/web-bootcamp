import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()
const port = 3000
const API_URL = "https://v2.jokeapi.dev/joke/"

app.use(express.static("public"))
app.use(bodyParser.urlencoded( {extended: true} ))


app.get("/", (req, res) => {
    res.render("index.ejs", {content: {intro: "Configure your joke"}})
})


app.post("/", async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}${req.body.category}`, {
            params: {
                lang: req.body.lenguage,
                type: req.body.type,
            }
        })
        console.log(result.data)
        res.render("index.ejs", {content: result.data})
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})