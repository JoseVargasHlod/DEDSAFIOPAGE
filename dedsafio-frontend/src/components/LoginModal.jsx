
import { useState } from 'react';

export default function LoginModal({ onClose = () => {}, onLogin = () => {}, onRegisterClick = () => {} }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

      // Guardar en localStorage
      localStorage.setItem('token', data.token); 
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      setMensaje('Login exitoso');

      onLogin(data.usuario); // Enviar usuario a App
      onClose();             // Cerrar modal

    } catch (error) {
      console.error('Error:', error);
      setMensaje(error.message);
    }
  };

return (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
    <div className="max-w-xs w-full bg-gray-900 rounded-2xl overflow-hidden text-white relative font-mono">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col p-8 pt-8 gap-4 text-center"
      >
        <span className="text-2xl font-bold text-white">Iniciar Sesión</span>
        <span className="text-base text-white/80">Ingresa con tu correo electrónico</span>
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
        <button
          type="submit"
          className="bg-blue-700 text-blue-100 rounded-full py-2 px-6 font-semibold text-lg hover:bg-blue-600 transition-colors"
        >
          Entrar
        </button>
        {mensaje && <p className="text-red-600 mt-2">{mensaje}</p>}
      </form>

      <div className="bg-gray-800 text-sm p-4 shadow-[0_-1px_4px_rgba(0,0,0,0.08)] text-center text-white/80">
        <p>
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => {
              onClose();
              onRegisterClick();
            }}
            className="font-bold text-blue-500 hover:text-blue-400 hover:underline"
          >
            Registrarse
          </button>
        </p>
      </div>

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

