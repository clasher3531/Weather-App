const request = require('request');

const forecast = (lat,long,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=2290bead9c3472032b4fad5ee8c10bba&query='+long+','+lat;
    request({'url' : url,json : true},(error,{body}) => {

        if(error){
            callback('Unable to connect the weather service',undefined);
        }
        else if(body.error){
            callback('Unable to find the location',undefined);
        }
        else{
            var currentData = body.current
            callback(undefined,currentData.weather_descriptions[0]+' current temperature is '+currentData.temperature+' degrees but it feels like '+currentData.feelslike+' degrees');
        }
    }
    )
}

module.exports = forecast;