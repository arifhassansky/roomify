import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import authContext from "../context/AuthContext";

const ViewRoomDetails = () => {
  const room = useLoaderData({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStartDate, setBookingStartDate] = useState("");
  const [bookingEndDate, setBookingEndDate] = useState("");
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  const {
    _id,
    name,
    image,
    description,
    price,
    location,
    availability,
    amenities,
    reviews,
    capacity,
  } = room || {};
  console.log(reviews);

  // Open the modal
  const openModal = () => setIsModalOpen(true);
  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  // Handle booking confirmation
  const handleBooking = () => {
    if (!user) {
      toast.error("Please log in or register to book a room.");
      return navigate("/login");
    }

    if (!availability) {
      return toast.error(
        "Sorry, this room is currently unavailable. Please choose another room."
      );
    }

    if (!bookingStartDate || !bookingEndDate) {
      return toast.error("Please select a valid date range.");
    }

    if (bookingStartDate > bookingEndDate) {
      return toast.error("The end date cannot be earlier than the start date.");
    }

    const formattedStartDate = moment(bookingStartDate).format("MMMM Do YYYY");
    const formattedEndDate = moment(bookingEndDate).format("MMMM Do YYYY");

    const booking = {
      Room_id: _id,
      email: user?.email,
      startDate: bookingStartDate,
      endDate: bookingEndDate,
      capacity,
      name,
      image,
      description,
      price,
      location,
      amenities,
    };

    axios
      .post(`${import.meta.env.VITE_URL}/addBooking`, booking)
      .then(() => {
        toast.success(
          `Room booked successfully from ${formattedStartDate} to ${formattedEndDate}!`
        );
        closeModal();
      })
      .catch(() => {
        toast.error("Failed to book the room. Please try again.");
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto py-28 px-8">
      {/* Image Section */}
      <div className="relative mb-12 overflow-hidden rounded-xl shadow-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-64 md:h-96 object-cover transform hover:scale-105 transition duration-500"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6 rounded-b-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg text-end">
            {location}
          </h2>
        </div>
      </div>

      {/* Room Details Section */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Section - Room Description */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{name}</h1>
          <p className="text-lg text-gray-600 mb-6 text-justify">
            {description}
          </p>

          <h2 className="text-2xl font-semibold mb-4">Room Amenities</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            {amenities.map((amenity, index) => (
              <li key={index} className="text-gray-600">
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Pricing and Availability */}
        <div className="md:w-1/3 bg-gray-50 p-8 rounded-xl shadow-lg mt-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Price & Availability
          </h2>
          <div className="text-xl text-gray-800 mb-4">
            <span className="font-semibold">Price:</span> ${price}
          </div>
          <div className="text-xl text-gray-800 mb-4">
            <span className="font-semibold">Capacity: </span> {capacity} guests
          </div>
          <div className="text-xl text-gray-800 mb-4">
            <span className="font-semibold">Availability: </span>
            {availability ? "Available" : "Not Available"}
          </div>

          <div className="text-xl text-gray-800 mb-4">
            <span className="font-semibold">Rating: </span>
            {reviews.length > 0
              ? (
                  reviews.reduce((acc, review) => acc + review.rating, 0) /
                  reviews.length
                ).toFixed(1)
              : 0}
            /5 ({reviews.length} Reviews)
          </div>
          <div className="text-xl text-gray-800 mb-4">
            <span className="font-semibold">Location:</span> {location}
          </div>

          {/* Book Button */}
          <div className="mt-6">
            <button
              onClick={openModal}
              className="w-full bg-primary font-semibold text-white text-lg py-3 rounded-md hover:bg-secondary hover:text-black transition duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg p-6">
            {/* Header */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">
                Booking Summary
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  Price:
                </h3>
                <p className="text-lg font-semibold text-primary ml-2">
                  ${price}
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  Availability:
                </h3>
                <p className="text-lg ml-2">
                  {availability ? "Available" : "Unavailable"}
                </p>
              </div>

              <div className="flex items-center">
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  Capacity:
                </h3>
                <p className="text-lg font-semibold ml-2">{capacity} guests</p>
              </div>
              <div className="flex items-center">
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  Rating:
                </h3>
                <p className="text-lg ml-2">
                  {reviews.length > 0
                    ? (
                        reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                        ) / reviews.length
                      ).toFixed(1)
                    : 0}
                  / 5
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-700 text-sm uppercase mb-2">
                  Booking Dates
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold">From:</label>
                    <input
                      type="date"
                      className="border border-gray-300 rounded-md p-2"
                      onChange={(e) => setBookingStartDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold">To:</label>
                    <input
                      type="date"
                      className="border border-gray-300 rounded-md p-2 "
                      onChange={(e) => setBookingEndDate(e.target.value)}
                    />
                  </div>
                </div>
                {bookingStartDate &&
                  bookingEndDate &&
                  bookingStartDate > bookingEndDate && (
                    <p className="text-red-500 text-sm mt-2">
                      The end date cannot be earlier than the start date.
                    </p>
                  )}
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-md w-full mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="bg-primary text-white py-2 px-4 rounded-md w-full ml-2"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold">Guest Reviews</h2>
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-4 border border-gray-200 rounded-lg shadow-sm my-6"
              >
                {/* Reviewer's Image */}
                <img
                  src={review.image || "https://via.placeholder.com/50"}
                  alt={review.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {/* Review Details */}
                <div>
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold">{review.username}</h3>
                    <span className="text-yellow-500 font-semibold">
                      {review.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {moment(review.timestamp).format("MMMM Do YYYY, h:mm a")}
                  </p>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">
            No reviews yet. Be the first to review this room!
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewRoomDetails;
