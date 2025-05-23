
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children, usuario }) {
  const storageKey = usuario ? `cart-${usuario.id}` : 'cart-anonimo';

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    async function fetchCart() {
      if (usuario) {
        const anonCartStored = localStorage.getItem('cart-anonimo');
        const anonCart = anonCartStored ? JSON.parse(anonCartStored) : [];

        try {
          const res = await fetch(`http://localhost:5000/api/cart/${usuario.id}`);
          let backendCart = [];
          if (res.ok) {
            const data = await res.json();
            backendCart = data.items || [];
          }

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

          await fetch(`http://localhost:5000/api/cart/${usuario.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: merged }),
          });

          localStorage.removeItem('cart-anonimo');
        } catch (error) {
          console.error('Error cargando carrito:', error);
          setCart([]);
        }
      } else {
        const stored = localStorage.getItem('cart-anonimo');
        setCart(stored ? JSON.parse(stored) : []);
      }
    }
    fetchCart();
  }, [usuario]);

  useEffect(() => {
    async function saveCart() {
      if (usuario) {
        try {
          await fetch(`http://localhost:5000/api/cart/${usuario.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart }),
          });
          localStorage.setItem(storageKey, JSON.stringify(cart));
        } catch (error) {
          console.error('Error guardando carrito:', error);
        }
      } else {
        localStorage.setItem('cart-anonimo', JSON.stringify(cart));
      }
    }
    saveCart();
  }, [cart, usuario, storageKey]);

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

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const actualizarCantidad = (id, cantidad) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: cantidad > 0 ? cantidad : 1 } : p
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

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

  //////////////////////// yA FUNCIONA STRAPI

const guardarOrden = async (shippingInfo) => { // ✅ ahora acepta shippingInfo
  if (!usuario || cart.length === 0) {
    console.warn('No se puede guardar orden: usuario o carrito vacío');
    return;
  }

  try {
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

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
      }}),
    });

    const data = await res.json();
    console.log('🧾 Orden guardada:', data);

    if (!res.ok || !data.success) {
      console.error('⚠️ Error en guardarOrden:', data);
      return;
    }

    // ... (Tu lógica de actualización de stock en Strapi permanece igual)

    // (Opcional) Limpia el carrito después de guardar orden
    setCart([]);
    localStorage.removeItem(storageKey);

  } catch (error) {
    console.error('❌ Error general en guardarOrden:', error);
  }
};

return(
// (No olvides dejar el value del contexto así:)
<CartContext.Provider
  value={{
    cart,
    addToCart,
    removeFromCart,
    limpiarCarrito: clearCart,
    actualizarCantidad,
    eliminarCarritoDelBackend,
    guardarOrden, // ✅ exportamos la función modificada
  }}
>
  {children}
</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}


