(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
                //console.log(latitude,longitude);
                fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+latitude+'&longitude='+longitude+'&localityLanguage=en').then((response) => {
                    response.json().then((data) => {
                        var location = data.locality+','+data.principalSubdivision;
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
},{"./cookie":2}],2:[function(require,module,exports){
function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

module.exports = {
    setCookie : setCookie,
    getCookie : getCookie
}
},{}]},{},[1]);
