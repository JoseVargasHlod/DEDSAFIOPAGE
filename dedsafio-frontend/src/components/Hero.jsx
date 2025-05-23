import React from 'react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video de fondo ocupando toda la sección */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/DedsafioBingo3.mp4"
        autoPlay
        muted
        playsInline
        controls
      >
        Tu navegador no soporta el video.
      </video>
    </section>
  );
}
