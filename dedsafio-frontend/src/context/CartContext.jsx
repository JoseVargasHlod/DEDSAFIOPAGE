import { createContext, useContext, useState, useEffect } from 'react';

// Creamos un contexto para el carrito de compras
const CartContext = createContext();

// Componente proveedor del contexto que maneja el estado y lógica del carrito
export function CartProvider({ children, usuario }) {
  // Definimos la clave de almacenamiento en localStorage según si hay usuario o es anónimo
  const storageKey = usuario ? `cart-${usuario.id}` : 'cart-anonimo';

  // Estado local del carrito, se inicializa leyendo localStorage o con arreglo vacío
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  // Efecto para cargar y sincronizar el carrito del backend cuando cambia el usuario
  useEffect(() => {
    async function fetchCart() {
      if (usuario) {
        // Obtenemos carrito anónimo previo para fusionarlo con backend
        const anonCartStored = localStorage.getItem('cart-anonimo');
        const anonCart = anonCartStored ? JSON.parse(anonCartStored) : [];

        try {
          // Pedimos carrito guardado en backend por usuario
          const res = await fetch(`http://localhost:5000/api/cart/${usuario.id}`);
          let backendCart = [];
          if (res.ok) {
            const data = await res.json();
            backendCart = data.items || [];
          }

          // Fusionamos carrito backend con el anónimo, sumando cantidades de productos repetidos
          const merged = [...backendCart];
          anonCart.forEach((item) => {
            const exist = merged.find(p => p.id === item.id);
            if (exist) {
              exist.cantidad += item.cantidad;
            } else {
              merged.push(item);
            }
          });

          setCart(merged);

          // Guardamos carrito fusionado en backend
          await fetch(`http://localhost:5000/api/cart/${usuario.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: merged }),
          });

          // Limpiamos carrito anónimo ya que fue fusionado
          localStorage.removeItem('cart-anonimo');
        } catch (error) {
          console.error('Error cargando carrito:', error);
          setCart([]);
        }
      } else {
        // Si no hay usuario, solo cargamos carrito anónimo de localStorage
        const stored = localStorage.getItem('cart-anonimo');
        setCart(stored ? JSON.parse(stored) : []);
      }
    }
    fetchCart();
  }, [usuario]);

  // Efecto para guardar carrito en backend y localStorage cuando cambia carrito o usuario
  useEffect(() => {
    async function saveCart() {
      if (usuario) {
        try {
          // Guardamos carrito en backend
          await fetch(`http://localhost:5000/api/cart/${usuario.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart }),
          });
          // También guardamos en localStorage con clave específica de usuario
          localStorage.setItem(storageKey, JSON.stringify(cart));
        } catch (error) {
          console.error('Error guardando carrito:', error);
        }
      } else {
        // Si es anónimo, guardamos carrito en localStorage con clave 'cart-anonimo'
        localStorage.setItem('cart-anonimo', JSON.stringify(cart));
      }
    }
    saveCart();
  }, [cart, usuario, storageKey]);

  // Función para agregar un producto al carrito (aumenta cantidad si ya existe)
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...product, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito por id
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Función para actualizar la cantidad de un producto (mínimo 1)
  const actualizarCantidad = (id, cantidad) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: cantidad > 0 ? cantidad : 1 } : p
      )
    );
  };

  // Función para limpiar el carrito completamente
  const clearCart = () => {
    setCart([]);
  };

  // Función para eliminar el carrito del backend (usado quizás al hacer logout)
  const eliminarCarritoDelBackend = async () => {
    if (!usuario) return;
    try {
      await fetch(`http://localhost:5000/api/cart/${usuario.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error eliminando carrito en backend:', error);
    }
  };

  // Función para guardar la orden en backend, recibe info de envío y pago
  const guardarOrden = async (shippingInfo) => {
    if (!usuario || cart.length === 0) {
      console.warn('No se puede guardar orden: usuario o carrito vacío');
      return;
    }

    try {
      // Calculamos el total de la orden sumando precio * cantidad de cada producto
      const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

      // Enviamos petición POST a la API de órdenes con usuario, items, total e info de envío y pago
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: usuario.id,
          items: cart,
          total,
          shippingInfo: {
            nombre: shippingInfo.nombre,
            direccion: shippingInfo.direccion,
            ciudad: shippingInfo.ciudad,
            telefono: shippingInfo.telefono,
          },
          metodoPago: shippingInfo.metodoPago,
          infoPago: {
            titular: shippingInfo.titular,
            numeroTarjeta: shippingInfo.numeroTarjeta,
            expiracion: shippingInfo.expiracion,
          },
        }),
      });

      const data = await res.json();
      console.log('Orden guardada:', data);

      if (!res.ok || !data.success) {
        console.error('Error en guardarOrden:', data);
        return;
      }

      // (Aquí podría ir la lógica para actualizar stock en backend)

      // Limpiamos carrito y eliminamos localStorage tras guardar la orden
      setCart([]);
      localStorage.removeItem(storageKey);

    } catch (error) {
      console.error('Error general en guardarOrden:', error);
    }
  };

  // Proveemos el contexto con las funciones y el estado para que los hijos lo usen
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        limpiarCarrito: clearCart,
        actualizarCantidad,
        eliminarCarritoDelBackend,
        guardarOrden,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar el contexto en componentes hijos
export function useCart() {
  return useContext(CartContext);
}
