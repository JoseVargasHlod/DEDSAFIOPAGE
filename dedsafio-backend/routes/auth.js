// routes/auth.js

const express = require("express");
const router = express.Router(); // Crea un router de Express
const authController = require("../controllers/authController"); // Importa controlador de autenticación

// Ruta POST para registrar un nuevo usuario
router.post("/register", authController.register);

// Ruta POST para iniciar sesión
router.post("/login", authController.login);

// Exporta el router para usarlo en la app principal
module.exports = router;
