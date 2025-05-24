import { useState } from 'react';  // Hook para manejar estado local
import { useCart } from '../context/CartContext';  // Contexto para manejar carrito de compras
import { useNavigate } from 'react-router-dom';  // Hook para navegación programática
import Navbar from '../components/Navbar';  // Componente Navbar
import Footer from '../components/Footer';  // Componente Footer
import LoginModal from '../components/LoginModal';  // Modal para login
import Registro from '../components/Registro';  // Modal para registro de usuario

export default function CheckoutPage({ usuario, onLogout, setUsuario }) {
  // Extraemos funciones y datos del carrito desde el contexto
  const { cart, actualizarCantidad, removeFromCart, guardarOrden } = useCart();
  const navigate = useNavigate();  // Hook para redirigir entre rutas

  // Estado para guardar datos del formulario de envío y pago
  const [shippingInfo, setShippingInfo] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: '',
  });

  // Estados para mostrar u ocultar modales de login y registro
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Función para actualizar shippingInfo al cambiar inputs
  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calcula total carrito más envío fijo (300)
    const totalCarrito = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalFinal = totalCarrito + 300;

    // Validaciones básicas de número de tarjeta, CVV y expiración
    if (
      !/^\d{16}$/.test(shippingInfo.numeroTarjeta) ||
      !/^\d{3,4}$/.test(shippingInfo.cvv) ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(shippingInfo.expiracion)
    ) {
      alert('Por favor, verifica los datos de la tarjeta.');
      return;
    }

    // Guarda la orden y redirige a historial
    await guardarOrden({ ...shippingInfo, total: totalFinal });
    navigate('/historial');
  };

  // Si el carrito está vacío muestra un mensaje y botón para volver a la tienda
  if (cart.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Navbar
          usuario={usuario}
          onLogout={onLogout}
          onLoginClick={() => setShowLogin(true)}
          onRegisterClick={() => setShowRegister(true)}
        />
        <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-2xl font-bold mb-4">No tienes productos en tu carrito</h2>
          <button onClick={() => navigate('/')} className="volver">
            Ir a la tienda
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // Si hay productos, muestra la página de checkout completa
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar con funciones para login y registro */}
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Contenido principal dividido en dos columnas */}
      <main className="grow bg-black text-white flex flex-col md:flex-row items-start justify-center gap-6 px-4 md:px-10 lg:px-20 py-30">
        {/* Columna izquierda: resumen del carrito */}
        <div className="w-full md:w-1/2 max-w-md bg-gray-900 p-6 rounded shadow text-white">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">Resumen del carrito</h2>

          {/* Lista productos con imagen, nombre, cantidad editable y botón eliminar */}
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 py-4 gap-4">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <img src={item.imagenUrl} alt={item.nombre} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-gray-400">Precio unitario: ${item.precio} MXN</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Input para cambiar cantidad */}
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value))}
                  className="w-16 text-white bg-gray-800 border border-white rounded px-2 py-1"
                />
                {/* Botón para eliminar producto del carrito */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>

              {/* Precio total del producto */}
              <p className="text-right font-semibold">${item.precio * item.cantidad} MXN</p>
            </div>
          ))}

          {/* Total general + costo de envío fijo */}
          <div className="mt-4 text-right font-bold text-xl">
            Total: ${cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0) + 300} MXN
          </div>
        </div>

        {/* Columna derecha: formulario de envío y pago */}
        <div className="w-full md:w-1/2 max-w-md p-6 bg-white text-black rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Datos de Envío y Pago</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Inputs para dirección */}
            <input name="nombre" placeholder="Nombre completo" onChange={handleChange} required className="w-full border p-2" />
            <input name="direccion" placeholder="Dirección completa" onChange={handleChange} required className="w-full border p-2" />
            <input name="ciudad" placeholder="Ciudad" onChange={handleChange} required className="w-full border p-2" />
            <input name="telefono" placeholder="Teléfono" onChange={handleChange} required className="w-full border p-2" />

            {/* Selección método de pago */}
            <h3 className="text-lg font-semibold mt-4">Método de pago</h3>
            <select name="metodoPago" onChange={handleChange} required className="w-full border p-2">
              <option value="">Selecciona método de pago</option>
              <option value="tarjeta_debito">Tarjeta de Débito</option>
              <option value="tarjeta_credito">Tarjeta de Crédito</option>
            </select>

            {/* Inputs datos de tarjeta con formateo y validación */}
            <input
              name="titular"
              placeholder="Nombre del titular"
              onChange={handleChange}
              required
              className="w-full border p-2"
            />

            <input
              name="numeroTarjeta"
              placeholder="Número de tarjeta (16 dígitos)"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // solo números
                if (value.length <= 16) {
                  setShippingInfo({ ...shippingInfo, numeroTarjeta: value });
                }
              }}
              value={
                shippingInfo.numeroTarjeta
                  ? shippingInfo.numeroTarjeta.replace(/\d{12}(\d{4})/, '•••• •••• •••• $1')
                  : ''
              }
              required
              className="w-full border p-2"
            />

            <div className="flex gap-2">
              <input
                name="expiracion"
                placeholder="MM/AA"
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d]/g, '');
                  if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  setShippingInfo({ ...shippingInfo, expiracion: value });
                }}
                value={shippingInfo.expiracion}
                required
                className="w-1/2 border p-2"
                pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                title="Formato: MM/AA"
              />

              <input
                name="cvv"
                placeholder="CVV"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 4) {
                    setShippingInfo({ ...shippingInfo, cvv: value });
                  }
                }}
                value={shippingInfo.cvv || ''}
                required
                className="w-1/2 border p-2"
                pattern="^\d{3,4}$"
                title="CVV de 3 o 4 dígitos"
              />
            </div>

            {/* Botón para confirmar pedido */}
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
              Confirmar pedido
            </button>
          </form>

          {/* Costo fijo de envío */}
          <div className="mt-4 font-semibold text-lg">
            Costo de envío: $300 MXN
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modales de login y registro */}
      {showLogin && (
        <LoginModal
          onRegisterClick={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
          onLogin={(userData) => {
            setUsuario(userData);
            localStorage.setItem('usuario', JSON.stringify(userData));
            setShowLogin(false);
          }}
        />
      )}

      {showRegister && (
        <Registro
          onLoginClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onClose={() => setShowRegister(false)}
          onRegister={(userData) => {
            setUsuario(userData);
            localStorage.setItem('usuario', JSON.stringify(userData));
            setShowRegister(false);
          }}
        />
      )}
    </div>
  );
}
