// Functional component for the landing page hero section
const Hero = () => {
  return (
    // Semantic section element for the hero
    <section className="hero" aria-labelledby="hero-heading">
      {/* Main heading for the hero section */}
      <h1 id="hero-heading" className="hero-title">
        Welcome to Our Property Management Services
      </h1>

      {/* Short description of the business */}
      <p className="hero-description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam eveniet
        error quaerat repudiandae officiis vel laudantium ut veniam dolorum!
        Eum?
      </p>

      {/* Tenant Portal CTA button */}
      <a href="/tenant" className="hero-cta">
        Tenant Portal
      </a>

      {/* Container for building images */}
      <div className="hero-images">
        {/* Placeholder images representing buildings */}
        <img
          src="https://via.placeholder.com/150"
          alt="Modern residential building"
          className="hero-image"
        />
        <img
          src="https://via.placeholder.com/150"
          alt="Commercial office building"
          className="hero-image"
        />
        <img
          src="https://via.placeholder.com/150"
          alt="Apartment complex exterior"
          className="hero-image"
        />
        <img
          src="https://via.placeholder.com/150"
          alt="Mixed-use property with shops and apartments"
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
