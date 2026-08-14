require('dotenv').config();

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  edad: Number,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

const crear = async () => {
  try {
    const user = new User({
      username: 'Usuario de prueba',
      edad: 30,
      email: 'test@example.com'
    });

    await user.save();

    console.log('Usuario creado exitosamente:', user);
  } catch (error) {
    console.error('Error creando usuario:', error);
  }
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado a MongoDB Atlas');

    await crear();

    await mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });