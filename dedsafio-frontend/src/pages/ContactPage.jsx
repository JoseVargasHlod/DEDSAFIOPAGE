import { useState } from 'react'; // Importa hook para manejar estados en componentes funcionales
import Navbar from '../components/Navbar'; // Componente Navbar (barra de navegación)
import Footer from '../components/Footer'; // Componente Footer (pie de página)
import LoginModal from '../components/LoginModal'; // Modal para login
import Registro from '../components/Registro'; // Modal para registro de usuario

export default function ContactPage({ usuario, onLogout, onLoginClick, onRegisterClick, setUsuario }) {
  // Estados para mostrar u ocultar modales de login y registro
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Estados para campos del formulario de contacto
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estado para indicar si el mensaje fue enviado exitosamente
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  // Estado para indicar que se está enviando el formulario
  const [enviando, setEnviando] = useState(false);

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página al enviar
    setEnviando(true); // Indica que el envío empezó

    // Datos que se enviarán al backend
    const payload = { nombre, correo, asunto, mensaje };

    try {
      // Petición POST a la API para enviar el mensaje de contacto
      const res = await fetch('http://localhost:5000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        // Si todo salió bien, mostrar mensaje de éxito y limpiar campos
        setMensajeEnviado(true);
        setNombre('');
        setCorreo('');
        setAsunto('');
        setMensaje('');
        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => setMensajeEnviado(false), 3000);
      } else {
        alert('Hubo un error al enviar el mensaje');
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    } finally {
      setEnviando(false); // Finaliza estado de envío
    }
  };

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      {/* Mensaje de carga mientras se envía el formulario */}
      {enviando && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-zinc-800 text-white px-6 py-4 rounded shadow-lg animate-pulse">
            Enviando mensaje...
          </div>
        </div>
      )}

      {/* Mensaje de éxito al enviar el formulario */}
      {mensajeEnviado && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-green-600 text-white px-6 py-4 rounded shadow-lg animate-bounce">
            ¡Mensaje enviado con éxito!
          </div>
        </div>
      )}

      {/* Barra de navegación con opciones según estado de usuario */}
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Contenido principal con imagen y formulario */}
      <main className="grow bg-black text-white flex flex-col lg:flex-row items-center justify-center px-4 py-16">
        {/* Imagen decorativa a la izquierda solo en pantallas grandes */}
        <div className="hidden lg:flex lg:w-1/4 justify-center mb-10 lg:mb-0">
          <img
            src="\img\ded.jpeg"
            alt="Personajes Minecraft"
            className="w-[600px] h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Formulario y texto informativo a la derecha */}
        <div className="w-full lg:w-1/2 max-w-xl px-8">
          <h1 className="text-4xl font-bold mb-4">Contacto</h1>
          <p className="mb-4">
            Quieres formar parte de Dedsafio siendo socio o creando un proyecto.
          </p>
          <p className="mb-6">
            ¿Tienes una idea brillante y no sabes por dónde iniciar? ¡Contáctanos!
          </p>

          {/* Formulario de contacto */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
              />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
              />
            </div>
            <input
              type="text"
              placeholder="Asunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              required
              className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
            />
            <textarea
              placeholder="Escribe tu mensaje para nosotros aquí."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows="5"
              required
              className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded"
            >
              Enviar
            </button>

            {/* Información para contactar vía X (Twitter) */}
            <div className="mt-6 text-center">
              <p className="text-zinc-400 mb-2">O escríbenos vía X</p>
              <a
                href="https://x.com/dedsafio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition"
              >
                {/* Ícono SVG de X (Twitter) */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.162 0h-2.924l-6.27 6.545L7.016 0H0l8.946 12.664L.45 24h2.924l6.702-6.999L17.43 24H24l-9.645-13.657L22.162 0z" />
                </svg>
                @dedsafio
              </a>
            </div>
          </form>
        </div>
      </main>

      {/* Pie de página */}
      <Footer />

            {/* Modal de Login: solo se muestra si showLogin es true */}
      {showLogin && (
        <LoginModal
          onRegisterClick={() => {
            setShowRegister(true); // Cambiar a modal de registro
            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)} // Cierra modal login
          onLogin={(userData) => {
            setUsuario(userData); // Guarda usuario en estado padre
            localStorage.setItem('usuario', JSON.stringify(userData)); // Guarda usuario en localStorage
            setShowLogin(false); // Cierra modal login
          }}
        />
      )}

      {/* Modal de Registro: solo se muestra si showRegister es true */}
      {showRegister && (
        <Registro
          onLoginClick={() => {
            setShowRegister(false); // Cambiar a modal de login
            setShowLogin(true);
          }}
          onClose={() => setShowRegister(false)} // Cierra modal registro
          onRegister={(userData) => {
            setUsuario(userData); // Guarda usuario en estado padre
            localStorage.setItem('usuario', JSON.stringify(userData)); // Guarda usuario en localStorage
            setShowRegister(false); // Cierra modal registro
          }}
        />
      )}
    </div>
  );
}
