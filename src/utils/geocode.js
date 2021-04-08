const request = require('request');

const geocode = (location,callback) => {

    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1Ijoiam9zaGluaWtoaWwzNTMxIiwiYSI6ImNrbWFmcWYxbjFyaHEyb3FsYXh4dHlneWIifQ.yEYRAbSvDTnVHE3_EDJmEA&limit=1'
    request({'url' : geocodeurl,json : true},(error,{body}={}) => {

        if(error){
            callback('Unable to connect the location services',undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to find the location',undefined);
        }
        else{
            var data = body.features[0];
            callback(undefined,{
                longitude : data.center[0],
                latitude : data.center[1],
                place : data.place_name
            })
        }
    
    })
}

module.exports = geocode;