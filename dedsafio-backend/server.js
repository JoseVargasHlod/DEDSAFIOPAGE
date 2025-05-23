// import productosRoutes from './routes/merch.js';

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/merch');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const contactoRoutes = require('./routes/contactoRoutes'); // ✅ IMPORTAR contacto


dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173'  // o el puerto donde corre tu frontend
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/merch', productosRoutes);
app.use('/api/cart', cartRoutes); // ✅ Aquí la montas
app.use('/api/orders', orderRoutes);
app.use('/api/contacto', contactoRoutes); // 👈 Montar la nueva ruta

app.get('/', (req, res) => {
  res.send('API de Dedsafio funcionando 🎯');
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('🚀 Backend en http://localhost:5000'));
  })
  .catch(err => console.error(err));
