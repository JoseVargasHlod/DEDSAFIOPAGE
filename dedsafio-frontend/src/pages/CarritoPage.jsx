import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CarritoPage({ usuario, onLogout, onLoginClick, onRegisterClick, setUsuario }) {
  const { cart, actualizarCantidad, removeFromCart, limpiarCarrito, eliminarCarritoDelBackend, guardarOrden } = useCart();
  const navigate = useNavigate();

  const totalPrecio = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (cart.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Navbar
          usuario={usuario}
          onLogout={onLogout}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
        <main className="p-8 text-center flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">Tu carrito está vacío</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Volver a la tienda
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />

      <main className="pt-28 px-4 md:px-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-purple-300 text-center md:text-left">Carrito de Compras</h1>

        <ul className="mb-6 space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-700 pb-4 gap-4"
            >
              {/* Imagen, título y descripción */}
              <div className="flex items-center gap-4 md:max-w-xs">
                {item.imagenUrl && (
                  <img
                    src={item.imagenUrl}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-gray-400 truncate">{item.descripcion}</p>
                </div>
              </div>

              {/* Precio unitario */}
              <p className="text-gray-400 md:w-24 text-right">${item.precio} MXN c/u</p>

              {/* Cantidad y botón eliminar */}
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value))}
                  className="w-16 text-white bg-gray-800 border border-white rounded px-2 py-1"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>

              {/* Precio total por producto */}
              <p className="md:w-24 text-right">${item.precio * item.cantidad} MXN</p>
            </li>
          ))}
        </ul>

        {/* Total y botón */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <span className="text-xl font-semibold">Total: ${totalPrecio} MXN</span>
          <button
            onClick={() => navigate("/checkout")}
            className="button3 px-6 py-3 rounded text-white font-bold w-full md:w-auto"
          >
            Comprar
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
