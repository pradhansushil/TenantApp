import { Link } from "react-router-dom";

// Define the Header functional component
const Header = () => {
  return (
    // <header> is semantic HTML for page header
    <header role="banner" aria-label="Property Management Web App Header">
      {/* <nav> represents the navigation bar */}
      <nav role="navigation" aria-label="Main Navigation">
        {/* <ul> is a list of navigation links */}
        <ul>
          {/* Each <li> contains a Link to a route */}
          <li>
            {/* Use React Router Link instead of <a> for SPA navigation */}
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tenant-portal">Tenant Portal</Link>
          </li>
          <li>
            <Link to="/admin-login">Admin Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Export the component so it can be imported elsewhere
export default Header;
