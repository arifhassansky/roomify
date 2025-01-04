import { useState } from "react";
import { Helmet } from "react-helmet";

const Gallery = () => {
  const categories = ["All", "Island", "Restaurant", "Spa", "Swimming Pool"];
  const images = [
    {
      id: 1,
      category: "Restaurant",
      url: "https://i.ibb.co.com/SPF0fDZ/1.jpg",
    },
    {
      id: 2,
      category: "Restaurant",
      url: "https://i.ibb.co.com/TvKkxhw/2.jpg",
    },
    {
      id: 3,
      category: "Spa",
      url: "https://i.ibb.co.com/Bwpp1JD/3.jpg",
    },
    {
      id: 4,
      category: "Swimming Pool",
      url: "https://i.ibb.co.com/ScpKnKr/4.jpg",
    },
    {
      id: 5,
      category: "Island",
      url: "https://i.ibb.co.com/WDdkQ3Y/5.jpg",
    },
    {
      id: 6,
      category: "Spa",
      url: "https://i.ibb.co.com/kqkccHS/6.jpg",
    },
    {
      id: 7,
      category: "Island",
      url: "https://i.ibb.co.com/pXSWhJT/7.jpg",
    },
    {
      id: 8,
      category: "Swimming Pool",
      url: "https://i.ibb.co.com/jhrQ2wZ/8.jpg",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((image) => image.category === activeCategory);

  return (
    <div className="p-6 py-28 w-11/12 mx-auto">
      <Helmet>
        <title>Gallery | Roomify</title>
      </Helmet>
      {/* Category Buttons */}
      <div className="flex flex-wrap mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 mx-2 mb-2 text-sm font-medium border rounded-md ${
              activeCategory === category
                ? " bg-primary text-white"
                : "bg-secondary text-black"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="overflow-hidden group relative">
            <img
              src={image.url}
              className="w-full h-96 hover:h-80 duration-300 object-cover rounded-md shadow-md"
            />
            <h2 className="absolute hidden bottom-0 duration-300 left-0 right-0 text-center group-hover:block text-3xl my-4 font-bold text-primary transform translate-y-1/2">
              {image.category}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
