const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = process.env.PORT || 4000; 

require("dotenv").config();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
  })

const cors = require('cors');
app.use(cors({
    origin: '*'
    }));



app.get("/foods", db.getFoods);
app.get("/emission", db.getEmission);
app.post("/insert-food", db.insertFood);
app.post("/populateFoods", db.populateFoods);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

