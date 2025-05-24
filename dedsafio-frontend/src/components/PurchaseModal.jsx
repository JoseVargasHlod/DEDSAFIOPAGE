// Componente modal para realizar la compra de un producto
export default function PurchaseModal({ product, onClose }) {
  return (
    // Fondo oscuro semitransparente que cubre toda la pantalla y centra el modal
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      
      {/* Contenedor del modal con estilos y texto en blanco */}
      <div className="bg-zinc-800 p-6 rounded-xl w-96 relative text-white">
        
        {/* Botón para cerrar el modal */}
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-xl">✖</button>
        
        {/* Título que muestra el nombre del producto a comprar */}
        <h3 className="text-2xl font-bold mb-4">Comprar: {product.name}</h3>
        
        {/* Imagen del producto */}
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
        
        {/* Precio del producto resaltado en rojo */}
        <p className="mb-2">Precio: <span className="text-red-400">${product.price} MXN</span></p>
        
        {/* Campos para que el usuario ingrese sus datos */}
        <input type="text" placeholder="Nombre completo" className="w-full mb-2 p-2 rounded bg-zinc-700" />
        <input type="email" placeholder="Correo electrónico" className="w-full mb-2 p-2 rounded bg-zinc-700" />
        <input type="text" placeholder="Dirección de envío" className="w-full mb-4 p-2 rounded bg-zinc-700" />
        
        {/* Botón para confirmar la compra */}
        <button className="w-full bg-red-500 py-2 rounded hover:bg-red-600">Confirmar compra</button>
      </div>
    </div>
  );
}
