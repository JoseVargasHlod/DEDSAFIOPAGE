export default function Streaming() {
  return (
    <section id="comunidad" className="py-16 bg-zinc-900 text-center px-12 mb-2">
      <h3 className="text-3xl font-bold mb-8 text-pink-500 text-left">Comunidad</h3>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Sección de elded */}
        <div>
          <h4 className="text-2xl font-semibold mb-4 text-white">Elded</h4>
          <iframe
            src="https://player.twitch.tv/?channel=elded&parent=localhost"
            className="w-full h-64 rounded-lg mb-4"
            allowFullScreen
          ></iframe>

          {/* Redes sociales de elded */}
          <div className="flex justify-center gap-6 mt-4">
            {/* YouTube */}
            <a href="https://www.youtube.com/@deDOS" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg className="w-8 h-8 text-red-600 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a2.998 2.998 0 0 0-2.112-2.118C19.517 3.5 12 3.5 12 3.5s-7.517 0-9.386.568A2.998 2.998 0 0 0 .502 6.186 31.067 31.067 0 0 0 0 12a31.067 31.067 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.112 2.118C4.483 20.5 12 20.5 12 20.5s7.517 0 9.386-.568a2.998 2.998 0 0 0 2.112-2.118A31.067 31.067 0 0 0 24 12a31.067 31.067 0 0 0-.502-5.814ZM9.75 15.5v-7l6.25 3.5-6.25 3.5Z" />
              </svg>
            </a>

            {/* Twitch */}
            <a href="https://www.twitch.tv/elded" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
              <svg className="w-8 h-8 text-purple-500 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.265 0 0 4.265v15.21h5.684V24l4.265-4.265h3.65L24 13.6V0H4.265zm17.07 12.788-3.197 3.197h-4.263L9.61 19.25v-3.265H5.684V1.897H21.333v10.89z" />
                <path d="M17.682 5.683h-1.898v5.683h1.898V5.683zm-4.265 0h-1.897v5.683h1.897V5.683z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a href="https://x.com/elded" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg className="w-8 h-8 text-white hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.162 0h-2.924l-6.27 6.545L7.016 0H0l8.946 12.664L.45 24h2.924l6.702-6.999L17.43 24H24l-9.645-13.657L22.162 0z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/dedreviil/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-8 h-8 text-pink-500 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0-2A7.5 7.5 0 0 0 0 7.5v9A7.5 7.5 0 0 0 7.5 24h9A7.5 7.5 0 0 0 24 16.5v-9A7.5 7.5 0 0 0 16.5 0h-9Zm10.125 6.188a1.312 1.312 0 1 1-2.625 0 1.312 1.312 0 0 1 2.625 0ZM12 7.313a4.688 4.688 0 1 0 0 9.375 4.688 4.688 0 0 0 0-9.375Zm0 2.125a2.563 2.563 0 1 1 0 5.125 2.563 2.563 0 0 1 0-5.125Z" />
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/dedreviil" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg className="w-8 h-8 text-white hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.875 3.188v13.5a2.625 2.625 0 1 1-2.625-2.625h.563V11.25h-.563a5.25 5.25 0 1 0 5.25 5.25V8.129c1.2.963 2.7 1.579 4.313 1.621V7.313c-.75 0-1.5-.188-2.188-.563a4.053 4.053 0 0 1-1.5-1.5 4.314 4.314 0 0 1-.562-2.188h-2.688Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Sección de dedsafio */}
        <div>
          <h4 className="text-2xl font-semibold mb-4 text-white">Dedsafio</h4>
          <iframe
            src="https://player.twitch.tv/?channel=dedsafio&parent=localhost"
            className="w-full h-64 rounded-lg mb-4"
            allowFullScreen
          ></iframe>

          {/* Redes sociales de dedsafio */}
          <div className="flex justify-center gap-6 mt-4">
            {/* Twitch */}
            <a href="https://www.twitch.tv/dedsafio" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
              <svg className="w-8 h-8 text-purple-500 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.265 0 0 4.265v15.21h5.684V24l4.265-4.265h3.65L24 13.6V0H4.265zm17.07 12.788-3.197 3.197h-4.263L9.61 19.25v-3.265H5.684V1.897H21.333v10.89z" />
                <path d="M17.682 5.683h-1.898v5.683h1.898V5.683zm-4.265 0h-1.897v5.683h1.897V5.683z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a href="https://x.com/dedsafio" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg className="w-8 h-8 text-white hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.162 0h-2.924l-6.27 6.545L7.016 0H0l8.946 12.664L.45 24h2.924l6.702-6.999L17.43 24H24l-9.645-13.657L22.162 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


