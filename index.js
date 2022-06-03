//jshint esversion:6
const express =  require("express") ;
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const satelize = require("satelize");
const  response  = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());
app.use(express.static('public')) ;
app.set("view engine", "ejs");

app.get("/" , function(req , res )
{
    res.render("index") ; 
    
})
/*app.get("/weather" , function(req, res)
{
    var locat = req.body.location ;
    var unit = req.body.unit ;
    console.log(locat);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+locat+"&appid=e47d17ae12c911797809d5369f4f7fdd";
    https.get(url , function(response)
    {
        console.log(response);
        response.on("data", function(data)
        {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const pressure = weatherData.main.pressure ;
            console.log(pressure) ;
            const humidity = weatherData.main.humidity ;
            console.log(humidity);
            const description = weatherData.weather[0].description;
            console.log(description); 
            const icon = weatherData.weather[0].icon ;
            const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            /*const object = {
                name : "vishnu" ,
                place : "Tvl" ,
            }
            console.log(JSON.stringify(object));
            //res.send("<div  style='max-width: 700px; '><h1>The pressure is " + pressure+"<br>The description is "+ description+"</h1><br><img src ="+imageURL+"></div>")
           
           
        })
    })
})*/
app.post("/weatherr" , function(req,res)
{
    var locat = req.body.location;
    console.log(locat);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+locat+"&appid=e47d17ae12c911797809d5369f4f7fdd";
    https.get(url , function( response)
    {
        console.log(response);
        
        response.on("data", function(data)
        {
        
            let weatherData = JSON.parse(data);
            var weatherTemp = weatherData.main.temp ;

            var weatherPressure = weatherData.main.pressure ;
        
            var weatherHumidity = weatherData.main.humidity ;
            
            var weatherIcon = weatherData.weather[0].icon ;
            var imageURL ="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            var weatherDescription = weatherData.weather[0].description;
            var visibility = weatherData.visibility ;
            var cloudCoverage = weatherData.clouds.all ;
            var windSpeed = weatherData.wind.speed ;
            /*const object = {
                name : "vishnu" ,
                place : "Tvl" ,
            }
            console.log(JSON.stringify(object));*/
            res.render('weather1' , {
                
                temp : weatherTemp ,
                pressure : weatherPressure ,
                humidity:weatherHumidity ,
                description: weatherDescription ,
                icon: imageURL,
                Visibility : visibility ,
                cloud : cloudCoverage ,
                windspeed : windSpeed ,
            
                  });
            
                   
        
        })
    })

})
app.post("/api" , function(request , res)
{
    const lat = 11.127123 ;
    const long = 78.656891 ;
       
       
      const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=e47d17ae12c911797809d5369f4f7fdd";
      console.log(url) ;
      https.get(url , function(response)
    {
        response.on("data", function(data)
        {
            let weatherData = JSON.parse(data);
            var weatherTemp = weatherData.main.temp ;
            console.log(weatherTemp);
            var weatherPressure = weatherData.main.pressure ;
        
            var weatherHumidity = weatherData.main.humidity ;
            
            var weatherIcon = weatherData.weather[0].icon ;
            var imageURL ="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            var weatherDescription = weatherData.weather[0].description;
            var visibility = weatherData.visibility ;
            var cloudCoverage = weatherData.clouds.all ;
            var windSpeed = weatherData.wind.speed ;
            /*const object = {
                name : "vishnu" ,
                place : "Tvl" ,
            }
            console.log(JSON.stringify(object));*/
            res.render('weather2' , {
                
                temp : weatherTemp ,
                pressure : weatherPressure ,
                humidity:weatherHumidity ,
                description: weatherDescription ,
                icon: imageURL,
                Visibility : visibility ,
                cloud : cloudCoverage ,
                windspeed : windSpeed ,
            
                  });
                   
           
        })
    })


});

app.listen(3008 , function()
{
    
    console.log("server connected to port 3008" );
})