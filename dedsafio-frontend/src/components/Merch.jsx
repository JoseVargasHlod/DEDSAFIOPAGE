import { useState, useEffect } from "react";
import PurchaseModal from "./PurchaseModal";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Merch() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const baseURL = "http://localhost:1337";

  const { addToCart } = useCart();

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

  const productosRelevantes = products.slice(0, 3);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section id="merch" className="py-16 bg-black text-center px-4">
      {/* Header */}
      <div className="flex justify-between items-center w-full px-8 mb-1">
        <h3 className="text-3xl font-bold text-yellow-400">Merch Oficial</h3>
        <Link
          to="/merch"
          className="button3"
        >
          Ver todo
        </Link>
      </div>

{/* Scroll horizontal centrado */}
<div className="max-w-6xl mx-auto overflow-x-auto overflow-y-hidden pl-4">
  <div className="flex flex-row gap-6 px-4 min-w-full justify-start py-8">
    {productosRelevantes.map((product, index) => (
      <div
        key={product.id}
        className={`group bg-zinc-800 w-64 p-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between ${
          index === 0 ? "ml-4" : ""
        }`}
      >
              <img
                src={product.imagenUrl}
                alt={product.nombre}
                className="rounded mb-4 object-cover w-full h-40"
              />

              <div className="mb-4 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-lg font-semibold text-white">{product.nombre}</h4>
                  <span className="text-red-400 text-sm">${product.precio} MXN</span>
                </div>
                <p className="text-zinc-300 text-sm hidden group-hover:block transition duration-300">
                  {product.descripcion}
                </p>
              </div>

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

      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
