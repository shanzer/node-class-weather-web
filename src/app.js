const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const port = process.env.PORT || 3000;

// dir paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// handlebars setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// static dirs
app.use(express.static(publicPath));

// routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Aapp',
        name: 'Mike'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike S.'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'The quick brown fox jumped over the lazy dog',
        name: 'Mike'
    }); 
});

app.get('/weather', (req, res) => {
    if (req.query.address === undefined) {
        return res.send({error: 'No Address was supplied'});
    }

    geocode.getGeoCode(req.query.address, (error, {lat, long, name} = {}) => {
        if (error) {
            return res.send({error: error});
        } else {
            forecast.forecast(lat, long, (error, data) => {
                if (error) {
                    return res.send({error: error});                    
                } else {
                    res.send({
                        address: req.query.address, 
                        forecast: data,
                        location: name
                    });
                }        
            });
        }
    });
});

app.get('/products', (req, res) => {
    if (req.query.search === undefined) {
         return res.send({
            error: 'No search term'
        });
    } 
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        message: 'Help Article could not be found',
        name: 'Mike'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not found!',
        message: 'The requested page could not be found',
        name: 'Mike'        
    });
});

app.listen(port, () => {
    console.log('Up and running on ' + port);
});
