import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink className="brand" to="/pontos" aria-label="GeoPoints - início">
          <span className="brand-mark">G</span>
          <span>GeoPoints</span>
        </NavLink>
        <nav className="nav-links" aria-label="Navegação principal">
          <NavLink to="/pontos" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Pontos
          </NavLink>
          <NavLink to="/pontos/novo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Cadastrar ponto
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
