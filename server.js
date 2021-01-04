const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const { json } = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
//View Engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {
        city: null,
        des: null,
        icon: null,
        temp: null
    });
});


app.post('/', async (req, res) => {
    const city = req.body.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;

    try {
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.messsage === 'city not found') {
                    res.render('index', {
                        city: data.messsage,
                        des: null,
                        icon: null,
                        temp: null
                    })
                } else {
                    const city = data.name;
                    const des = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    const temp = data.main.temp;

                    res.render('index', {
                        city, des, icon, temp

                    });
                }
            });
    } catch (err) {
        res.render('index', {
            city: 'Something Went Wrong',
            des: null,
            icon: null,
            temp: null
        })
    }
})

const port = process.env.PORT || 7500;

app.listen(port, () => {
    console.log("Sample App is Running On The Port 7500");
})