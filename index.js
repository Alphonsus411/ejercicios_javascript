const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });

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