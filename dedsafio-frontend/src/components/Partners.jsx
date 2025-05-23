export default function Partners() {
  return (
    <section id="partners" className="py-16 bg-black text-center px-4">
      <h3 className="text-3xl font-bold mb-6 text-green-500 text-left max-w-6xl mx-auto">
        Partners Actuales
      </h3>
      <div className="flex flex-wrap justify-center gap-30 max-w-6xl mx-auto">
        <img
          src="/img/HexaCreators.png"
          alt="HexaCreators"
          className="w-48 h-48 object-contain rounded-lg"
        />
        <img
          src="/img/minecraft-pelicula.png"
          alt="Minecraft la pelicula"
          className="w-48 h-48 object-contain rounded-lg"
        />
      </div>
    </section>
  );
}
