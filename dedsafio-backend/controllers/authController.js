// controllers/authController.js

// Importa el modelo de usuario
const User = require("../models/User");

// Importa la librería para generar tokens JWT
const jwt = require("jsonwebtoken");

// Importa bcrypt para encriptar y comparar contraseñas
const bcrypt = require('bcryptjs');

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  const { nombre, correo, password } = req.body; // Extrae los datos enviados en el cuerpo de la solicitud
  console.log('Datos recibidos:', req.body); // Muestra los datos en consola para depuración

  try {
    // Verifica si ya existe un usuario con ese correo
    const existe = await User.findOne({ correo });
    if (existe) {
      // Si el usuario ya existe, devuelve error 400
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Genera un "salt" (valor aleatorio) para el hash
    const salt = await bcrypt.genSalt(10);
    // Hashea la contraseña usando el salt generado
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea un nuevo usuario con la contraseña ya hasheada
    const nuevoUsuario = new User({
      nombre,
      correo,
      password: hashedPassword,
    });

    // Guarda el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Devuelve una respuesta de éxito
    res.status(201).json({ message: 'User registrado correctamente' });
  } catch (error) {
    // Si hay un error, lo muestra y responde con error 500
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al registrar User' });
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  const { correo, password } = req.body; // Extrae correo y contraseña del cuerpo de la solicitud

  try {
    // Busca al usuario por correo
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      // Si no existe, devuelve error 400
      return res.status(400).json({ message: 'Correo o password incorrectos' });
    }

    // Compara la contraseña ingresada con la guardada (hasheada)
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      // Si no coinciden, devuelve error 400
      return res.status(400).json({ message: 'Correo o password incorrectos' });
    }

    // Crea un token JWT con datos del usuario
    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo, nombre: usuario.nombre },
      'tu_clave_secreta_aqui', // Reemplaza esto con una clave secreta fuerte y segura
      { expiresIn: '1h' } // Establece la expiración del token (1 hora)
    );

    // Devuelve el token y algunos datos del usuario
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (error) {
    // Maneja cualquier error del servidor
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
