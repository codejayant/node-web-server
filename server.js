const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;

var app = express()

hbs.registerPartials(__dirname + '/views/partials')  // to register usage of partials. path will be absolute.
app.set('view engine', 'hbs') // to use handlebars as view engine


// app.use to register middleware
app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err)  {
      console.log('Unable to append to server.log')
    }
  })
  next() //if not given, code will never go to helper method
})

// maintenance code is commented otherwise none of the feature will work
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// app.use execute in order. If below line is above maintenance code, this page will still be accessible.
// so it is moved down here
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/maintenance', (req, res) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance',
    welcomeMessage: 'Welcome to Maintenance Page'
  })
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Home Page'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad file'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})