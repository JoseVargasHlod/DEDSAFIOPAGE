// /routes/contactoRoutes.js
const express = require('express');
const router = express.Router();
const Contacto = require('../models/Contacto');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  try {
    const nuevoContacto = new Contacto({ nombre, correo, asunto, mensaje });
    await nuevoContacto.save();

    // ENVÍO DE CORREO (opcional)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // tu correo
        pass: process.env.MAIL_PASS  // tu contraseña o app password
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      html: `
        <h3>Nuevo mensaje desde el formulario</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong><br/>${mensaje}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Mensaje guardado y correo enviado con éxito' });
  } catch (error) {
    console.error('Error en contacto:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

module.exports = router;
