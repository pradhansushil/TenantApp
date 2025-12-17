export default function AdminHeader({ user, handleLogout }) {
  return (
    // Semantic header element for accessibility
    <header className="admin-header" aria-label="Admin Dashboard Header">
      {/* Display a welcome message with the admin's email */}
      <h2 className="welcome-message">Welcome, {user?.email || "Admin"}</h2>

      {/* Logout link (not a button) that calls handleLogout when clicked */}
      <nav>
        <a
          href="#logout"
          onClick={(e) => {
            e.preventDefault(); // Prevent page refresh
            handleLogout(); // Trigger the logout function from Admin.jsx
          }}
          className="logout-link"
        >
          Logout
        </a>
      </nav>
    </header>
  );
}
