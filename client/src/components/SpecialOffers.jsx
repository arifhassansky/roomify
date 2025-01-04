import { useState, useEffect } from "react";
import popupImf from "../assets/popup.gif";

const SpecialOffers = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Show the modal when the component mounts
    setModalVisible(true);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!isModalVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative">
        <div className="absolute top-0 right-0  bg-orange-700 rounded-md text-white h-4 w-4 md:h-8 md:w-8 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="text-2xl md:text-4xl font-medium pb-2 "
          >
            x
          </button>
        </div>
        <img
          className="w-72 h-84 md:w-[450px] md:h-[500px] rounded-lg"
          src={popupImf}
        />
      </div>
    </div>
  );
};

export default SpecialOffers;
