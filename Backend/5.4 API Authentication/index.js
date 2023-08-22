import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "animes";
const yourPassword = "IAmTheBest";
const yourAPIKey = "b7515e3e-e26c-4da9-b4d5-0b71a561634a";
const yourBearerToken = "b3ff4d65-5e97-4cfb-a1e7-b28058e4e02b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});


app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  // Fazendo uma requisição GET para obter os posts da API JSONPlaceholder
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random")
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});


app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/all", {
      auth: {
        username: yourUsername,
        password: yourPassword
      },
      params: {page: 2}
    })
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});


app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey
      }
    })
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});


app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402

  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    })
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
