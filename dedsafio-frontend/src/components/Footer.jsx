// src/components/Footer.jsx

import { Link } from 'react-router-dom'; // Importa Link para navegación SPA sin recargar página

export default function Footer() {
  return (
    // Contenedor principal del footer con fondo oscuro y texto blanco, padding responsivo
    <footer className="bg-zinc-900 text-white py-4 px-4 md:px-16">
      
      {/* Contenedor que centra el contenido y lo organiza en columna en móvil y fila en desktop */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Logo y nombre, se muestra arriba en móvil y a la izquierda en desktop */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            Dedsafio<sup>®</sup> {/* Marca registrada */}
          </span>
        </div>

        {/* Contenedor de las secciones "Empresa" y "Comunidad" */}
        {/* En móvil se apilan, en desktop se muestran en fila con espacio entre ellas */}
        <div className="flex flex-col sm:flex-row gap-8 md:ml-auto">
          
          {/* Sección Empresa con título y lista de enlaces internos */}
          <div>
            <h3 className="font-bold mb-1">EMPRESA</h3>
            <ul className="space-y-1 text-green-500">
              {/* Links internos usan componente Link para navegación sin recargar */}
              <li><Link to="/acerca">Acerca de</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Sección Comunidad con enlaces externos a redes sociales y Discord */}
          <div>
            <h3 className="font-bold mb-1">COMUNIDAD</h3>
            <ul className="space-y-1 text-green-500">
              {/* Enlaces externos abren en nueva pestaña con seguridad (rel) */}
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

      {/* Barra inferior con texto pequeño, centrado y borde superior */}
      <div className="text-center text-xs mt-8 border-t border-zinc-700 pt-4 whitespace-nowrap">
        © 2025 Dedsafio Oficial. Todos los derechos reservados.
      </div>
    </footer>
  );
}
