// Import images from the local images folder
import image1 from "../images/Hallway-view.png";
import image2 from "../images/Outside-view-of-mixed.png";
import image3 from "../images/Outside-view.png";
import image4 from "../images/Two-story-commercial.png";

// Functional component for the landing page hero section
const Hero = () => {
  // Add this console log to check if images are importing
  console.log("Image paths:", { image1, image2, image3, image4 });

  return (
    // Semantic section element for the hero
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-content">
        {/* Text content on the left/center */}
        <div className="hero-text">
          {/* Main heading for the hero section */}
          <h1 id="hero-heading" className="hero-title">
            Welcome to Our Property Management Services
          </h1>

          {/* Short description of the business */}
          <p className="hero-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
            eveniet error quaerat repudiandae officiis vel laudantium ut veniam
            dolorum! Eum?
          </p>

          {/* Tenant Portal CTA button */}
          <a href="/tenant" className="hero-cta">
            Tenant Portal
          </a>
        </div>

        {/* Container for building images - overlapping with text */}
        <div className="hero-images">
          {/* Local images representing your brother's properties */}
          <img
            src={image1}
            alt="Interior hallway view of property"
            className="hero-image hero-image-1"
            onError={(e) => console.error("Image 1 failed to load:", e)}
          />
          <img
            src={image2}
            alt="Outside view of mixed-use property"
            className="hero-image hero-image-2"
            onError={(e) => console.error("Image 2 failed to load:", e)}
          />
          <img
            src={image3}
            alt="Exterior view of property"
            className="hero-image hero-image-3"
            onError={(e) => console.error("Image 3 failed to load:", e)}
          />
          <img
            src={image4}
            alt="Two-story commercial building"
            className="hero-image hero-image-4"
            onError={(e) => console.error("Image 4 failed to load:", e)}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
