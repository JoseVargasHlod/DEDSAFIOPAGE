
import { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Countdown from '../components/InfoDedsafio';
import Eventos from '../components/Eventos';
import Merch from '../components/Merch';

import Streaming from "../components/Streaming";
import Partners from "../components/Partners";
import Registro from "../components/Registro";
import LoginModal from '../components/LoginModal';

export default function HomePage({ usuario, onLogout, setUsuario }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const eventDate = new Date("2025-05-28T19:00:00-05:00");

  return (
    <div className="bg-black text-white">
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
      <Hero />
      <Countdown eventDate={eventDate} />
      <Eventos />
      <Merch />
     {/* <Multimedia />*/}
      <Streaming/>
      <Partners/>
     {/* <Comunidad /> */}
      <Footer />

{showLogin && (
  <LoginModal
    onRegisterClick={() => {
      console.log("Abriendo registro y cerrando login");
      setShowRegister(true);
      setShowLogin(false);
    }}
    onClose={() => {console.log("Cerrando login"); setShowLogin(false)}}
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
      console.log("Abriendo registro y cerrando login");
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
