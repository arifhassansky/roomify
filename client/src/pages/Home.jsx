import { Helmet } from "react-helmet";
import Count from "../components/Count";
import Map from "../components/Map";
import Services from "../components/Services";
import Slider from "../components/Slider";
import SpecialOffers from "../components/SpecialOffers";
import Testimonial from "../components/Testimonial";
import TopRatedRooms from "../components/TopRatedRooms";
import Offer from "../components/Offer";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Roomify</title>
      </Helmet>

      <SpecialOffers />
      <Slider />
      <TopRatedRooms />
      <Count />
      <Offer />
      <Services />
      <Map />
      <Testimonial />
    </div>
  );
};

export default Home;
