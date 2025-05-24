// routes/cart.js

const express = require('express');
const router = express.Router();  // Crea un router de Express
const Cart = require('../models/Cart');  // Importa el modelo Cart

// Ruta GET para obtener el carrito de un usuario por su userId
router.get('/:userId', async (req, res) => {
  try {
    // Busca el carrito del usuario
    const cart = await Cart.findOne({ userId: req.params.userId });
    // Si no existe carrito, devuelve uno vacío con el userId
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    // Error en el servidor
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Ruta POST para guardar o actualizar el carrito de un usuario
router.post('/:userId', async (req, res) => {
  const { items } = req.body;  // Extrae los items del cuerpo de la petición
  try {
    // Actualiza o crea el carrito con los items nuevos
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items },
      { new: true, upsert: true }  // Devuelve el documento actualizado y crea si no existe
    );
    res.json(updatedCart);  // Devuelve el carrito actualizado
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el carrito' });
  }
});

// Ruta DELETE para eliminar el carrito de un usuario
router.delete('/:userId', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId }); // Elimina el carrito
    res.json({ success: true, message: 'Carrito eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
});

module.exports = router;  // Exporta el router
