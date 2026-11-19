import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListaPontos from './pages/ListaPontos';
import CadastroPonto from './pages/CadastroPonto';
import DetalhePonto from './pages/DetalhePonto';
import EditarPonto from './pages/EditarPonto';
import NaoEncontrado from './pages/NaoEncontrado';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/pontos" replace />} />
          <Route path="/pontos" element={<ListaPontos />} />
          <Route path="/pontos/novo" element={<CadastroPonto />} />
          <Route path="/pontos/:id" element={<DetalhePonto />} />
          <Route path="/pontos/:id/editar" element={<EditarPonto />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
      <footer className="site-footer">GeoPoints · Desenvolvimento Frontend · Atitus Educação</footer>
    </>
  );
}
export default App;
