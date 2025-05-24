// src/pages/EventosPage.jsx
import { useState } from "react"; // Hook para manejar estados en componentes funcionales
import Navbar from "../components/Navbar"; // Componente Navbar
import Footer from "../components/Footer"; // Componente Footer

import { eventosData, getColorClass } from "../data/EventosData"; 
// Importa datos de eventos y función para obtener clases de color según evento

export default function EventosPage({ usuario, onLogout, setUsuario }) {
  // Estado para almacenar el ID del evento activo (seleccionado)
  const [activeId, setActiveId] = useState(null);
  // Busca el evento que coincide con el ID activo para mostrar detalles
  const activeEvento = eventosData.find((e) => e.id === activeId);

  // Estados para mostrar/ocultar modales de login y registro (aunque aquí no se usan en UI)
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {/* Barra de navegación con manejo de usuario y apertura de modales */}
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Contenedor principal */}
      <main className="pt-24 pb-16 px-8 bg-zinc-900 min-h-screen overflow-x-hidden">
        {/* Título de la sección */}
        <h3 className="text-3xl font-bold mb-8 text-left text-cyan-400">
          Anteriores Dedsafios
        </h3>

        {/* Si hay un evento activo, mostrar su detalle expandido */}
        {activeEvento && (
          <div className="w-full mb-12 bg-zinc-800 p-6 rounded-xl shadow-lg text-white transition-all duration-500 scale-100">
            <h4 className={`text-2xl font-semibold mb-2 ${getColorClass(activeEvento.color)}`}>
              {activeEvento.title}
            </h4>
            <p className="text-sm text-zinc-400 mb-1">Fecha: {activeEvento.date}</p>
            <p className="text-white">{activeEvento.summary}</p>

            {/* Muestra video si existe */}
            {activeEvento.videoSrc ? (
              <video
                src={activeEvento.videoSrc}
                autoPlay
                muted
                controls
                playsInline
                className="mt-4 w-full max-h-[500px] object-cover rounded-md"
              />
            ) : activeEvento.imageSrc ? (
              // Si no hay video, muestra imagen si existe
              <img
                src={activeEvento.imageSrc}
                alt={activeEvento.title}
                className="mt-4 w-full max-h-[500px] object-cover rounded-md"
              />
            ) : (
              // Si no hay ni video ni imagen, muestra texto alternativo
              <p className="mt-4 text-zinc-400 italic">No hay video ni imagen disponible.</p>
            )}

            {/* Botón para cerrar el detalle y volver a la lista */}
            <button
              onClick={() => setActiveId(null)}
              className="boton-elegante mt-4"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Lista de eventos en forma de tarjetas */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {eventosData.map(({ id, title, date, summary, color }) => (
            <div
              key={id}
              className="bg-zinc-800 rounded-xl shadow-md p-6 text-white relative"
            >
              {/* Título con color dinámico */}
              <h4 className={`text-xl font-semibold mb-2 ${getColorClass(color)}`}>
                {title}
              </h4>
              {/* Fecha del evento */}
              <p className="text-sm text-zinc-400 mb-2">Fecha: {date}</p>
              {/* Resumen del evento */}
              <p className="text-white mb-12">{summary}</p>

              {/* Botón para ver detalle del evento */}
              <button
                onClick={() => setActiveId(id)}
                className="button2 absolute bottom-4 left-4"
              >
                {/* Icono de ojo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Ver</span>
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Pie de página */}
      <Footer />
    </>
  );
}
