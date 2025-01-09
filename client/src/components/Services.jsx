import {
  FaCar,
  FaWifi,
  FaUtensils,
  FaHandsHelping,
  FaTshirt,
  FaSwimmingPool,
} from "react-icons/fa";

const services = [
  {
    icon: <FaCar />,
    title: "Airport Pick-up Service",
    description:
      "Enjoy a seamless journey with our convenient airport pick-up and drop-off services.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Housekeeper Services",
    description:
      "Our professional housekeeping team ensures your stay is spotless and comfortable.",
  },
  {
    icon: <FaWifi />,
    title: "Wifi & Internet",
    description:
      "Stay connected with high-speed internet access throughout the property.",
  },
  {
    icon: <FaTshirt />,
    title: "Laundry Services",
    description:
      "Take advantage of our quick and reliable laundry services for a worry-free stay.",
  },
  {
    icon: <FaUtensils />,
    title: "Breakfast in Bed",
    description:
      "Start your day with a delicious breakfast served right in the comfort of your room.",
  },
  {
    icon: <FaSwimmingPool />,
    title: "Swimming Pool",
    description:
      "Relax and unwind in our pristine swimming pool, perfect for a refreshing dip.",
  },
];

const Services = () => {
  return (
    <section className="bg-gray-50 py-24 ">
      <div className="w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-4xl font-bold text-gray-800">
            Our Services
          </h2>
          <h4 className="text-sm uppercase tracking-wider text-gray-500">
            Discover the Services We Offer
          </h4>
        </div>

        {/* Content */}
        <div className="flex flex-wrap lg:flex-nowrap items-stretch justify-center gap-8">
          {/* Services List */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 ">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-lg"
              >
                <div className="text-primary hover:scale-110 text-4xl">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 font-secondary">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mt-2 font-secondary">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Images (on the right) */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-6">
            <img
              src="https://i.ibb.co.com/3pdxmZZ/serive-1.jpg"
              alt="Relaxing Bath"
              className="rounded-lg shadow-md object-cover flex-grow hover:scale-95 duration-100"
            />
            <img
              src="https://i.ibb.co.com/RY9D6TG/service-2.jpg"
              alt="Delicious Food"
              className="rounded-lg shadow-md object-cover flex-grow hover:scale-95 duration-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
