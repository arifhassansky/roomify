import { MdOutlineMailOutline, MdAddLocation } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import mapImg from "../assets/map.png";
import { Helmet } from "react-helmet";
import MailBox from "../components/MailBox";

const Contacts = () => {
  return (
    <div>
      <Helmet>
        <title>Contact | Roomify</title>
      </Helmet>
      <div className="mt-20 mb-10 p-10 bg-gray-50">
        {/* address  */}
        <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold capitalize text-primary">
              Roomify
            </h2>
            <p className="font-semibold">Popular Hotel in Cox&apos;s Bazar</p>
            <div className="my-1">
              <p className="text-xl">
                Average Rating:
                <span className="text-yellow-400 font-bold"> 4.7</span>
              </p>
            </div>

            <h2 className="flex items-center text:sm md:text-lg lg:text-xl gap-2 mt-2">
              <MdAddLocation />
              <p>
                <span className="font-bold text-primary">Address:</span> 14
                Daisy Garden, Cox&apos;s Bazar 1219
              </p>
            </h2>
            <p className="flex items-center text-xl gap-2">
              <FaPhone />
              <span className="font-bold text-primary">Phone:</span> 01960609195
            </p>
            <h2 className="flex items-center text-xl gap-2">
              <MdOutlineMailOutline />
              <span className="font-bold text-primary">Email:</span>{" "}
              info@roomify.com
            </h2>
          </div>
          <div>
            <figure className="md:w-80 lg:w-96 mt-8 md:mt-0 bg-secondary p-1 rounded-2xl">
              <img className="rounded-2xl " src={mapImg} />
            </figure>
          </div>
        </div>
      </div>

      {/* support card section */}
      <div className="mt-20 w-11/12 mx-auto ">
        <h2 className="text-3xl font-medium text-center mb-10">
          Hotel Support Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {/* card 1 */}
          <div className="rounded-xl shadow-lg border-4 border-t-primary">
            <div className="p-10 rounded-xl shadow-lg">
              <h2 className="font-bold underline text-xl">
                Booking Assistance
              </h2>
              <p className="my-6">
                Need help with your booking? Contact our team for assistance
                with reservations, cancellations, or modifications to your stay.
              </p>
              <button className="px-4 py-2 text-primary hover:text-white hover:bg-primary font-bold shadow-xl rounded-lg">
                Contact Booking Support
              </button>
            </div>
          </div>

          {/* card 2 */}
          <div className="bg-white rounded-xl shadow-xl border-4 border-t-primary">
            <div className=" p-10 rounded-xl shadow-xl">
              <h2 className="font-bold underline text-xl">Technical Support</h2>
              <p className="my-6">
                Facing technical issues on our platform? Our support team is
                here to resolve any problems and ensure a seamless experience.
              </p>
              <button className="px-4 py-2 text-primary hover:text-white hover:bg-primary font-bold shadow-xl rounded-lg">
                Contact Tech Support
              </button>
            </div>
          </div>

          {/* card 3 */}
          <div className=" rounded-xl shadow-xl border-4 border-t-primary">
            <div className="p-10 rounded-xl shadow-xl">
              <h2 className="font-bold underline text-xl">Room Service</h2>
              <p className="my-6">
                Have questions or requests about your room? Let us know, and
                we’ll ensure your stay is as comfortable as possible.
              </p>
              <button className="px-4 py-2 text-primary hover:text-white hover:bg-primary font-bold shadow-xl rounded-lg">
                Request Room Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* poster section  */}
      <div className="mb-20">
        <MailBox />
      </div>
    </div>
  );
};

export default Contacts;
