import express from "express"

const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send("<h1 style='text-align: center'>Home Page!!</h1>")
})

app.get("/contact", (req, res) => {
    res.send("<h1 style='text-align: center'>My phone number: 62 9999-8888</h1>")
})

app.get("/about", (req, res) => {
    res.send("<h1 style='text-align: center'>I'm a Software Engineering Student</h1>")
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})