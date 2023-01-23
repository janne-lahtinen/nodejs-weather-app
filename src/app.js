const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()

// Define paths for Express config
const publicDirectoryFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryFolder))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Janne'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: 'Need some help?',
    name: 'Janne'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Janne'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    })
  }
  const queryLocation = req.query.address.trim()

  geocode(queryLocation, (error, { lat, long, location } = {}) => { // default object > destructuring won't crash app
    if (error) {
      return res.send({ error })
    }
  
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
  
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMsg: 'Help article not found.',
    title: 'Error'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMsg: 'Page not found.',
    title: 'Error'
  })
})

app.listen(port, () => (
  console.log(`Server is up on port ${port}`)
))