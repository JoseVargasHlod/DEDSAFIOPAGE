export const eventosData = [
  {
    id: 1,
    title: "Dedsafio Minecraft 3",
    date: "2024-09-25",
    videoSrc: "/videos/dedsafio_minecraft3.mp4",
    summary: "La tercera entrega del Dedsafio con un mundo mas dedsafiante.",
    color: "green",
  },
  {
    id: 2,
    title: "Penitencia",
    date: "2024-10-29",
    videoSrc: "/videos/penitencia.mp4",
    summary: "En colaboracion con PipePunk, unete a esta aventura en la acual tendras que sobrevivir a las pruebas de Jigsaw",
    color: "red",
  },
  {
    id: 3,
    title: "Dedsafio Mortal Kombat",
    date: "2024-11-20",
    imageSrc: "/img/dedsafio_mortalkombat.jpeg",
    summary: "Torneo con streamers, ven a ver el ganador.",
    color: "yellow",
  },
  {
    id: 4,
    title: "Girl Power",
    date: "2025-03-21",
    imageSrc: "/img/Girl_Power.jpeg",
    summary: "Torneo de Marvel Rivals con puras chicas, ven a ver el ganador.",
    color: "pink",
  },
  {
    id: 5,
    title: "Bro Power",
    date: "2025-05-09",
    videoSrc: "/videos/bro_pwr.mp4",
    summary: "Ya les toco a las chicas ahora a los hombres. Torneo de Marvel Rivals.",
    color: "purple",
  },
];

export function getColorClass(color) {
  switch (color) {
    case "green":
      return "text-green-400";
    case "red":
      return "text-red-500";
    case "yellow":
      return "text-yellow-400";
    case "pink":
      return "text-pink-400";
    case "purple":
      return "text-purple-400";
    default:
      return "text-white";
  }
}
