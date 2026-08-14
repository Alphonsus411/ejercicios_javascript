const express = require('express')

const app = express()
const user = require('./user.controller')
const port = 3000

app.get('/', user.list)

app.post('/', user.create)

app.get('/:id', user.get)

app.put('/:id', user.update)

app.patch('/:id', user.update)

app.delete('/:id', user.destroy)



app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})