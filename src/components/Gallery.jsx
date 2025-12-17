const Gallery = () => {
  return (
    // The <section> element semantically groups the gallery content.
    <section className="gallery" aria-labelledby="gallery-heading">
      {/* Heading for the gallery section */}
      <h2 id="gallery-heading">Property Gallery</h2>

      {/* A container that holds all the images.
          Later, this can be turned into a carousel or grid layout. */}
      <div className="gallery-container">
        {/* Each image represents a property/building with descriptive alt text. */}
        <img
          src="https://picsum.photos/id/238/2560/1440"
          alt="Commercial building - NYC Skyline, Rockefeller Center"
        />
        <img
          src="https://picsum.photos/id/288/3888/2592"
          alt="Commercial high-rise buildings in Stockholm"
        />
        <img
          src="https://picsum.photos/id/242/1891/1280"
          alt="Commercial city buildings at night with railway"
        />
        <img
          src="https://picsum.photos/id/133/2742/1828"
          alt="Residential yellow garage building"
        />
        <img
          src="https://picsum.photos/id/208/2002/1280"
          alt="Residential old building with window grill"
        />
        <img
          src="https://picsum.photos/id/426/4272/2848"
          alt="Mountain village with residential buildings"
        />
      </div>
    </section>
  );
};

export default Gallery;
