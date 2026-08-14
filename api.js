const mongoose = require('mongoose')
const express = require('express')

const app = express()
const user = require('./user.controller')
const port = 3000

mongoose.connect(process.env.MONGODB_URI, {
})

app.use(express.json())

app.get('/', user.list)
app.post('/', user.create)
app.get('/:id', user.get)
app.put('/:id', user.update)
app.patch('/:id', user.update)
app.delete('/:id', user.destroy)

// 404 - siempre al final de las rutas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})