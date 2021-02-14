// Personal API Key for OpenWeatherMap API
const apikey = "&appid=e2f2b6e1915a964a2f8bef8dbc390daf&units=metric";
const hosturl = "http://localhost:5000/";
const baseurl = "http://api.openweathermap.org/data/2.5/forecast?zip="

/* Global Variables */
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const date= document.getElementById('date');
const feelings = document.getElementById('feelings');
const zip = document.getElementById('zip');
const button = document.getElementById('generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
button.addEventListener('click', afterclick);

/* Function called by event listener */
function afterclick(){

  let values ={
  	    zip_value: zip.value,
        feelings_value: feelings.value,
        date_value: d
       // temp : temp 
  };
  
  getdata(values.zip_value).then(function(result){
       console.log(result);

         if (result.cod != 200){ return alert(result.message);}
         
       values.temp = result.list[0].main.temp;
       postdata('/add' , { date:values.date_value , content:values.feelings_value , temp: values.temp } );
       updateUI();
  });

  
	}

/* Function to GET Web API Data*/
 const getdata = async(zip_value) =>{

	try{

		const result = await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip_value}${apikey}`)).json();
	
		return result; 
		console.log(result);
	} 
	catch(error){
      	console.log('error' , error);
    }
};

/* Function to POST data */
 const postdata = async( url_to_post_to = '' , values={}) =>{

	const response = await fetch( url_to_post_to , {
      method: 'POST', 
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(values), // convert body to JSON
    });

    try{
            return;
    }
    catch(error){
        console.log('error' , error);
    }
};

/* Function to update UI */

const updateUI = async()=>{

  
   console.log('update ui entered')

	 const response = await fetch('/all');
	 try{
	 	const alldata = await response.json();

	 	date.innerHTML = 'date:' + alldata/*[0]*/.date;
	 	temp.innerHTML = 'temprature: ' + alldata/*[0]*/.temp;
	 	content.innerHTML = 'feeling:' + alldata/*[0]*/.content;

    console.log(alldata);
    console.log('html updated');
	 }
	 catch(error){
        console.log('error' , error);
     }
}
