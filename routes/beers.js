const express = require('express');
const router = express.Router();

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/beers', async (req, res, next) => {
  try {
    const beers = await punkAPI.getBeers();
    res.render('beers', { beers: beers });
  } catch (error) {
    next(error);
  }
});

router.get('/random-beer', async (req, res, next) => {
  try {
    const randomBeerArray = await punkAPI.getRandom();
    res.render('random-beer', { beer: randomBeerArray[0] });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
