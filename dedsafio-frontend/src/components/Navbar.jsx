import { useState, useRef, useEffect } from "react"; // Hooks de React
import { useNavigate, useLocation } from "react-router-dom"; // Navegación y ubicación
import { ShoppingCart, Menu, X, Search } from "lucide-react"; // Íconos de lucide-react
import { useCart } from "../context/CartContext"; // Contexto del carrito

export default function Navbar({ usuario, onLogout, onLoginClick, onRegisterClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchMobileOpen, setSearchMobileOpen] = useState(false);

  const dropdownRef = useRef();
  const cartRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const [busqueda, setBusqueda] = useState("");

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== "") {
      navigate(`/merch?buscar=${encodeURIComponent(busqueda)}`);
      setBusqueda("");
      setSearchMobileOpen(false);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLoginDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
      if (!e.target.closest("#mobile-menu") && !e.target.closest("#menu-button")) {
        setMenuOpen(false);
      }
      if (
        !e.target.closest("#search-mobile") &&
        !e.target.closest("#search-icon-mobile") &&
        !e.target.closest("#search-desktop")
      ) {
        setSearchMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScrollOrNavigate = (target) => {
    if (target.startsWith("/")) {
      navigate(target);
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const totalCantidad = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="fixed top-0 left-0 w-full bg-zinc-900 shadow-md z-50">
      <div className="flex items-center justify-between w-full px-4 md:px-8 py-3">
        <div className="flex items-center space-x-6">
          <button
            id="menu-button"
            className="md:hidden text-white text-3xl mr-4"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
              setLoginDropdownOpen(false);
              setSearchMobileOpen(false);
            }}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <h1
            className="text-xl md:text-2xl font-['Press_Start_2P'] cursor-pointer flex space-x-1 text-white"
            onClick={() => handleScrollOrNavigate("inicio")}
          >
            <span className="letter" style={{ animationDelay: "0s" }}>D</span>
            <span className="letter" style={{ animationDelay: "-1s" }}>E</span>
            <span className="letter" style={{ animationDelay: "-2s" }}>D</span>
            <span className="letter" style={{ animationDelay: "-3s" }}>S</span>
            <span className="letter" style={{ animationDelay: "-4s" }}>A</span>
            <span className="letter" style={{ animationDelay: "-5s" }}>F</span>
            <span className="letter" style={{ animationDelay: "-6s" }}>I</span>
            <span className="letter" style={{ animationDelay: "-7s" }}>O</span>
          </h1>

          <nav className="hidden md:flex items-center space-x-6 font-poppins text-white">
            <button onClick={() => handleScrollOrNavigate("inicio")} className="hover:text-red-400">Inicio</button>
            <button onClick={() => handleScrollOrNavigate("/eventos")} className="hover:text-red-400">Eventos</button>
            <button onClick={() => navigate("/merch")} className="hover:text-red-400">Merch</button>
            <button onClick={() => handleScrollOrNavigate("comunidad")} className="hover:text-red-400">Comunidad</button>
            <button onClick={() => handleScrollOrNavigate("/contacto")} className="hover:text-red-400">Contacto</button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <form
            onSubmit={handleBuscar}
            className="hidden md:flex items-center bg-zinc-800 rounded px-3 py-1"
            style={{ "--width-of-input": "180px", "--height-of-input": "30px" }}
          >
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos..."
              required
              className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-44"
              id="search-desktop"
            />
            <button type="submit" aria-label="Buscar" className="text-white ml-2">
              <Search size={20} />
            </button>
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="text-white ml-1"
                aria-label="Limpiar búsqueda"
              >
                <X size={20} />
              </button>
            )}
          </form>

          <button
            id="search-icon-mobile"
            onClick={(e) => {
              e.stopPropagation();
              setSearchMobileOpen(!searchMobileOpen);
              setMenuOpen(false);
              setLoginDropdownOpen(false);
              setCartOpen(false);
            }}
            className="md:hidden text-white text-xl"
            aria-label="Buscar"
          >
            <Search />
          </button>

          <div className="relative" ref={cartRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCartOpen(!cartOpen);
                setLoginDropdownOpen(false);
                setMenuOpen(false);
                setSearchMobileOpen(false);
              }}
              className="relative text-white hover:text-red-400"
              title="Carrito de compras"
            >
              <ShoppingCart size={24} />
              {totalCantidad > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalCantidad}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 mt-2 w-72 max-h-96 bg-zinc-800 rounded shadow-lg p-4 overflow-y-auto z-50">
                <h4 className="text-white font-semibold mb-3">Carrito</h4>
                {cart.length === 0 ? (
                  <p className="text-gray-400">No hay productos en el carrito.</p>
                ) : (
                  <>
                    <ul className="mb-4 max-h-60 overflow-y-auto">
                      {cart.map((item) => (
                        <li key={item.id} className="flex justify-between mb-2 text-white">
                          <div>
                            <p className="font-semibold">{item.nombre}</p>
                            <p className="text-sm text-gray-300">Cantidad: {item.cantidad}</p>
                          </div>
                          <p>${item.precio * item.cantidad} MXN</p>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        navigate("/carrito");
                      }}
                      className="w-full bg-red-500 py-2 rounded hover:bg-red-600 text-white font-semibold"
                    >
                      Comprar
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="relative ml-4 hidden md:block" ref={dropdownRef}>
            {!usuario ? (
              <button
                onClick={() => {
                  onLoginClick();
                  setLoginDropdownOpen(false);
                  setMenuOpen(false);
                  setCartOpen(false);
                  setSearchMobileOpen(false);
                }}
                className="login-button text-white"
              >
                Iniciar Sesión
              </button>
            ) : (
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLoginDropdownOpen(!loginDropdownOpen);
                    setMenuOpen(false);
                    setCartOpen(false);
                    setSearchMobileOpen(false);
                  }}
                  className="login-buttonSesion text-white"
                >
                  {usuario.nombre}
                </button>

                {loginDropdownOpen && (
                  <ul className="absolute right-0 mt-1 w-40 bg-zinc-800 rounded shadow-lg z-50">
                    <li>
                      <button
                        onClick={() => {
                          setLoginDropdownOpen(false);
                          navigate("/perfil");
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-red-500 text-white"
                      >
                        Perfil
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onLogout();
                          setLoginDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-red-500 text-white"
                      >
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-zinc-900 w-full p-4 flex flex-col space-y-3 font-poppins text-white"
        >
          <button onClick={() => handleScrollOrNavigate("inicio")} className="hover:text-red-400 text-left">
            Inicio
          </button>
          <button onClick={() => handleScrollOrNavigate("/eventos")} className="hover:text-red-400 text-left">
            Eventos
          </button>
          <button onClick={() => navigate("/merch")} className="hover:text-red-400 text-left">
            Merch
          </button>
          <button onClick={() => handleScrollOrNavigate("comunidad")} className="hover:text-red-400 text-left">
            Comunidad
          </button>
          <button onClick={() => handleScrollOrNavigate("/contacto")} className="hover:text-red-400 text-left">
            Contacto
          </button>
          {!usuario ? (
            <>
              <button
                onClick={() => {
                  onLoginClick();
                  setMenuOpen(false);
                }}
                className="hover:text-red-400 text-left"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  onRegisterClick();
                  setMenuOpen(false);
                }}
                className="hover:text-red-400 text-left"
              >
                Registrarse
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/perfil");
                  setMenuOpen(false);
                }}
                className="hover:text-red-400 text-left"
              >
                Perfil
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="hover:text-red-400 text-left"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </nav>
      )}

      {searchMobileOpen && (
        <form
          onSubmit={handleBuscar}
          id="search-mobile"
          className="md:hidden bg-zinc-900 p-4 w-full flex items-center space-x-3"
        >
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos..."
            required
            className="flex-grow bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none"
            autoFocus
          />
          <button type="submit" aria-label="Buscar" className="text-white">
            <Search size={24} />
          </button>
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda("")}
              className="text-white"
              aria-label="Limpiar búsqueda"
            >
              <X size={24} />
            </button>
          )}
        </form>
      )}
    </header>
  );
}
