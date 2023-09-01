import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"

const app = express()
const port = 3000

function  getCurrentDate(){
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const weekday = date.getDay()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return [day, months[month], weekdays[weekday]]
}

app.set('view engine', 'ejs');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true}))

mongoose.connect("mongodb://127.0.0.1:27017/itemsDB", { useNewUrlParser: true })

const itemsSchema = new mongoose.Schema({
    chore: String
})

const Item = mongoose.model("Item", itemsSchema)
const Work = mongoose.model("Work", itemsSchema)

/*Today page*/
app.get("/", async (req, res) => {
    const currentDay = getCurrentDate()
  
    try {
        const toDos = await Item.find()
        console.log("Data colected")
        res.render("index.ejs", {
            day: currentDay[0],
            month: currentDay[1],
            weekday: currentDay[2],
            toDo: toDos})
    } catch (error) {
        console.log(error)
    }
})


app.post("/submit", (req, res) => {
    const itemName = req.body.newItem
    const item = new Item({
        chore: itemName
    })

    try {
        item.save().then(console.log("Item was added"))
    } catch (error) {
        console.log(error)
    }

    res.redirect("/")
})


app.post("/delete", async (req, res) => {
    try {
        const itemToDelete = req.body.checkbox
        await Item.findByIdAndRemove(itemToDelete)
        console.log("Item deleted successfully")
    } catch (error) {
        console.log(error)
    }
    res.redirect("/")
})



/*Work list page*/
app.get("/work", async (req, res) => {
    try {
        const workList = await Work.find()
        res.render("work.ejs", {toDo: workList})
    } catch (error) {
        console.log(error)
    }
})


app.post("/submitWork", async (req, res) => {
    const work = req.body.newItem
    const newWork = new Work({
        chore: work
    })

    try {
        newWork.save().then(console.log("New chore added"))
    } catch (error) {
        console.log(error)
    }

    res.redirect("/work")
})


app.post("/deleteWork", async (req, res) => {
    try {
        const workToDelete = req.body.checkbox;
        await Work.findByIdAndRemove(workToDelete);
        console.log("Item deleted successfully");
    } catch (error) {
        console.log(error);
    }
    res.redirect("/work");
});


app.listen(port, () => {
    console.log(`Server listenning on port ${port}`)
})