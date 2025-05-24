// /models/Contacto.js

// Importa mongoose para definir el esquema y modelo
const mongoose = require('mongoose');

// Define el esquema para los mensajes de contacto
const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },   // Nombre del remitente
  correo: { type: String, required: true },   // Correo del remitente
  asunto: { type: String, required: true },   // Asunto del mensaje
  mensaje: { type: String, required: true },  // Contenido del mensaje
  fecha: { type: Date, default: Date.now }    // Fecha de envío (por defecto: ahora)
});

// Exporta el modelo 'Contacto' basado en el esquema definido
module.exports = mongoose.model('Contacto', contactoSchema);
