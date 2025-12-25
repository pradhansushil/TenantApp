export default function AdminHeader({ user, handleLogout }) {
  return (
    <header className="admin-header" aria-label="Admin Dashboard Header">
      <h2 className="welcome-message">
        {/* Fallback to "Admin" if user email is not available */}
        Welcome, {user?.email}
      </h2>

      <nav>
        <a
          href="#logout"
          onClick={(e) => {
            // Prevent default anchor behavior to avoid page reload
            e.preventDefault();
            handleLogout();
          }}
          className="logout-link"
        >
          Logout
        </a>
      </nav>
    </header>
  );
}
