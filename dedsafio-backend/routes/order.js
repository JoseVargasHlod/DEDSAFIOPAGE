const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      items,
      total,
      shippingInfo,
      metodoPago,
      infoPago
    } = req.body;

    const costoEnvio = 300; // ✅ Costo fijo

    const totalConEnvio = total + costoEnvio; // ✅ Total ajustado

    const order = new Order({
      userId,
      items,
      total: totalConEnvio, // ✅ Guardamos el total con envío
      costoEnvio,           // ✅ Guardamos el campo en la base de datos
      shippingInfo,
      metodoPago,
      infoPago
    });

    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    console.error('❌ Error guardando orden:', err);
    res.status(500).json({ success: false, error: 'Error al guardar orden' });
  }
});



router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ fecha: -1 }); // ordena las órdenes más recientes primero
    res.json(orders);
  } catch (error) {
    console.error('❌ Error obteniendo órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
});


module.exports = router;
