export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-content">
        {/* Company Info Section */}
        <div className="footer-section">
          <h3 className="footer-heading">My Property</h3>
          <p className="footer-text">
            Prime commercial and residential spaces at a high-traffic location.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4 className="footer-subheading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tenant-portal">Tenant Portal</a>
            </li>
            <li>
              <a href="/admin-login">Admin Login</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4 className="footer-subheading">Contact</h4>
          <ul className="footer-contact">
            <li>📍 Aalu Maila Chowk Pokhara-8</li>
            <li>📞 984-555-1234</li>
            <li>✉️ someuser@example.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} My Property. All rights reserved.</p>
      </div>
    </footer>
  );
}
