const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Defines path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialHbsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialHbsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Nikhil Joshi'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Nikhil Joshi'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        helptext : 'This is some helpful text',
        name : 'Nikhil Joshi'
    })
})

app.get('/weather',(req,res) => {

    const Location = req.query.address;

    if(!Location){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(Location,(error,{longitude,latitude,place} = {}) => {

        if(error){
            return res.send({
                error : error
            })
        }
        forecast(longitude, latitude, (error, forecastdata) => {
            
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                Forecast : forecastdata,
                place,
                address : Location
            });
        })
    })    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404 Error',
        errorMessage : 'Help article not found',
        name : 'Nikhil Joshi'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title : '404 Error',
        errorMessage : 'Page not found',
        name : 'Nikhil Joshi'
    })
})

app.listen(port,() => {
    console.log('Server is running on port 3000');
})