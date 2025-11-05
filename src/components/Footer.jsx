export default function Footer() {
  return (
    <footer className="container" role="contentinfo">
      <p>
        © {new Date().getFullYear()} My Property.{" "}
        <span aria-hidden="true">•</span>
      </p>
    </footer>
  );
}
