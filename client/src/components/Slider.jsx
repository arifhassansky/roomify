import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  const images = [
    {
      id: 1,
      image1: "https://i.ibb.co/vZGx6r2/slide-1.jpg",
      image2: "https://i.ibb.co/ckbRmw8/hotel.jpg",
      name: "Luxury Suite",
      quote:
        "Experience the epitome of comfort with our luxury suites. Equipped with modern and king-size bed, and a breathtaking view, it's perfect and comfortable for a relaxing getaway every room.",
    },
    {
      id: 2,
      image1: "https://i.ibb.co/s1bmP9m/slider-1.webp",
      image2: "https://i.ibb.co/QYBF7xH/caption.jpg",
      name: "Deluxe Room",
      quote:
        "Relax and unwind in our deluxe rooms, designed for both comfort and style. With plush furnishings, modern amenities, and an expansive view, these rooms offer an ideal retreat for both work and leisure.",
    },
    {
      id: 3,
      image1: "https://i.ibb.co/vYS8jpz/slide-3.jpg",
      image2:
        "https://i.ibb.co/kG44fxh/About-the-best-luxury-hotels-palaces.webp",
      name: "Ocean View Room",
      quote:
        "Our Ocean View Room offers a serene escape with floor-to-ceiling ocean vistas. Whether you're relaxing or working, enjoy the natural beauty right outside your window, bringing peace and tranquility to your stay.",
    },
    {
      id: 4,
      image1: "https://i.ibb.co/WHtYPsq/slide-4.jpg",
      image2: "https://i.ibb.co/1XqcHrx/960x0.webp",
      name: "Standard Room",
      quote:
        "Comfort and affordability meet in our Standard Room. Featuring cozy bedding, contemporary decor, and essential amenities, this room provides everything you need for a restful stay without compromising on quality",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex justify-center items-center">
      {images.map((item, itemIndex) => {
        const { id, image1, image2, name, quote } = item;

        return (
          itemIndex === index && (
            <div
              key={id}
              className="absolute inset-0 flex items-center justify-center text-center text-white bg-black bg-opacity-50 transition-all duration-700 ease-in-out opacity-100"
            >
              {/* Make sure the image is visible with proper z-index and opacity */}
              <img
                src={image1}
                alt={name}
                className="absolute inset-0 object-cover w-full h-full z-0 transition-opacity duration-700 ease-in-out opacity-100 brightness-50"
              />
              <div className="flex flex-row justify-between items-center space-x-8 px-6 mt-12 md:mt-0 z-10">
                <div className="space-y-4 text-center">
                  <h3 className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-4">
                    {name}
                    <img
                      className="w-16 h-16 rounded-full"
                      src={image2}
                      alt={`${name} flag`}
                    />
                  </h3>
                  <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {quote}
                  </p>
                  <Link
                    to="/rooms"
                    className="bg-primary hover:bg-secondary hover:text-black text-white text-lg btn px-16 border-none"
                  >
                    Book Now!
                  </Link>
                </div>
              </div>
            </div>
          )
        );
      })}
    </section>
  );
};

export default Slider;
