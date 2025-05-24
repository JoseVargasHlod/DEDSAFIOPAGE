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
