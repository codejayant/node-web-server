const express = require('express')

var app = express()

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
  res.send('<h1>About Page</h1>')
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad file'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})