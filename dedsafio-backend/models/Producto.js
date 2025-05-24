// models/Producto.js

// Importa mongoose para definir el esquema y el modelo
const mongoose = require('mongoose');

// Define el esquema del producto
const productoSchema = new mongoose.Schema({
  name: String,   // Nombre del producto
  price: Number,  // Precio del producto
  image: String   // URL o ruta de la imagen del producto
});

// Exporta el modelo 'Producto' basado en el esquema definido
module.exports = mongoose.model('Producto', productoSchema);
