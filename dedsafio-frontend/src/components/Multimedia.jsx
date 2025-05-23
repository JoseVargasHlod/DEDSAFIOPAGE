// src/components/Multimedia.jsx
export default function Multimedia() {
  return (
    <section id="multimedia" className="py-16 bg-zinc-900 text-center px-4">
      <h3 className="text-3xl font-bold mb-8">Galería Dedsafio</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3].map((i) => (
          <img
            key={i}
            src={`https://via.placeholder.com/400x250?text=Imagen+${i}`}
            alt={`Imagen ${i}`}
            className="rounded-lg hover:scale-105 transition"
          />
        ))}
      </div>
    </section>
  );
}
