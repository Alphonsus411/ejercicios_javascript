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
  try {
    const user = await User.findOne({
      username: 'Usuario de prueba'
    });

    if (!user) {
      console.log('Usuario no encontrado.');
      return;
    }

    console.log('Usuario encontrado:', user);

  } catch (error) {
    console.error('Error buscando usuario:', error);
  }
};

const actualizar = async () => {
  try {
    const user = await User.findOne({
      username: 'Usuario de prueba'
    });

    if (!user) {
      console.log('Usuario no encontrado para actualizar.');
      return;
    }

    console.log('Usuario antes de actualizar:', user);

    user.edad = 35;

    await user.save();

    console.log('Usuario actualizado:', user);

  } catch (error) {
    console.error('Error actualizando usuario:', error);
  }
};

const eliminar = async () => {
  try {
    const user = await User.findOne({
      username: 'Usuario de prueba'
    });

    if (!user) {
      console.log('Usuario no encontrado para eliminar.');
      return;
    }

    console.log('Usuario encontrado para eliminar:', user);

    await user.remove();

    console.log('Usuario eliminado:', user);

  } catch (error) {
    console.error('Error eliminando usuario:', error);
  }
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado a MongoDB Atlas');

    await crear();
    await buscarTodo();
    await buscar();
    await actualizar();
    await eliminar();

    await mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });