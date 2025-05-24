export default function Streaming() {
  return (
    // Sección principal con id "comunidad" y estilos para espaciado, fondo y texto centrado
    <section id="comunidad" className="py-16 bg-zinc-900 text-center px-12 mb-2">
      {/* Título principal de la sección */}
      <h3 className="text-3xl font-bold mb-8 text-pink-500 text-left">Comunidad</h3>

      {/* Contenedor de grid con dos columnas en pantallas medianas */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* Sección para el usuario "elded" */}
        <div>
          {/* Nombre del streamer */}
          <h4 className="text-2xl font-semibold mb-4 text-white">Elded</h4>
          {/* Video embebido de Twitch para el canal "elded" */}
          <iframe
            src="https://player.twitch.tv/?channel=elded&parent=localhost"
            className="w-full h-64 rounded-lg mb-4"
            allowFullScreen
          ></iframe>

          {/* Iconos de redes sociales de "elded" con enlaces externos */}
          <div className="flex justify-center gap-6 mt-4">
            {/* Cada enlace contiene un ícono SVG con estilo y efecto hover */}
            <a href="https://www.youtube.com/@elded" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg className="w-8 h-8 text-red-600 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="... YouTube icon path ..." />
              </svg>
            </a>
            <a href="https://www.twitch.tv/elded" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
              <svg className="w-8 h-8 text-purple-500 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="... Twitch icon path ..." />
                <path d="..." />
              </svg>
            </a>
            <a href="https://x.com/elded" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg className="w-8 h-8 text-white hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="... X icon path ..." />
              </svg>
            </a>
            <a href="https://www.instagram.com/elded/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-8 h-8 text-pink-500 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="... Instagram icon path ..." />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@elded" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg className="w-8 h-8 text-white hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="... TikTok icon path ..." />
              </svg>
            </a>
          </div>
        </div>

        {/* Sección para el usuario "dedsafio" */}
        <div>
          {/* Nombre del streamer */}
          <h4 className="text-2xl font-semibold mb-4 text-white">Dedsafio</h4>
          {/* Video embebido de Twitch para el canal "dedsafio" */}
          <iframe
            src="https://player.twitch.tv/?channel=dedsafio&parent=localhost"
            className="w-full h-64 rounded-lg mb-4"
            allowFullScreen
          ></iframe>

          {/* Iconos de redes sociales de "dedsafio" */}
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://www.twitch.tv/dedsafio" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
              <svg className="w-8 h-8 text-purple-500 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="... Twitch icon path ..." />
                <path d="..." />
              </svg>
            </a>
            <a href="https://x.com/dedsafio" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg className="w-8 h-8 text-white hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="... X icon path ..." />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
