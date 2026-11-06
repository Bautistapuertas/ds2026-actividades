import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import { AltaLibro } from './pages/AltaLibro';
import { BusquedaProvider } from './context/BusquedaContext';
import './App.css';

function App() {
  return (
    <BusquedaProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/alta" element={<AltaLibro />} />
        </Routes>
      </Layout>
    </BusquedaProvider>
  );
}

export default App;
