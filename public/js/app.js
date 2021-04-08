const cookie = require('./cookie'); //require cookie 

// Selecting the elements
const weatherForm = document.querySelector('form');
const Search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// creating the const for cookie expiry time in mins;
const cookieExpiry = 30;

// method gives information about the forecast when location is provided
function getInfo(location){
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.Forecast;
                messageTwo.textContent = data.place;
            }
        })
    })
}

// Implement geolocation alert when window loads
window.onload = function(){

    // if location variable kept inside the cookie
    if(cookie.getCookie('location')){
        getInfo(cookie.getCookie('location'));
    }else{
        if(navigator.geolocation){
            // using navigator class to get the exact location
            navigator.geolocation.getCurrentPosition(function(position){
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // fetching the place name with the help of lat and long
                fetch('http://api.weatherstack.com/current?access_key=2290bead9c3472032b4fad5ee8c10bba&query='+latitude+','+longitude).then((response) => {
                    response.json().then((data) => {
                        var location = data.location.name;
                        messageOne.textContent = 'Loading...';
                        messageTwo.textContent = '';
                        // setting the cookie
                        cookie.setCookie('location',location,cookieExpiry);
                        getInfo(location);
                    })
                })
            })
        }else{
            console.log("geolocation is not supported");
        }
    }  
}

// getting weather after submit the button
weatherForm.addEventListener('submit',(e) => {

    e.preventDefault();
    const location = Search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    // setting the cookie
    cookie.setCookie('location',location,cookieExpiry);
    getInfo(location);
})