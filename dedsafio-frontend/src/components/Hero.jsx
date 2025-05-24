import React from 'react';

export default function Hero() {
  return (
    <section
      id="inicio" // ID para anclaje y referencia en la página
      className="relative h-screen w-full overflow-hidden" // Ocupa toda la pantalla y oculta desbordes
    >
      {/* Video de fondo que cubre toda la sección */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover" // Posicionado absoluto para cubrir sección
        src="/videos/DedsafioBingo3.mp4" // Ruta del video a reproducir
        autoPlay // Reproduce automáticamente al cargar
        muted // Silencia el audio del video
        playsInline // Reproduce el video en línea en dispositivos móviles
        controls // Muestra controles de video (play, pausa, etc.)
      >
        Tu navegador no soporta el video. {/* Texto alternativo si no se puede reproducir */}
      </video>
    </section>
  );
}
