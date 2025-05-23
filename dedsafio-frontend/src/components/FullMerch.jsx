import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

export default function FullMerch() {
  const [products, setProducts] = useState([]);
  const [orden, setOrden] = useState("relevancia");
  const baseURL = "http://localhost:1337";

  const { addToCart } = useCart();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const terminoBusqueda = queryParams.get("buscar")?.toLowerCase() || "";

  useEffect(() => {
    fetch(`${baseURL}/api/productos?populate=imagen`)
      .then((res) => res.json())
      .then((data) => {
        const productosLimpios = data.data.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          descripcion: item.descripcion,
          stock: item.stock,
          imagenUrl:
            item.imagen.length > 0
              ? baseURL + item.imagen[0].formats.thumbnail.url
              : "",
        }));
        setProducts(productosLimpios);
      });
  }, []);

  const productosOrdenados = [...products].sort((a, b) => {
    if (orden === "menor") return a.precio - b.precio;
    if (orden === "mayor") return b.precio - a.precio;
    return a.id - b.id;
  });

  const productosFiltrados = productosOrdenados.filter((p) =>
    p.nombre.toLowerCase().includes(terminoBusqueda)
  );

  return (
    <section className="py-25 bg-black text-white">
      <h3 className="text-3xl font-bold mb-6 text-yellow-500 px-4 max-w-7xl mx-auto">
        Merch Oficial
      </h3>

      <div className="mb-6 text-right max-w-7xl mx-auto px-4">
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 text-white p-2 rounded"
        >
          <option value="relevancia">Más relevantes</option>
          <option value="menor">Menor precio</option>
          <option value="mayor">Mayor precio</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {productosFiltrados.length === 0 ? (
          <p className="text-white px-4">No se encontraron productos.</p>
        ) : (
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
            {productosFiltrados.map((p) => (
              <div
                key={p.id}
                className="group bg-zinc-800 p-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between"
              >
                <img
                  src={p.imagenUrl}
                  alt={p.nombre}
                  className="rounded mb-4 object-cover w-full h-40 sm:h-48 md:h-56"
                />
                <div className="mb-4 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-lg font-semibold text-white">{p.nombre}</h4>
                    <span className="text-red-400 text-sm">${p.precio} MXN</span>
                  </div>
                  <p className="text-zinc-300 text-sm hidden group-hover:block transition duration-300">
                    {p.descripcion}
                  </p>
                </div>

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
