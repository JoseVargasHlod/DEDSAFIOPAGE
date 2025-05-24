// /routes/merch.js

const express = require('express');
const axios = require('axios');

const router = express.Router(); // Crea un router de Express

// Ruta GET para obtener productos desde Strapi (CMS headless)
router.get('/', async (req, res) => {
  try {
    // Llama al endpoint de Strapi para traer productos con imagenes pobladas
    const response = await axios.get('http://localhost:1337/api/productos?populate=imagen');

    // En Strapi v4, la data viene en response.data.data
    const productosRaw = response.data.data;

    // Mapea los productos para extraer solo los campos necesarios
    const productos = productosRaw.map(item => {
      return {
        id: item.id,
        nombre: item.attributes.nombre,
        precio: item.attributes.precio,
        descripcion: item.attributes.descripcion,
        // URL de la imagen, si existe; sino cadena vacía
        imagen: item.attributes.imagen?.data?.attributes?.url || '',
      };
    });

    // Devuelve la lista de productos procesados como JSON
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos de Strapi:', error.message);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

module.exports = router; // Exporta el router
