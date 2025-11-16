import { useState, useEffect } from "react";
import Calculator from "./components/Calculator";
import About from "./components/About";

function App() {
  // Usar pathname para rutas limpias: / y /about-me
  const getCurrentPath = () => window.location.pathname || '/';
  const [route, setRoute] = useState(getCurrentPath());

  useEffect(() => {
    // Escuchar cambios de historial (back/forward)
    const onPopState = () => setRoute(getCurrentPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path) => {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
      setRoute(path);
    }
  };

  return (
    <div className="m-8">
      <nav className="mb-4 flex gap-4">
  <button onClick={() => navigate('/')} className={route === '/' ? `px-3 py-1 bg-blue-600 text-white rounded hover:cursor-pointer` : `px-3 py-1 bg-gray-100 text-gray-800 rounded hover:cursor-pointer`}>Calculadora</button>
  <button onClick={() => navigate('/about-me')} className={route === '/about-me' ? `px-3 py-1 bg-blue-600 text-white rounded hover:cursor-pointer` : `px-3 py-1 bg-gray-100 text-gray-800 rounded hover:cursor-pointer`}>Sobre mí</button>
      </nav>

  {route === '/' && <Calculator />}
  {route === '/about-me' && <About />}
    </div>
  );
}

export default App;
