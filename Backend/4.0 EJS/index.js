import ejs from "ejs"
import express from "express"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 3000
const date = new Date()
const dayOfWeek = date.getDay()


app.get("/", (req, res) => {
    console.log(dayOfWeek)
    res.render(__dirname + "/views/index.ejs",
    {day: dayOfWeek})
})

app.listen(port, () => {
    console.log(`Server listenning on port ${port}`)
})