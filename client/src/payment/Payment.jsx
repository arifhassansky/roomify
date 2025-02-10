import { useContext, useEffect, useState } from "react";
import authContext from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const Payment = () => {
  const [booking, setbooking] = useState({});
  const { user } = useContext(authContext);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/single-booking/${id}`)
      .then((res) => setbooking(res.data));
  }, [id]);

  const handlePayment = async () => {
    const payment = {
      email: user?.email,
      price: booking.price,
      transectionId: "",
      date: new Date(),
      bookingId: booking._id,
      RoomId: booking.Room_id,
      status: "pending",
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL}/create-payment`,
      payment
    );

    if (data?.gatewayPageURL) {
      window?.location?.replace(data.gatewayPageURL);
    }
  };

  return (
    <div className="min-h-screen pt-28 w-10/12 mx-auto">
      <div className=" border-b-4 py-4">
        <p className="text-5xl text-center text-primary">Payment </p>
        <p className="text-2xl text-center">
          Make Payment to confim your booking
        </p>
      </div>
      <div className="mt-16 flex flex-col">
        <label className="text-xl font-semibold">Email</label>
        <input
          type="text"
          value={user.email}
          readOnly
          className="input input-bordered input-info w-full max-w-xs"
        />
        <button
          onClick={handlePayment}
          className="btn bg-primary text-white hover:text-black hover:bg-secondary w-1/4 mt-3 text-lg"
        >
          Palce order
        </button>
      </div>
    </div>
  );
};

export default Payment;
