const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Importa modelo Order

// Ruta POST para crear una nueva orden
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

    const costoEnvio = 300; // Costo fijo de envío

    const totalConEnvio = total + costoEnvio; // Total con costo de envío incluido

    // Crea una nueva orden con toda la información y total ajustado
    const order = new Order({
      userId,
      items,
      total: totalConEnvio,
      costoEnvio,
      shippingInfo,
      metodoPago,
      infoPago
    });

    await order.save(); // Guarda la orden en la base de datos

    res.json({ success: true, order }); // Respuesta con éxito y datos de la orden
  } catch (err) {
    console.error('Error guardando orden:', err);
    res.status(500).json({ success: false, error: 'Error al guardar orden' });
  }
});

// Ruta GET para obtener todas las órdenes de un usuario, ordenadas por fecha descendente
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ fecha: -1 }); // Más recientes primero
    res.json(orders);
  } catch (error) {
    console.error('Error obteniendo órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
});

module.exports = router; // Exporta el router
