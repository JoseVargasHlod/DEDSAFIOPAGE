const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

  userId: { type: String, required: true },
  items: [
    {
      id: String,
      nombre: String,
      precio: Number,
      cantidad: Number,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);