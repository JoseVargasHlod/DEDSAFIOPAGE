// Componente funcional llamado Partners que renderiza la sección de socios actuales
export default function Partners() {
  return (
    // Sección principal con id "partners", espaciado vertical, fondo negro, texto centrado y padding horizontal
    <section id="partners" className="py-16 bg-black text-center px-4">
      
      {/* Título de la sección, con tamaño de texto grande, negrita, margen inferior, color verde y alineado a la izquierda */}
      <h3 className="text-3xl font-bold mb-6 text-green-500 text-left max-w-6xl mx-auto">
        Partners Actuales
      </h3>

      {/* Contenedor flexible que acomoda las imágenes, con separación entre ellas, centrado y ancho máximo */}
      <div className="flex flex-wrap justify-center gap-30 max-w-6xl mx-auto">
        
        {/* Imagen del socio "HexaCreators" con ancho y alto fijo, contenido ajustado y bordes redondeados */}
        <img
          src="/img/HexaCreators.png"
          alt="HexaCreators"
          className="w-48 h-48 object-contain rounded-lg"
        />

        {/* Imagen del socio "Minecraft la pelicula" con estilos similares */}
        <img
          src="/img/minecraft-pelicula.png"
          alt="Minecraft la pelicula"
          className="w-48 h-48 object-contain rounded-lg"
        />
      </div>
    </section>
  );
}
