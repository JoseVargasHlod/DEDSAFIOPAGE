// src/components/FullMerch.jsx

import { useEffect, useState } from "react"; // Hooks para estado y efectos
import { useCart } from "../context/CartContext"; // Contexto para manejo del carrito
import { useLocation } from "react-router-dom"; // Hook para obtener información de URL

export default function FullMerch() {
  const [products, setProducts] = useState([]); // Estado para guardar los productos
  const [orden, setOrden] = useState("relevancia"); // Estado para ordenar productos
  const baseURL = "http://localhost:1337"; // URL base del backend o API

  const { addToCart } = useCart(); // Función para agregar productos al carrito

  const location = useLocation(); // Obtiene la ubicación actual (URL)
  const queryParams = new URLSearchParams(location.search); // Parámetros de consulta en URL
  const terminoBusqueda = queryParams.get("buscar")?.toLowerCase() || ""; // Obtiene término de búsqueda (minúsculas)

  useEffect(() => {
    // Fetch para obtener productos desde API con imagen incluida
    fetch(`${baseURL}/api/productos?populate=imagen`)
      .then((res) => res.json())
      .then((data) => {
        // Mapeo de datos para limpiar y estructurar productos con info relevante
        const productosLimpios = data.data.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          descripcion: item.descripcion,
          stock: item.stock,
          imagenUrl:
            item.imagen.length > 0
              ? baseURL + item.imagen[0].formats.thumbnail.url // URL de miniatura
              : "",
        }));
        setProducts(productosLimpios); // Guarda productos en estado
      });
  }, []); // Se ejecuta solo al montar componente

  // Ordena los productos según el estado 'orden'
  const productosOrdenados = [...products].sort((a, b) => {
    if (orden === "menor") return a.precio - b.precio; // Precio ascendente
    if (orden === "mayor") return b.precio - a.precio; // Precio descendente
    return a.id - b.id; // Orden por ID (relevancia)
  });

  // Filtra los productos según el término de búsqueda en el nombre
  const productosFiltrados = productosOrdenados.filter((p) =>
    p.nombre.toLowerCase().includes(terminoBusqueda)
  );

  return (
    <section className="py-25 bg-black text-white">
      {/* Título principal */}
      <h3 className="text-3xl font-bold mb-6 text-yellow-500 px-4 max-w-7xl mx-auto">
        Merch Oficial
      </h3>

      {/* Selector para cambiar orden */}
      <div className="mb-6 text-right max-w-7xl mx-auto px-4">
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)} // Actualiza orden según selección
          className="bg-zinc-800 border border-zinc-700 text-white p-2 rounded"
        >
          <option value="relevancia">Más relevantes</option>
          <option value="menor">Menor precio</option>
          <option value="mayor">Mayor precio</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Mensaje si no hay productos */}
        {productosFiltrados.length === 0 ? (
          <p className="text-white px-4">No se encontraron productos.</p>
        ) : (
          // Grid responsive para mostrar productos
          <div
            className="
              grid 
              grid-flow-row
              gap-6
              auto-rows-auto
              sm:grid-cols-2 
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {/* Mapeo y renderizado de cada producto */}
            {productosFiltrados.map((p) => (
              <div
                key={p.id}
                className="group bg-zinc-800 p-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between"
              >
                {/* Imagen del producto */}
                <img
                  src={p.imagenUrl}
                  alt={p.nombre}
                  className="rounded mb-4 object-cover w-full h-40 sm:h-48 md:h-56"
                />
                {/* Nombre y precio */}
                <div className="mb-4 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-lg font-semibold text-white">{p.nombre}</h4>
                    <span className="text-red-400 text-sm">${p.precio} MXN</span>
                  </div>
                  {/* Descripción visible al pasar mouse */}
                  <p className="text-zinc-300 text-sm hidden group-hover:block transition duration-300">
                    {p.descripcion}
                  </p>
                </div>

                {/* Botón para agregar producto al carrito */}
                <div className="mt-auto flex justify-center">
                  <button
                    onClick={() => addToCart(p)}
                    className="button3 flex items-center justify-center gap-2 w-full py-2 rounded"
                  >
                    <span className="text-white font-semibold">Agregar al carrito</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#fff"
                        d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 6h15l-1.5 9H7.5L6 6Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
