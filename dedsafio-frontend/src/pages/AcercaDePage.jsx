import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import Registro from '../components/Registro';

export default function AcercaDePage({ usuario, onLogout, setUsuario }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Contenido principal con imagen a la derecha */}
      <main className="grow bg-black text-white flex flex-col lg:flex-row items-center justify-center px-4 py-16">
        {/* Texto a la izquierda */}
        <div className="w-full lg:w-1/2 max-w-3xl px-6">
          <h1 className="text-4xl font-bold mb-6 text-green-500">Acerca de Dedsafio</h1>

          <p className="mb-6 text-lg">
            Dedsafío es una serie de eventos competitivos creados por Elded, uno de los streamers y creadores de contenido más influyentes de habla hispana. Nacido de la pasión por los videojuegos, la creatividad y la comunidad, Dedsafío reúne a decenas "a veces cientos" de streamers de toda Latinoamérica, España y aveces de todo el mubndo, para participar en retos únicos, intensos y llenos de emoción.
          </p>

          <p className="mb-6">
            Cada edición del Dedsafío se desarrolla dentro de un videojuego distinto, como Minecraft, ARK: Survival Evolved, Call of Duty: Warzone, entre otros. Lo que todos tienen en común es el espíritu competitivo, la convivencia entre creadores, y la espectacularidad de los desafíos, que combinan habilidades, estrategia y, sobre todo, entretenimiento.
          </p>

          <p className="mb-6">
            Con un enfoque en la innovación y la interacción, Dedsafío no es solo un torneo, sino una experiencia colaborativa donde se construyen historias, rivalidades, alianzas y momentos épicos que marcan a la comunidad.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Nuestra Misión</h2>
          <p className="mb-6">
          En Dedsafío, nuestra misión es crear experiencias de entretenimiento únicas que reúnan a la comunidad hispanohablante a través de desafíos colaborativos, competitivos y creativos dentro del mundo del gaming.
Buscamos impulsar el talento de creadores de contenido, fomentar la sana competencia y ofrecer al público momentos inolvidables que combinan diversión, emoción y narrativa digital.
          </p>

        </div>

        {/* Imagen a la derecha */}
        <div className="hidden lg:flex lg:w-1/2 justify-center mt-10 lg:mt-0 px-4">
          <img
            src="\img\DedsafioAcercaDE.png"
            alt="Ilustración Dedsafio"
            className="w-[500px] h-auto rounded-xl shadow-lg"
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modales */}
      {showLogin && (
        <LoginModal
          onRegisterClick={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
          onLogin={(userData) => {
            setUsuario(userData);
            localStorage.setItem('usuario', JSON.stringify(userData));
            setShowLogin(false);
          }}
        />
      )}

      {showRegister && (
        <Registro
          onLoginClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onClose={() => setShowRegister(false)}
          onRegister={(userData) => {
            setUsuario(userData);
            localStorage.setItem('usuario', JSON.stringify(userData));
            setShowRegister(false);
          }}
        />
      )}
    </div>
  );
}
