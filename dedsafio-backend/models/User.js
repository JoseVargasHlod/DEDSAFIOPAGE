// models/User.js

const mongoose = require("mongoose");

// Define el esquema para usuarios
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,     // El nombre es obligatorio
  },
  correo: {
    type: String,
    required: true,     // El correo es obligatorio
    unique: true,       // El correo debe ser único en la base de datos
  },
  password: {
    type: String,
    required: true,     // La contraseña es obligatoria
  },
});

// Exporta el modelo 'User' basado en el esquema definido
module.exports = mongoose.model("User", userSchema);
