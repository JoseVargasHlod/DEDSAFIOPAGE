// models/Order.js

// Importa mongoose para definir el esquema y modelo
const mongoose = require("mongoose");

// Define el esquema para las órdenes de compra
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID del usuario que hizo la orden
  items: [ // Productos incluidos en la orden
    {
      id: String,          // ID del producto
      nombre: String,      // Nombre del producto
      precio: Number,      // Precio unitario
      cantidad: Number     // Cantidad comprada
    }
  ],
  total: Number, // Total de la compra sin envío

  // Información de envío
  shippingInfo: {
    nombre: String,
    direccion: String,
    ciudad: String,
    telefono: String
  },

  metodoPago: String, // Tipo de método de pago usado (ej. tarjeta)

  // Información del pago
  infoPago: {
    titular: String,
    numeroTarjeta: String,
    expiracion: String
  },

  // Costo del envío, por defecto $300
  costoEnvio: { type: Number, default: 300 },

  // Fecha en que se realizó la orden
  fecha: { type: Date, default: Date.now }
});

// Exporta el modelo 'Order' basado en el esquema definido
module.exports = mongoose.model("Order", orderSchema);
