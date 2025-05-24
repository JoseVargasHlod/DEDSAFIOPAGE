// src/components/Multimedia.jsx
export default function Multimedia() {
  return (
    // Sección con id "multimedia", fondo oscuro y padding para espaciado
    <section id="multimedia" className="py-16 bg-zinc-900 text-center px-4">
      {/* Título principal de la galería */}
      <h3 className="text-3xl font-bold mb-8">Galería Dedsafio</h3>

      {/* Grid responsive para mostrar imágenes en 1, 2 o 3 columnas según el tamaño */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Mapeo para crear 3 imágenes con placeholder, cada una con efecto hover */}
        {[1, 2, 3].map((i) => (
          <img
            key={i}
            src={`https://via.placeholder.com/400x250?text=Imagen+${i}`} // URL de imagen placeholder con texto
            alt={`Imagen ${i}`} // Texto alternativo para accesibilidad
            className="rounded-lg hover:scale-105 transition" // Bordes redondeados y efecto zoom suave al pasar mouse
          />
        ))}
      </div>
    </section>
  );
}
