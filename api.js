const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})