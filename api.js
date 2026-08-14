const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.post('/', (req, res) => {
  res.status(201).send('id creado correctamente')}
)

app.put('/:id', (req, res) => {
  res.sendStatus(204)
})

app.patch('/:id', (req, res) => {
  res.sendStatus(204)
})

app.delete('/:id', (req, res) => {
  res.sendStatus(204)
})



app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})