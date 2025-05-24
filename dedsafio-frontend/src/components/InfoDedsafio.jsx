import { useEffect, useState } from "react";

export default function Countdown({ eventDate }) {
  // Estado para almacenar el tiempo restante (días, horas, minutos, segundos)
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    // Crear un intervalo que actualiza el tiempo restante cada segundo
    const interval = setInterval(() => {
      const now = new Date(); // Fecha y hora actual
      const diff = eventDate - now; // Diferencia en milisegundos entre evento y ahora

      if (diff <= 0) { 
        // Si el evento ya pasó, detener el intervalo y poner el contador en cero
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calcular días, horas, minutos y segundos restantes
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    // Limpiar intervalo cuando el componente se desmonta o cambia eventDate
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <section
      className="w-full h-96 rounded-lg shadow-lg text-white relative overflow-hidden flex flex-col justify-end"
      style={{
        backgroundImage: `url('/img/DedsafioBingo3.jpeg')`, // Imagen de fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa oscura semi-transparente para contraste */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenedor principal con z-index para quedar encima del overlay */}
      <div className="relative z-10 w-full flex justify-between items-end h-40">
        {/* Texto descriptivo en la parte inferior izquierda */}
        <div className="max-w-md text-left">
          <p className="text-lg font-semibold mb-1">¡Llega uno de los DEDsafios más esperados!</p>
          <p className="mb-4">Compra o renta la peli en tiendas digitales</p>
          <div className="text-sm sm:text-base space-y-1">
            <p>👥 <strong>60 participantes</strong></p>
            <p>📅 <strong>28 de MAYO</strong></p>
            <p>⌚ <strong>7:00 PM Hora CDMX</strong></p>
          </div>
        </div>

        {/* Contador digital en la parte inferior derecha */}
        <div className="text-4xl font-mono space-x-4 whitespace-nowrap">
          {/* Mostrar tiempo restante o "--" si no está definido */}
          <span>{timeLeft.days ?? "--"}d</span>
          <span>{timeLeft.hours ?? "--"}h</span>
          <span>{timeLeft.minutes ?? "--"}m</span>
          <span>{timeLeft.seconds ?? "--"}s</span>
        </div>
      </div>
    </section>
  );
}
