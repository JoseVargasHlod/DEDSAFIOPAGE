// models/Cart.js

//  Importa mongoose para definir el esquema y el modelo
const mongoose = require("mongoose");

// Define el esquema del carrito de compras
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID del usuario al que pertenece el carrito
  items: [ // Lista de productos en el carrito
    {
      id: String,         // ID del producto
      nombre: String,     // Nombre del producto
      precio: Number,     // Precio unitario del producto
      cantidad: Number,   // Cantidad de ese producto en el carrito
    }
  ]
}, { timestamps: true }); // Agrega automáticamente campos createdAt y updatedAt

// Exporta el modelo 'Cart' basado en el esquema definido
module.exports = mongoose.model('Cart', cartSchema);
