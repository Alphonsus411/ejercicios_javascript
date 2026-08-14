require('dotenv').config();

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  edad: Number,
  email: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

const crear = async () => {
  try {
    const email = 'test@example.com';

    const existe = await User.findOne({ email });

    if (existe) {
      console.log('El usuario ya existe, no se crea de nuevo.');
      return;
    }

    const user = new User({
      username: 'Usuario de prueba',
      edad: 30,
      email
    });

    await user.save();

    console.log('Usuario creado exitosamente:', user);

  } catch (error) {
    console.error('Error creando usuario:', error);
  }
};

const buscarTodo = async () => {
  try {
    const users = await User.find();
    console.log('Usuarios encontrados:', users);
  } catch (error) {
    console.error('Error buscando usuarios:', error);
  }
};

const buscar = async () => {
  const user = await User.findOne({username: 'Usuario de prueba'});
  console.log('Usuario encontrado:', user);
};  

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado a MongoDB Atlas');

    await crear();
    await buscarTodo();
    await buscar();

    await mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });