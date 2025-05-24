import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FullMerch from "../components/FullMerch";
import LoginModal from '../components/LoginModal';
import Registro from '../components/Registro';

export default function MerchPage({ usuario, onLogout, onLoginClick, onRegisterClick, setUsuario }) {
  // Estados para controlar la visibilidad de los modales de login y registro
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      {/* Navbar con manejo de usuario y apertura de modales */}
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Contenido principal donde se muestra la tienda completa */}
      <div className="flex-grow">
        <FullMerch />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal de login, solo visible si no hay usuario autenticado */}
      {!usuario && showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={(userData) => {
            setUsuario(userData);
            localStorage.setItem('usuario', JSON.stringify(userData));
            setShowLogin(false);
          }}
        />
      )}

      {/* Modal de registro */}
      {showRegister && (
        <Registro onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}
