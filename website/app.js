//To remember: fetch just returns a promise which contains the HttpResponse object. To extract body from this object and to convert it into ordinary javascript object we write response.json().

/* Global Variables */
//Below module is required only when this js file has to run independently in node environment as fetch is not a part of node.
//const fetch = require("node-fetch");

const APPID = "369669b512cd26b9861d39a2e1ad81f3";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
let customData = {};

document.querySelector("#generate").addEventListener("click", sendData);

function sendData() {
  console.log("generate clicked");
  const userInput = document.querySelector("#feelings").value.trim();
  const zipCode = document.querySelector("#zip").value.trim();
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${APPID}`.trim();
  getData(url).then(function(data) {
    console.log("Below data is returned from openweatherapi");
    console.log(data);

    //Initializing our customData object with data returned from openweatherapi.
    customData.temperature = data.main.temp;
    customData.date = newDate;
    customData.userInput = userInput;

    //making post request with customData object on our end point defined at server.js
    postData("/projectData", customData);

    //Finally updating the UI by making a GET request at end point defined in server.js
    updateUI("/projectData").then(function(data) {
      console.log("after promised is resolved in updateUI");
      console.log(data);
      document.querySelector("#date").textContent = data.date;
      document.querySelector("#temp").textContent = data.temp;
      document.querySelector("#content").textContent = data.userinput;
    });
  });
}

const getData = async (url = "") => {
  //this method will fetch data from the openweatherapi.
  const response = await fetch(url);
  console.log("response from fetch in openweatherapi below");
  console.log(response);
  try {
    const respData = await response.json(); //will read the body stream and if found to be correct json object, it will convert it into javascript object and will return it.
    console.log("response body fetched below");
    console.log(respData);
    return respData;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  //this method will make a post request and send data to the end point passed in url.
  console.log("post method called");
  //console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) //body type should match with Content-Type.
  });

  try {
    const respData = await response.json();
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async (url = "") => {
  //this method will update the UI
  console.log("updateUI called.");
  const response = await fetch(url);
  try {
    const respData = await response.json();
    console.log("respData from updateUI");
    console.log(respData);
    return respData;
  } catch (error) {
    console.log("error", error);
  }
};
