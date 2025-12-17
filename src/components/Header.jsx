import { Link } from "react-router-dom";

// Define the Header functional component
const Header = () => {
  return (
    // <header> is semantic HTML for page header
    <header
      className="site-header"
      role="banner"
      aria-label="Property Management Web App Header"
    >
      {/* <nav> represents the navigation bar */}
      <nav className="site-nav" role="navigation" aria-label="Main Navigation">
        {/* Logo/Brand name */}
        <div className="nav-brand">
          <Link to="/">Property Management</Link>
        </div>

        {/* <ul> is a list of navigation links */}
        <ul className="nav-links">
          {/* Each <li> contains a Link to a route */}
          <li className="nav-item">
            {/* Use React Router Link instead of <a> for SPA navigation */}
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tenant-portal" className="nav-link">
              Tenant Portal
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-login" className="nav-link nav-link-cta">
              Admin Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
