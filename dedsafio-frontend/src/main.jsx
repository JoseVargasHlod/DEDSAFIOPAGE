// Importa StrictMode de React para detectar problemas en la aplicación en modo estricto
import { StrictMode } from 'react';

// Importa createRoot para renderizar la aplicación en el DOM (React 18+)
import { createRoot } from 'react-dom/client';

// Importa los estilos globales de la aplicación
import './index.css';

// Importa el componente principal de la aplicación
import App from './App.jsx';

// Importa el proveedor del contexto del carrito de compras para manejar estado global del carrito
import { CartProvider } from './context/CartContext'; // Asegúrate de que la ruta sea correcta

// Renderiza la aplicación dentro del elemento con id 'root' en modo estricto, envolviendo App con el proveedor del carrito
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
