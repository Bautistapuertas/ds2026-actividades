import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import { AltaLibro } from './pages/AltaLibro';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/alta" element={<AltaLibro />} />
      </Routes>
    </Layout>
  );
}

export default App;
