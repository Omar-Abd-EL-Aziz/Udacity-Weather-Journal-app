// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
let express = require("express");

// Start up an instance of app
let app = express();

/* Dependencies */
let cors = require("cors");

/* Middleware*/

let bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setting  up the server
let port = 3000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

// Get Route

app.get("/all", (req, res) => {
  res.send(projectData);
});

// Post Route

app.post("/sendAll", (req, res) => {
  //Add the date to the app End point
  projectData.date = req.body.date;
  //Add the temprature to the app End point
  projectData.temp = req.body.temp;
  //Add the user response to the end point (user-feelings)
  projectData.content = req.body.content;

  //Sending the response to the user
  res.send(projectData);
  console.log(projectData);
});
