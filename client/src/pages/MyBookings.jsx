import axios from "axios";
import { useContext, useEffect, useState } from "react";
import authContext from "../context/AuthContext";
import { toast } from "react-hot-toast";
import moment from "moment";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user, logOut } = useContext(authContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedBookingForReview, setSelectedBookingForReview] =
    useState(null);

  // Fetch bookings
  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/booking/${user?.email}`,
          {
            withCredentials: true,
          }
        );
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        if (error?.response?.data?.message) {
          logOut();
        }
      }
    };

    if (user?.email) {
      getBookings();
    }
  }, [user?.email, logOut]);

  // Cancel booking
  const handleCancel = (id, Room_id, startDate) => {
    const currentDate = moment();
    const cancelDeadline = moment(startDate).subtract(1, "days");

    if (currentDate.isBefore(cancelDeadline)) {
      toast((t) => (
        <div className="flex gap-3 items-center">
          <div>
            <p>
              Are you <b>sure?</b>
            </p>
          </div>
          <div className="gap-2 flex">
            <button
              className="bg-red-600 text-white px-4 py-1 rounded-md"
              onClick={() => {
                toast.dismiss(t.id);
                handleDelete(id, Room_id);
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-700 text-white px-3 py-1 rounded-md"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ));
    } else {
      toast.error(
        "Cancellation is only allowed 1 day before the booking date."
      );
    }
  };

  // Confirm cancel booking
  const handleDelete = (id, Room_id) => {
    axios
      .delete(
        `${import.meta.env.VITE_URL}/cancelBooking/${id}?RoomId=${Room_id}`
      )
      .then(() => {
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
        toast.success("Booking canceled successfully.");
      })
      .catch(() => {
        toast.error("Failed to cancel booking. Please try again.");
      });
  };

  // Open update date modal
  const openUpdateDateModal = (booking) => {
    setSelectedBooking(booking);
    setNewStartDate(booking.startDate);
    setNewEndDate(booking.endDate);
    setModalVisible(true);
  };

  // Handle date update
  const handleDateUpdate = async () => {
    if (newStartDate > newEndDate) {
      return toast.error("The end date cannot be earlier than the start date.");
    }
    try {
      await axios.patch(
        `${import.meta.env.VITE_URL}/updateBookingDate/${selectedBooking._id}`,
        { newStartDate, newEndDate }
      );
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, startDate: newStartDate, endDate: newEndDate }
            : booking
        )
      );
      toast.success("Booking dates updated successfully.");
      setModalVisible(false);
    } catch {
      toast.error("Failed to update booking dates. Please try again.");
    }
  };

  // Open review modal
  const openReviewModal = (booking) => {
    setSelectedBookingForReview(booking);
    setReviewModalVisible(true);
  };

  // Handle review submission
  const handleReviewSubmit = async () => {
    const reviewData = {
      username: user?.displayName,
      image: user?.photoURL,
      timestamp: new Date().toISOString(),
      rating: parseFloat(rating),
      comment,
    };

    if (rating > 5 || rating < 1)
      return toast.error("Rating must be between 1 and 5");

    try {
      await axios.put(
        `${import.meta.env.VITE_URL}/addReview/${
          selectedBookingForReview.Room_id
        }`,
        reviewData
      );
      toast.success("Review submitted successfully!");
      setReviewModalVisible(false);
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="w-11/12 mx-auto py-28">
      <Helmet>
        <title>My Booking | Elite Explore</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-primary text-white uppercase text-sm lg:text-md">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2">Room Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Guests</th>
              <th className="px-4 py-2">Booking Date</th>
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2">Payment</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md lg:text-lg">
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className={`text-center ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="px-4 py-2">
                  <img
                    src={booking.image}
                    alt={booking.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-2">{booking.name}</td>
                <td className="px-4 py-2">${booking.price}</td>
                <td className="px-4 py-2">{booking.capacity}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700 border-b">
                  <span className="font-semibold text-gray-900">From: </span>
                  {booking.startDate}
                  <br />
                  <span className="font-semibold text-gray-900">To: </span>
                  {booking.endDate}
                </td>
                <td className="px-4 py-4 text-sm flex flex-col justify-center items-center gap-2 lg:flex-row lg:gap-4">
                  <button
                    onClick={() =>
                      handleCancel(
                        booking._id,
                        booking.Room_id,
                        booking.startDate
                      )
                    }
                    className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => openReviewModal(booking)}
                    className="px-2 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => openUpdateDateModal(booking)}
                    className="px-2 py-1 text-green-600 border border-green-600 rounded hover:bg-green-600 hover:text-white"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <Link
                    to={`/payment/${booking._id}`}
                    className="btn bg-primary text-white hover:bg-secondary hover:text-black"
                  >
                    Pay
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Date Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Update Booking Dates</h3>
            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                From Date
              </label>
              <input
                type="date"
                id="startDate"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                To Date
              </label>
              <input
                type="date"
                id="endDate"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDateUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Give a Review</h3>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                UserName
              </label>
              <input
                type="text"
                id="name"
                value={user?.displayName}
                readOnly
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating (1-5)
              </label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                min="1"
                max="5"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setReviewModalVisible(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
