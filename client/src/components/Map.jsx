import { Map as PigeonMap, Marker, Overlay } from "pigeon-maps";

const Map = () => {
  const position = [23.7662, 90.3589];

  return (
    <div className="w-full mx-auto py-28 px-12">
      <div className="text-center mb-16">
        <h2 className="font-bold text-4xl text-gray-800 mb-2">Find Us On</h2>
        <p className="font-medium text-xl text-gray-700">
          Locate Us Easily and Experience Luxury at Roomify.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-12 lg:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col lg:w-1/2 max-w-lg mx-auto text-center lg:text-left px-4">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Your Perfect Stay Awaits
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">
            Roomify offers an exclusive experience in the heart of the city. Our
            modern amenities and luxurious accommodations provide the perfect
            balance of comfort and convenience. Explore our location and plan
            your stay with ease.
          </p>
        </div>

        {/* Right Section with Map */}
        <div className="lg:w-1/2 w-full rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200">
          <PigeonMap
            defaultCenter={position}
            defaultZoom={13}
            height={400}
            className="rounded-2xl"
          >
            {/* Marker */}
            <Marker anchor={position} width={50} />

            {/* Tooltip Overlay */}
            <Overlay anchor={position} offset={[0, 20]}>
              <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-300">
                <p className="text-gray-800 font-semibold">Roomify Hotel</p>
                <p className="text-sm text-gray-600">Your Perfect Stay</p>
              </div>
            </Overlay>
          </PigeonMap>
        </div>
      </div>
    </div>
  );
};

export default Map;
