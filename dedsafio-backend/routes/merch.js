
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:1337/api/productos?populate=imagen');
    // En Strapi v4 la respuesta viene dentro de data.data
    const productosRaw = response.data.data;

    // Mapear los productos para sacar solo lo necesario
    const productos = productosRaw.map(item => {
      return {
        id: item.id,
        nombre: item.attributes.nombre,
        precio: item.attributes.precio,
        descripcion: item.attributes.descripcion,
        imagen: item.attributes.imagen?.data?.attributes?.url || '', // URL de la imagen
      };
    });

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos de Strapi:', error.message);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

module.exports = router;