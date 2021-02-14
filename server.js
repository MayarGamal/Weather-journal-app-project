const cors = require('cors'); 
const express = require('express');  // Require Express to run server and routes
const bodyParser = require('body-parser');

const my_port = 5000;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//const app = cors();
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.listen(my_port, function(){
    console.log(`Server Running On: http://localhost:${my_port}`);
});

// Initialize all route with a callback function
app.get('/all' , send );

// Callback function to complete GET '/all'
function send(req , res){

	 console.log("send_data fn");

	res.send(projectData);
	//projectData=[];
}

// Post Route
app.post('/add' , add_data );

// Callback function to complete post '/add'
function add_data(req , res){

    console.log("add_data fn")
	//console.log(req.body);

	projectData.temp = req.body.temp;
	projectData.date = req.body.date;
	projectData.content = req.body.content;
    res.send(projectData);

}