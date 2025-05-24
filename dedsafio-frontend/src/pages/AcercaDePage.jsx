import { useState } from 'react'; // Hook para manejar estados locales
import Navbar from '../components/Navbar'; // Componente Navbar
import Footer from '../components/Footer'; // Componente Footer
import LoginModal from '../components/LoginModal'; // Modal para iniciar sesión
import Registro from '../components/Registro'; // Modal para registro de usuario

export default function AcercaDePage({ usuario, onLogout, setUsuario }) {
  // Estado para controlar la visibilidad del modal de login
  const [showLogin, setShowLogin] = useState(false);
  // Estado para controlar la visibilidad del modal de registro
  const [showRegister, setShowRegister] = useState(false);

  return (
    // Contenedor principal con estilos de fondo negro, texto blanco y diseño en columna
    <div className="bg-black text-white min-h-screen flex flex-col">
      
      {/* Navbar con props para usuario, logout y apertura de modales */}
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={() => setShowLogin(true)} // Abre modal login
        onRegisterClick={() => setShowRegister(true)} // Abre modal registro
      />

      {/* Contenido principal: texto a la izquierda, imagen a la derecha en pantallas grandes */}
      <main className="grow bg-black text-white flex flex-col lg:flex-row items-center justify-center px-4 py-16">
        
        {/* Texto descriptivo, ocupa mitad del ancho en pantallas lg */}
        <div className="w-full lg:w-1/2 max-w-3xl px-6">
          <h1 className="text-4xl font-bold mb-6 text-green-500">Acerca de Dedsafio</h1>

          {/* Párrafos descriptivos sobre Dedsafio */}
          <p className="mb-6 text-lg">
            Dedsafio es una serie de eventos creados por Elded, uno de los streamers y creadores de contenido más influyentes de habla hispana. Nacido de la pasión por los videojuegos, la creatividad y la comunidad, Dedsafío reúne a decenas "a veces cientos" de streamers de toda Latinoamérica, España y aveces de todo el mubndo, para participar en retos únicos, intensos y llenos de emoción.
          </p>

          <p className="mb-6">
            Cada edición del Dedsafio se desarrolla dentro de un videojuego distinto, como Minecraft, ARK: Survival Evolved, Call of Duty: Warzone, entre otros. Lo que todos tienen en común es el espíritu competitivo, la convivencia entre creadores, y la espectacularidad de los desafíos, que combinan habilidades, estrategia y, sobre todo, entretenimiento.
          </p>

          <p className="mb-6">
            Con un enfoque en la innovación y la interacción, Dedsafío no es solo un torneo, sino una experiencia colaborativa donde se construyen historias, rivalidades, alianzas y momentos épicos que marcan a la comunidad.
          </p>

          {/* Subtítulo y misión */}
          <h2 className="text-2xl font-semibold mt-10 mb-4">Nuestra Misión</h2>
          <p className="mb-6">
            En Dedsafio, nuestra misión es crear experiencias de entretenimiento únicas que reúnan a la comunidad hispanohablante a través de desafíos colaborativos, competitivos y creativos dentro del mundo del gaming.
            Buscamos impulsar el talento de creadores de contenido, fomentar la sana competencia y ofrecer al público momentos inolvidables que combinan diversión, emoción y narrativa digital.
          </p>
        </div>

        {/* Imagen a la derecha, solo visible en pantallas lg y superiores */}
        <div className="hidden lg:flex lg:w-1/2 justify-center mt-10 lg:mt-0 px-4">
          <img
            src="\img\DedsafioAcercaDE.png" // Imagen ilustrativa
            alt="Ilustración Dedsafio" // Texto alternativo
            className="w-[500px] h-auto rounded-xl shadow-lg" // Estilos para imagen
          />
        </div>
      </main>

      {/* Footer de la página */}
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
