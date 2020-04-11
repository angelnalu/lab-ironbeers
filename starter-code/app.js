const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// punkAPI.getBeers()
//   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//   .catch(error => console.log(error));


// add the partials here:
// hbs.registerPartials('HERE WE SET THE LOCATION OF OUR PARTIALS');
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// add the routes here:
app.get('/', (req, res, next) =>  {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
    .then(beers =>
      res.render('beers', { beers })
    )
    .catch(error => console.log(error));

});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
        .then(beers => {

            res.render('random-beers',beers[0]);
        })
        .catch(error => console.log(error));
  // res.render('random-beers');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
