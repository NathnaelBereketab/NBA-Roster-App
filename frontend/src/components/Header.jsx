import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="app-header">
      <Link to="/" className="header-link">
        <h1 className="header-title">
          <span className="header-icon">🏀</span>
          NBA Teams & Conferences
        </h1>
      </Link>
      {!isHome && (
        <Link to="/" className="header-home-link">
          ← Home
        </Link>
      )}
    </header>
  );
}

export default Header;
