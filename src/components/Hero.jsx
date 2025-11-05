// Functional component for the landing page hero section
const Hero = () => {
  return (
    // Semantic section element for the hero
    <section aria-labelledby="hero-heading">
      {/* Main heading for the hero section */}
      <h1 id="hero-heading">Welcome to Our Property Management Services</h1>

      {/* Short description of the business */}
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam eveniet
        error quaerat repudiandae officiis vel laudantium ut veniam dolorum!
        Eum?
      </p>

      {/* Container for building images */}
      <div>
        {/* Placeholder images representing buildings */}
        <img
          src="https://via.placeholder.com/150"
          alt="Modern residential building"
        />
        <img
          src="https://via.placeholder.com/150"
          alt="Commercial office building"
        />
        <img
          src="https://via.placeholder.com/150"
          alt="Apartment complex exterior"
        />
        <img
          src="https://via.placeholder.com/150"
          alt="Mixed-use property with shops and apartments"
        />
      </div>
    </section>
  );
};

export default Hero;
