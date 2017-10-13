const express = require('express')

var app = express()

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>')
  res.send({
    name: 'Jayant',
    likes: [
      'chocolate',
      'chips'
    ]
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs')
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad file'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})