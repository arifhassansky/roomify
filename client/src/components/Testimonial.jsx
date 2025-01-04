import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="py-20 px-8  bg-secondary mx-auto overflow-x-hidden">
      <div className="mb-12 text-center">
        <h2 className="font-bold text-4xl text-gray-800 mb-2">
          What Our Users Say
        </h2>
        <p className="font-medium text-xl text-gray-700">
          Real Experiences, Real Feedback – See What Our Guests Have to Say!
        </p>
      </div>

      {reviews.length > 0 ? (
        <Slider {...settings}>
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out min-h-[400px] mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-md"
                  src={review.image}
                  alt={review.username}
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-center">
                {review.username}
              </h3>
              <div className="text-yellow-500 mb-4 text-center">
                {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-lg italic mb-6">{review.comment}</p>
              <p className="text-sm">
                {new Date(review.timestamp).toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-primary">No reviews available yet.</p>
      )}
    </div>
  );
};

export default ReviewSlider;
