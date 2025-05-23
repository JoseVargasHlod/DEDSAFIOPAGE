const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Obtener el carrito de un usuario
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Guardar o actualizar el carrito
router.post('/:userId', async (req, res) => {
  const { items } = req.body;
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items },
      { new: true, upsert: true }
    );
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el carrito' });
  }
});

// Eliminar carrito de un usuario
router.delete('/:userId', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ success: true, message: 'Carrito eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
});

module.exports = router;
