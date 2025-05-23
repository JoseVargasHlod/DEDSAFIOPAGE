// models/Order.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      id: String,
      nombre: String,
      precio: Number,
      cantidad: Number,
    }
  ],
  total: Number,
  shippingInfo: {
    nombre: String,
    direccion: String,
    ciudad: String,
    telefono: String,
  },
  metodoPago: String,
  infoPago: {
    titular: String,
    numeroTarjeta: String,
    expiracion: String,
  },
  costoEnvio: { type: Number, default: 300 }, // ✅ nuevo campo con valor fijo
  fecha: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Order", orderSchema);
