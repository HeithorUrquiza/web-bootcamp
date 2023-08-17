import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000
let today = []
let work = []

function  getCurrentDate(){
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const weekday = date.getDay()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return [day, months[month], weekdays[weekday]]
}

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true}))


/*Today page*/
app.get("/", (req, res) => {
    const currentDay = getCurrentDate()
    const data = {
        day: currentDay[0],
        month: currentDay[1],
        weekday: currentDay[2],
        toDo: today
    }
    res.render("index.ejs", data)
    /* today = [] */
})

app.post("/submit", (req, res) => {
    today.push(req.body.newItem)
    res.redirect("/")
})


/*Work list page*/
app.get("/work", (req, res) => {
    res.render("work.ejs", {toDo: work})
    /* work = [] */
})

app.post("/submitWork", (req, res) => {
    work.push(req.body.newItem)
    res.redirect("/work")
})


app.listen(port, () => {
    console.log(`Server listenning on port ${port}`)
})