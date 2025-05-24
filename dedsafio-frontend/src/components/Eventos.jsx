// src/components/Eventos.jsx
import { useState } from "react";

import { eventosData, getColorClass } from "../data/EventosData";

export default function Eventos() {
  const [activeId, setActiveId] = useState(null); // Estado para evento activo (mostrar detalle)
  const activeEvento = eventosData.find((e) => e.id === activeId); // Buscar evento activo por id

  return (
    <section id="eventos" className="py-16 bg-zinc-900 px-8 mb-2">
      {/* Encabezado con título y link a página completa */}
      <div className="flex justify-between items-center w-full px-2 mb-8">
        <h3 className="text-3xl font-bold text-cyan-400">Anteriores Dedsafios</h3>
        <a href="/eventos" className="button3">
          Ver todo
        </a>
      </div>

      {/* Mostrar detalles del evento activo */}
      {activeEvento && (
        <div className="w-full mb-12 bg-zinc-800 p-6 rounded-xl shadow-lg text-white transition-all duration-500 scale-100">
          {/* Título del evento con color dinámico */}
          <h4 className={`text-2xl font-semibold mb-2 ${getColorClass(activeEvento.color)}`}>
            {activeEvento.title}
          </h4>
          <p className="text-sm text-zinc-400 mb-1">Fecha: {activeEvento.date}</p>
          <p className="text-white">{activeEvento.summary}</p>

          {/* Video o imagen si existen, sino mensaje */}
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
            <img
              src={activeEvento.imageSrc}
              alt={activeEvento.title}
              className="mt-4 w-full max-h-[500px] object-cover rounded-md"
            />
          ) : (
            <p className="mt-4 text-zinc-400 italic">No hay video ni imagen disponible.</p>
          )}

          {/* Botón para cerrar el detalle */}
          <button onClick={() => setActiveId(null)} className="boton-elegante mt-4">
            Cerrar
          </button>
        </div>
      )}

      {/* Scroll horizontal con tarjetas de eventos no activos */}
      <div className="overflow-x-auto w-full pb-4 scrollbar-thin scrollbar-thumb-zinc-600 pl-4">
        <div className="flex gap-4 min-w-full justify-start snap-x">
          {eventosData
            .filter((e) => e.id !== activeId) // Ocultar evento activo en la lista
            .map(({ id, title, date, summary, color }, index) => (
              <div
                key={id}
                className={`min-w-[250px] max-w-[300px] bg-zinc-800 rounded-xl shadow-md p-4 text-white flex-shrink-0 snap-start relative ${
                  index === 0 ? "ml-4" : "" // Margen izquierdo solo en la primera tarjeta
                }`}
              >
                {/* Título con color dinámico */}
                <h4 className={`text-xl font-semibold mb-1 ${getColorClass(color)}`}>
                  {title}
                </h4>
                <p className="text-sm text-zinc-400 mb-1">Fecha: {date}</p>
                <p className="text-white mb-12">{summary}</p>

                {/* Botón para mostrar detalle de evento */}
                <button onClick={() => setActiveId(id)} className="button2 absolute bottom-4 left-4">
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
      </div>
    </section>
  );
}
