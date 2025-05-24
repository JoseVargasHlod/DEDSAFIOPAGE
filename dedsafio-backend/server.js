const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/merch');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const contactoRoutes = require('./routes/contactoRoutes'); 

dotenv.config();  // Carga variables de entorno desde .env
const app = express();

app.use(cors({
  origin: 'http://localhost:5173'  // Permite peticiones solo desde este origen (frontend)
}));

app.use(express.json()); // Middleware para parsear JSON en el body

// Monta rutas en la app
app.use('/api/auth', authRoutes);
app.use('/api/merch', productosRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contacto', contactoRoutes); // Monta la ruta para contacto

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API de Dedsafio funcionando');
});

// Conecta a MongoDB usando URI de entorno y luego levanta el servidor en puerto 5000
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('Backend en http://localhost:5000'));
  })
  .catch(err => console.error(err));
