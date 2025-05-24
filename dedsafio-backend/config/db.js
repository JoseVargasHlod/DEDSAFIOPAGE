// config/db.js

// Importa mongoose para conectar con MongoDB
const mongoose = require('mongoose');

// Función asíncrona para conectar a la base de datos
const connectDB = async () => {
  try {
    // Intenta conectar usando la URI definida en variables de entorno
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado'); // Mensaje en consola si la conexión es exitosa
  } catch (error) {
    // Si ocurre un error, lo muestra y detiene la ejecución del servidor
    console.error(error.message);
    process.exit(1);
  }
};

// Exporta la función para poder usarla en otras partes del proyecto
module.exports = connectDB;
