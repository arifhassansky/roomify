import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Range } from "react-range";
import axios from "axios";
import { Helmet } from "react-helmet";
import grid from "../assets/grid.png";

const Rooms = () => {
  const initialRooms = useLoaderData();
  const [rooms, setRooms] = useState(initialRooms);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [viewMode, setViewMode] = useState("card");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const navigate = useNavigate();

  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const handleFilterSubmit = async (offer = null) => {
    const [min, max] = priceRange;

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/allRooms?minPrice=${min}&maxPrice=${max}${
          offer && offer !== "All" ? `&offer=${offer}` : ""
        }`
      );
      setRooms(data);
      setSelectedFilter(offer || "All");
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    }
  };

  const handleReset = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/allRooms`);
      setRooms(data); // Reset rooms to the initial state
      setPriceRange([0, 500]); // Reset price range to default
      setSelectedFilter("All"); // Reset dropdown to "All"
    } catch (error) {
      console.error("Error resetting filters:", error.message);
    }
  };

  return (
    <div className="w-11/12 mx-auto py-28">
      <Helmet>
        <title>Rooms | Roomify</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        {/* View Toggle Button */}
        <div className="flex gap-4 md:gap-6">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full transition duration-300 ease-in-out ${
              viewMode === "card"
                ? "bg-secondary shadow-lg transform scale-105"
                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
            }`}
          >
            <img className="w-4" src={grid} alt="Grid View" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full transition duration-300 ease-in-out ${
              viewMode === "table"
                ? "bg-primary text-white shadow-lg transform scale-105"
                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
            }`}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Dropdown Filter */}
        <select
          value={selectedFilter}
          onChange={(event) => handleFilterSubmit(event.target.value)}
          className="select select-info w-full md:w-auto max-w-xs"
        >
          <option value="All">All</option>
          <option value="New Year Offer">New Year Offer</option>
          <option value="Couple Offer">Couple Offer</option>
        </select>

        {/* Reset Button */}
        <div>
          <button
            onClick={handleReset}
            className="bg-white text-lg btn text-primary"
          >
            Reset
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <div className="flex justify-between w-full text-gray-700 font-medium">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="w-full mt-2 mb-4">
            <Range
              step={10}
              min={0}
              max={1000}
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-primary rounded-full"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-6 w-6 bg-primary border-2 border-secondary rounded-full shadow-lg"
                />
              )}
            />
          </div>
          <button
            onClick={() => handleFilterSubmit(null)}
            className="mt-2 px-3 py-1 bg-primary text-white rounded-full text-lg font-semibold shadow-lg"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Our Rooms
        </h1>
        <p className="text-xl font-medium text-gray-600 mt-2">
          Experience the Perfect Blend of Comfort, Luxury, and Scenic Views
        </p>
      </div>

      {/* Render Rooms */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {rooms?.map((room) => (
            <div
              onClick={() => handleRoomClick(room._id)}
              key={room._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                className="w-full h-64 object-cover object-center"
                src={room.image}
                alt={room.name}
              />
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {room.name}
                </h2>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-bold text-gray-900">
                    ${room.price}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Reviews ({room.reviews.length})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full shadow-md rounded-lg">
            <thead>
              <tr className="text-left border-b bg-primary text-white">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Room Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Reviews</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms?.map((room, index) => (
                <tr
                  key={room._id}
                  className={`border-b hover:bg-secondary ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-16 hover:w-72 h-16 hover:h-28  duration-300 object-cover object-center rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">{room.name}</td>
                  <td className="px-6 py-4">${room.price}</td>
                  <td className="px-6 py-4">{room.reviews.length}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRoomClick(room._id)}
                      className="text-primary font-semibold"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rooms;
