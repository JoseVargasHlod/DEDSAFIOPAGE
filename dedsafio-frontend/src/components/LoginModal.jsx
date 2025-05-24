import { useState } from 'react';

export default function LoginModal({ onClose = () => {}, onLogin = () => {}, onRegisterClick = () => {} }) {
  // Estados para controlar los inputs y mensajes del login
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Función que maneja el login al hacer submit
  const handleLogin = async () => {
    try {
      // Enviar petición POST al backend con correo y contraseña
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });

      const data = await res.json();

      // Si la respuesta no es exitosa, lanzar error con mensaje
      if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

      // Guardar token y usuario en localStorage para persistencia
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      setMensaje('Login exitoso'); // Mensaje de éxito

      onLogin(data.usuario); // Pasar usuario autenticado a componente padre
      onClose();             // Cerrar modal de login

    } catch (error) {
      // En caso de error, mostrar mensaje y registrar en consola
      console.error('Error:', error);
      setMensaje(error.message);
    }
  };

  return (
    // Fondo semitransparente que cubre toda la pantalla y centra el modal
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      {/* Contenedor principal del modal */}
      <div className="max-w-xs w-full bg-gray-900 rounded-2xl overflow-hidden text-white relative font-mono">
        {/* Formulario de login con manejo de submit */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col p-8 pt-8 gap-4 text-center"
        >
          <span className="text-2xl font-bold text-white">Iniciar Sesión</span>
          <span className="text-base text-white/80">Ingresa con tu correo electrónico</span>
          {/* Inputs agrupados con estilo */}
          <div className="bg-gray-800 rounded-lg overflow-hidden mt-4 mb-2">
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full h-10 px-4 text-base bg-gray-900 border-b border-gray-700 text-white placeholder-gray-500 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-4 text-base bg-gray-900 border-b border-gray-700 text-white placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="bg-blue-700 text-blue-100 rounded-full py-2 px-6 font-semibold text-lg hover:bg-blue-600 transition-colors"
          >
            Entrar
          </button>
          {/* Mostrar mensaje de error o éxito */}
          {mensaje && <p className="text-red-600 mt-2">{mensaje}</p>}
        </form>

        {/* Sección para opción de registrarse */}
        <div className="bg-gray-800 text-sm p-4 shadow-[0_-1px_4px_rgba(0,0,0,0.08)] text-center text-white/80">
          <p>
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => {
                onClose();        // Cierra este modal
                onRegisterClick(); // Abre el modal de registro
              }}
              className="font-bold text-blue-500 hover:text-blue-400 hover:underline"
            >
              Registrarse
            </button>
          </p>
        </div>

        {/* Botón para cerrar modal, posicionado arriba a la derecha */}
        <button
          className="absolute top-3 right-3 text-white font-bold text-xl hover:text-gray-300"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  );
}
