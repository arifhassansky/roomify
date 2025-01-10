import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  console.log(rooms);

  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    const handleRoomClick = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_URL}/offers`);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };
    handleRoomClick();
  }, []);

  return (
    <div className="my-28 w-11/12 mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold">Our Offered Rooms</h3>
        <p className="text-gray-500 mt-2 text-lg">
          Explore our handpicked rooms designed for comfort and luxury, tailored
          to suit every need.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8 o">
        {rooms?.map((room) => (
          <div
            onClick={() => handleRoomClick(room._id)}
            key={room._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              className="w-full h-52 object-cover object-center"
              src={room.image}
              alt={room.name}
            />
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {room.name}
              </h2>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-bold text-gray-900">${room.price}</p>
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
    </div>
  );
};

export default Offer;
