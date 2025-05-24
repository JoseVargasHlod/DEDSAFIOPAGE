import { useState, useEffect } from "react";
import PurchaseModal from "./PurchaseModal";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Merch() {
  // Estado para almacenar el producto seleccionado para mostrar en modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estado para almacenar la lista de productos obtenidos de la API
  const [products, setProducts] = useState([]);

  // URL base para obtener imágenes y datos
  const baseURL = "http://localhost:1337";

  // Función para agregar productos al carrito usando el contexto global
  const { addToCart } = useCart();

  // useEffect para cargar los productos al montar el componente
  useEffect(() => {
    fetch(`${baseURL}/api/productos?populate=imagen`)
      .then((res) => res.json())
      .then((data) => {
        // Procesar la respuesta para obtener solo los datos relevantes de cada producto
        const productosLimpios = data.data.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          descripcion: item.descripcion,
          stock: item.stock,
          imagenUrl:
            item.imagen.length > 0
              ? baseURL + item.imagen[0].formats.thumbnail.url // Obtener la miniatura si existe imagen
              : "",
        }));
        setProducts(productosLimpios); // Actualizar el estado con los productos limpios
      });
  }, []); // Solo se ejecuta una vez al montar el componente

  // Tomar solo los primeros 3 productos para mostrar como destacados
  const productosRelevantes = products.slice(0, 3);

  // Función que agrega un producto al carrito llamando al contexto
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section id="merch" className="py-16 bg-black text-center px-4">
      {/* Encabezado con título y enlace para ver todos los productos */}
      <div className="flex justify-between items-center w-full px-8 mb-1">
        <h3 className="text-3xl font-bold text-yellow-400">Merch Oficial</h3>
        <Link
          to="/merch"
          className="button3"
        >
          Ver todo
        </Link>
      </div>

      {/* Contenedor con scroll horizontal para mostrar productos destacados */}
      <div className="max-w-6xl mx-auto overflow-x-auto overflow-y-hidden pl-4">
        <div className="flex flex-row gap-6 px-4 min-w-full justify-start py-8">
          {productosRelevantes.map((product, index) => (
            <div
              key={product.id}
              className={`group bg-zinc-800 w-64 p-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between ${
                index === 0 ? "ml-4" : "" // Agregar margen izquierdo solo al primer producto
              }`}
            >
              {/* Imagen del producto */}
              <img
                src={product.imagenUrl}
                alt={product.nombre}
                className="rounded mb-4 object-cover w-full h-40"
              />

              {/* Información del producto: nombre, precio y descripción oculta */}
              <div className="mb-4 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-lg font-semibold text-white">{product.nombre}</h4>
                  <span className="text-red-400 text-sm">${product.precio} MXN</span>
                </div>
                <p className="text-zinc-300 text-sm hidden group-hover:block transition duration-300">
                  {product.descripcion} {/* Descripción visible solo al pasar el mouse */}
                </p>
              </div>

              {/* Botón para agregar el producto al carrito */}
              <div className="mt-auto flex justify-center">
                <button onClick={() => handleAddToCart(product)} className="button">
                  <span className="text">Agregar al carrito</span>
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
      </div>

      {/* Modal para compra, visible solo si hay producto seleccionado */}
      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)} // Cerrar modal
        />
      )}
    </section>
  );
}
