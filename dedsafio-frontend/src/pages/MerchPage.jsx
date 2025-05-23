import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FullMerch from "../components/FullMerch";
import LoginModal from '../components/LoginModal';
import Registro from '../components/Registro';

export default function MerchPage({ usuario, onLogout, onLoginClick, onRegisterClick, setUsuario }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

{/* Contenido principal */}
<div className="flex-grow">
  <FullMerch />
</div>


      {/* Footer */}
      <Footer />

      {/* Modales */}
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

      {showRegister && (
        <Registro onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}
