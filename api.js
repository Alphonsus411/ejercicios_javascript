require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const user = require('./user.controller')
const port = 3000

mongoose.set('strictQuery', false)

app.use(express.json())

app.get('/users', user.list)
app.post('/users', user.create)
app.get('/users/:id', user.get)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id', user.destroy)

app.use(express.static('app'))

app.get('/', (req, res) => {
  console.group(__dirname)
  res.sendFile(`${__dirname}/index.html`)
})

// 404 - siempre al final de las rutas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada')
})

const iniciar = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida en el archivo .env')
    }

    await mongoose.connect(process.env.MONGODB_URI)

    console.log('Conectado a MongoDB Atlas')

    app.listen(port, '0.0.0.0', () => {
      console.log(`Servidor escuchando en http://localhost:${port}`)
    })

  } catch (error) {
    console.error('Error iniciando la API:', error)
    process.exit(1)
  }
}

iniciar()