import { useEffect, useState } from "react";

export default function Countdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <section
      className="w-full h-96 rounded-lg shadow-lg text-white relative overflow-hidden flex flex-col justify-end"
      style={{
        backgroundImage: `url('/img/DedsafioBingo3.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenedor flexible para texto y contador pegados a los bordes */}
      <div className="relative z-10 w-full flex justify-between items-end h-40">
        {/* Texto abajo a la izquierda sin padding */}
        <div className="max-w-md text-left">

          <p className="text-lg font-semibold mb-1">¡Llega uno de los DEDsafios más esperados!</p>

          <p className="mb-4">Compra o renta la peli en tiendas digitales</p>

          <div className="text-sm sm:text-base space-y-1">
            <p>👥 <strong>60 participantes</strong></p>
            <p>📅 <strong>28 de MAYO</strong></p>
            <p>⌚ <strong>7:00 PM Hora CDMX</strong></p>
          </div>
        </div>

        {/* Contador abajo a la derecha sin padding */}
        <div className="text-4xl font-mono space-x-4 whitespace-nowrap">
          <span>{timeLeft.days ?? "--"}d</span>
          <span>{timeLeft.hours ?? "--"}h</span>
          <span>{timeLeft.minutes ?? "--"}m</span>
          <span>{timeLeft.seconds ?? "--"}s</span>
        </div>
      </div>
    </section>
  );
}
