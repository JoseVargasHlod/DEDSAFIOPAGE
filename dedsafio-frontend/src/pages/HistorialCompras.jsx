import { useEffect, useState } from 'react'; // Importa hooks para estado y efectos
import { useNavigate } from 'react-router-dom'; // Hook para navegación programática
import Navbar from '../components/Navbar'; // Componente Navbar
import Footer from '../components/Footer'; // Componente Footer

export default function HistorialCompras({ usuario, onLogout, onLoginClick, onRegisterClick }) {
  // Estado para almacenar las órdenes de compra
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    // Si no hay usuario, redirige a home
    if (!usuario) {
      navigate('/');
      return;
    }

    // Fetch para obtener órdenes del usuario desde API local
    fetch(`http://localhost:5000/api/orders/${usuario.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Órdenes obtenidas:", data);
        setOrdenes(data); // Actualiza el estado con órdenes
      })
      .catch(err => console.error('Error al cargar historial:', err));
  }, [usuario, navigate]); // Se ejecuta cuando cambia usuario o navigate

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      {/* Navbar con props de usuario y funciones para login/logout */}
      <Navbar
        usuario={usuario}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />

      {/* Contenedor principal con margen superior para no tapar Navbar */}
      <div className="grow bg-black pt-20 px-9">
        <h1 className="text-3xl font-bold mb-6 text-purple-500">Historial de Compras</h1>

        {/* Mensaje si no hay órdenes */}
        {ordenes.length === 0 ? (
          <p>No tienes compras registradas.</p>
        ) : (
          // Mapea cada orden para mostrarla en un bloque
          ordenes.map((orden, index) => (
            <div key={index} className="bg-zinc-800 p-4 rounded-xl mb-6 shadow">
              {/* Fecha de la compra formateada */}
              <h2 className="text-xl font-semibold mb-2">
                Compra del {new Date(orden.fecha).toLocaleDateString()}
              </h2>

              {/* Información de envío si existe */}
              {orden.shippingInfo && (
                <div className="text-sm mb-3">
                  <p><strong>Envío a:</strong> {orden.shippingInfo.nombre}</p>
                  <p>{orden.shippingInfo.direccion}, {orden.shippingInfo.ciudad}</p>
                  <p>Tel: {orden.shippingInfo.telefono}</p>
                </div>
              )}

              {/* Información método y datos de pago si existen */}
              {orden.metodoPago && (
                <div className="text-sm mb-3">
                  <p><strong>Método de pago:</strong> {orden.metodoPago}</p>
                  {orden.infoPago && (
                    <div className="text-xs text-gray-300">
                      <p>Titular: {orden.infoPago.titular}</p>
                      <p>Tarjeta: **** **** **** {orden.infoPago.numeroTarjeta.slice(-4)}</p>
                      <p>Expira: {orden.infoPago.expiracion}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Lista de productos comprados */}
              <ul className="mb-3">
                {orden.items.map((item, i) => (
                  <li key={i} className="flex justify-between border-b border-zinc-700 py-1">
                    <span>{item.nombre} (x{item.cantidad})</span>
                    <span>${item.precio * item.cantidad} MXN</span>
                  </li>
                ))}
              </ul>

              {/* Costo de envío, con valor por defecto 300 MXN */}
              <div className="text-right text-sm text-gray-400 mb-1">
                <p>Envío: ${orden.costoEnvio || 300} MXN</p>
              </div>

              {/* Total de la compra */}
              <p className="text-right text-lg font-bold">
                Total: ${orden.total} MXN
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
