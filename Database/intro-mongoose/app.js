import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/personsDB", { useNewUrlParser: true })

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You forgot the name of product"]
    },
    price: {
        type: Number,
        required: [true, "Type the price of the product"]
    },
    stock: Number
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You forgot the name!"]
    },
    age: Number,
    bought: shopSchema
})

const Person = mongoose.model("Person", personSchema)
const Product = mongoose.model("ShopDB", shopSchema)

const person = new Person({
    name: "Anna",
    age: 20
})

const pen = new Product({
    name: "Pen",
    price: 1.2,
    stock: 12
})

pen.save()
//person.save().then(console.log("Person was saved"))


/* const p1 = new Person({
    name: "Anna",
    age: 16
})
const p2 = new Person({
    name: "Alex",
    age: 23
})
const p3 = new Person({
    name: "Jeni",
    age: 20
}) */

/* Person.insertMany([p1, p2, p3])
    .then(function () {
        console.log("Successfully saved defult items to DB");
    })
    .catch(function (err) {
        console.log(err);
    }); */


//Reading Data
/* try {
    const people = await Person.find()

    people.forEach(person => {
        console.log(person.name)
    })
} catch (error) {
    console.log(error)
} */


//Updating Data
/* try {
    const res = await Person.updateOne({_id: "64ef49be74b4bf545d9569fa"}, {name: "James Bond"})

    console.log(`Data was updated`)
    mongoose.connection.close()
} catch (error) {
    console.log(error)
} */


//Deleting Data
/* try {
    const res = await Person.deleteOne({_id: "64ef701173125d187ea0a8db"})
    console.log("Data was deleted")
    mongoose.connection.close()
} catch (error) {
    console.log(error)
} */


//Relashionship
try {
    const res = await Person.updateOne({_id: "64ef49be74b4bf545d9569fa"}, {bought: pen})
    console.log("Data updated sussesfuly")
} catch (error) {
    console.log(error)
}