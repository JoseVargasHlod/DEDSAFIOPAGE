import { useState } from 'react';

// Componente para registrar un nuevo usuario con formulario controlado
export default function Registro({ onClose = () => {}, onLoginClick = () => {} }) {
  // Estados para los campos del formulario y para el estado de carga y mensajes
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');  // Mensaje para mostrar feedback al usuario

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);       // Activa indicador de carga
    setMensaje('');         // Limpia mensajes previos

    try {
      // Solicitud POST para registrar el usuario en el backend
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, password }),
      });

      if (res.ok) {
        setMensaje('Usuario registrado con éxito');
        // Limpiar campos después de registro exitoso
        setNombre('');
        setCorreo('');
        setContraseña('');
        // Opcional: cerrar modal aquí o con delay
        // onClose();
      } else {
        // Obtener mensaje de error del servidor
        const data = await res.json();
        setMensaje('Error: ' + (data.message || 'No se pudo registrar'));
      }
    } catch (error) {
      setMensaje('Error en la conexión con el servidor');
    }

    setLoading(false);      // Desactiva indicador de carga
  };

  return (
    // Fondo semitransparente y centrado para el modal de registro
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-xs w-full bg-gray-900 rounded-2xl overflow-hidden text-white relative font-mono p-8 pt-8 flex flex-col gap-4 text-center"
      >
        {/* Botón para cerrar el modal */}
        <button
          type="button"
          className="absolute top-3 right-3 text-white font-bold text-xl hover:text-gray-300"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold mb-2 text-white">Registro</h3>

        {/* Campos del formulario para nombre, correo y contraseña */}
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="w-full h-10 px-4 bg-gray-900 border-b border-gray-700 text-white placeholder-gray-500 rounded-none focus:outline-none"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full h-10 px-4 bg-gray-900 border-b border-gray-700 text-white placeholder-gray-500 rounded-none focus:outline-none"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full h-10 px-4 bg-gray-900 border-b border-gray-700 text-white placeholder-gray-500 rounded-none focus:outline-none"
          value={password}
          onChange={(e) => setContraseña(e.target.value)}
          required
          disabled={loading}
        />

        {/* Botón para enviar el formulario, cambia texto según carga */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-blue-100 rounded-full py-2 font-semibold text-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        {/* Mensaje de estado que muestra éxito o error */}
        {mensaje && (
          <p className="mt-2 text-green-400 font-semibold">{mensaje}</p>
        )}

        {/* Enlace para cambiar a formulario de login */}
        <div className="bg-gray-800 text-sm p-4 shadow-[0_-1px_4px_rgba(0,0,0,0.08)] text-center text-white/80">
          <p>
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => {
                onClose();
                onLoginClick();
              }}
              className="font-bold text-blue-500 hover:text-blue-400 hover:underline"
            >
              Iniciar Sesión
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
