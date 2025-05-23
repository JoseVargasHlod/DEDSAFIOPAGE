import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-4 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Logo y nombre (izquierda en desktop, arriba en mobile) */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Dedsafio<sup>®</sup></span>
        </div>

        {/* Contenedor de secciones (derecha en desktop, debajo en mobile) */}
        <div className="flex flex-col sm:flex-row gap-8 md:ml-auto">
          {/* Sección Empresa */}
          <div>
            <h3 className="font-bold mb-1">EMPRESA</h3>
            <ul className="space-y-1 text-green-500">
              <li><Link to="/acerca">Acerca de</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Sección Comunidad */}
          <div>
            <h3 className="font-bold mb-1">COMUNIDAD</h3>
            <ul className="space-y-1 text-green-500">
              <li>
                <a
                  href="https://discord.com/invite/elded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord elded
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/dedsafio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X - Dedsafio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Línea inferior con derechos */}
      <div className="text-center text-xs mt-8 border-t border-zinc-700 pt-4 whitespace-nowrap">
        © 2025 Dedsafio Oficial. Todos los derechos reservados.
      </div>
    </footer>
  );
}
