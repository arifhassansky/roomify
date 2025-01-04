import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopRatedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRatedRooms = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL}/top-rated-rooms`
        );
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching top-rated rooms:", error);
      }
    };

    fetchTopRatedRooms();
  }, []);

  return (
    <div className="py-28 w-11/12 mx-auto">
      <div className="mb-12 text-center">
        <h2
          className="text-5xl font-black mb-12"
          style={{
            backgroundImage:
              "url(https://i.ibb.co.com/frswDKL/Fire-GIF-Fire-Discover-Share-GIFs.gif)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "transparent",
            WebkitBackgroundClip: "Text",
          }}
        >
          Top-Rated Rooms
        </h2>

        <p className="font-medium text-xl text-gray-700">
          Explore the Best of the Best – Our Most Loved and Highly Rated Rooms!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden p-6"
            onClick={() => navigate(`/room/${room._id}`)}
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-48 object-cover rounded-xl hover:scale-105"
            />
            <div className="mb-2">
              <div className="flex justify-between items-center mt-6">
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <p className="text-gray-500">{room.location}</p>
              </div>
              <p className="text-gray-700 mt-4">
                {room.description.slice(0, 135)}
                <span className="font-semibold text-lg"> more...</span>
              </p>
              <div className="flex justify-between items-center mt-6">
                <p className=" font-bold text-lg">${room.price} / night</p>
                <button className=" px-4 py-2 bg-primary  hover:bg-secondary text-white hover:text-black rounded-lg hover:bg-primary-dark">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedRooms;
