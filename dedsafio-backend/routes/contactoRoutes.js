// /routes/contactoRoutes.js

const express = require('express');
const router = express.Router();             // Crea un router de Express
const Contacto = require('../models/Contacto'); // Importa modelo Contacto
const nodemailer = require('nodemailer');    // Importa nodemailer para envío de emails

// Ruta POST para recibir mensajes de contacto desde formulario
router.post('/', async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body; // Extrae datos del cuerpo

  try {
    // Crea y guarda un nuevo documento Contacto en la BD
    const nuevoContacto = new Contacto({ nombre, correo, asunto, mensaje });
    await nuevoContacto.save();

    // Configura el transporter para enviar email vía Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,  // Usuario (correo) para enviar
        pass: process.env.MAIL_PASS   // Contraseña o app password
      }
    });

    // Define las opciones del correo a enviar
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO || process.env.MAIL_USER,  // Destinatario
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      html: `
        <h3>Nuevo mensaje desde el formulario</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong><br/>${mensaje}</p>
      `
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);

    // Responde con éxito
    res.status(200).json({ message: 'Mensaje guardado y correo enviado con éxito' });
  } catch (error) {
    console.error('Error en contacto:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

module.exports = router; // Exporta el router
