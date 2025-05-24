// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import MerchPage from "./pages/MerchPage.jsx";
import LoginModal from './components/LoginModal.jsx';
import CarritoPage from "./pages/CarritoPage";
import HistorialCompras from './pages/HistorialCompras.jsx';

import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AcercaDePage from './pages/AcercaDePage.jsx';
import EventosPage from './pages/EventosPage.jsx';

function AppContent({ usuario, setUsuario }) {
  // Estados para controlar la visibilidad de modales de login y registro
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Función para cerrar sesión y limpiar datos de usuario en localStorage
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  };

  // Manejo del login: actualizar estado y almacenamiento local
  const handleLogin = (userData) => {
    setUsuario(userData);
    localStorage.setItem('usuario', JSON.stringify(userData));
    setShowLogin(false);
  };

  return (
    <>
      {/* Definición de rutas con sus componentes y props */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              usuario={usuario}
              onLogout={cerrarSesion}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
              setUsuario={setUsuario}
            />
          }
        />
        <Route path="/eventos" 
          element={
            <EventosPage 
              usuario={usuario}
              onLogout={cerrarSesion}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
              setUsuario={setUsuario} 
            />
          } 
        />
        <Route
          path="/merch"
          element={
            <MerchPage
              usuario={usuario}
              setUsuario={setUsuario}
              onLogout={cerrarSesion}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
            />
          }
        />
        <Route
          path="/carrito"
          element={
            <CarritoPage
              usuario={usuario}
              onLogout={cerrarSesion}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
              setUsuario={setUsuario}
            />
          }
        />
        <Route
          path="/historial"
          element={
            <HistorialCompras
              usuario={usuario}
              onLogout={cerrarSesion}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
              setUsuario={setUsuario}
            />
          }
        />
        <Route 
          path="/checkout" 
          element={
            <CheckoutPage
              usuario={usuario}
              onLogout={cerrarSesion}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
              setUsuario={setUsuario} 
            />} 
        />
        <Route
          path="/contacto"
          element={
            <ContactPage
              usuario={usuario}
              onLogout={cerrarSesion}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
              setUsuario={setUsuario}
            />
          }
        />
        <Route
          path="/acerca"
          element={
            <AcercaDePage
              usuario={usuario}
              onLogout={cerrarSesion}
              onLoginClick={() => setShowLogin(true)}
              onRegisterClick={() => setShowRegister(true)}
              setUsuario={setUsuario}
            />
          }
        />
      </Routes>

      {/* Modal de login, solo si no hay usuario autenticado */}
      {!usuario && showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {/* Modal de registro, solo si no hay usuario autenticado */}
      {!usuario && showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegister={handleLogin}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario almacenado en localStorage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      {/* Proveedor de contexto para carrito, pasa el usuario actual */}
      <CartProvider usuario={usuario}>
        <AppContent usuario={usuario} setUsuario={setUsuario} />
      </CartProvider>
    </Router>
  );
}
