// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 5800;

const server = app.listen(port, listener);

function listener(){
    console.log(`Hi! listening at port ${port}`);
}
/*app.get('/', getHome);

function getHome(request, response){
    console.log("inside home");
   response.sendFile(__dirname+'/website/dummy/index.html');
    
}*/
//app.use(express.static('website/dummycss'));

app.get('/projectData', getData);

function getData(request, response){
    console.log("GET request received.");
    response.send(projectData);
}

app.post('/projectData', setData);

function setData(request, response){
    console.log("POST request received.");
    let reqObj = request.body;
    console.log("request object received is below");
    console.log(reqObj);
    projectData.temp = reqObj.temperature;
    projectData.date = reqObj.date;
    projectData.userinput = reqObj.userInput;
    console.log("projectData is below");
    console.log(projectData);
}
