// controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { nombre, correo, password } = req.body;
  console.log('Datos recibidos:', req.body);

  try {
    const existe = await User.findOne({ correo }); // ← aquí
    if (existe) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new User({ // ← aquí
      nombre,
      correo,
      password: hashedPassword,
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: 'User registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al registrar User' });
  }
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ message: 'Correo o password incorrectos' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ message: 'Correo o password incorrectos' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo, nombre: usuario.nombre },
      'tu_clave_secreta_aqui', // pon aquí una clave secreta fuerte
      { expiresIn: '1h' }       // el token expirará en 1 hora (ajusta según prefieras)
    );

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
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};