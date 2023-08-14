import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let letters = ""

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {letters: letters})
  letters = ""
});

app.post("/submit", (req, res) => {
  const fullName = req.body.fName + req.body.lName
  letters = fullName.length
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
