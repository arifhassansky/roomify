import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Count = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <div
      style={{
        backgroundImage: "url('https://i.ibb.co.com/TKg5r58/count.jpg')",
        backgroundSize: "cover",
      }}
      ref={ref}
      className=" min-h-screen flex justify-center items-center"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-white backdrop-blur-lg py-8 rounded-xl">
        <div className="stat place-items-center space-y-4">
          <p className="stat-value text-7xl">
            {inView && <CountUp duration={3} end={540} />}
          </p>
          <p className="text-4xl">LUXURY ROOMS</p>
        </div>
        <div className="stat place-items-center space-y-4">
          <p className="stat-value text-7xl">
            {inView && <CountUp duration={3} end={74} />}k
          </p>
          <p className="text-4xl">GUESTS</p>
        </div>
        <div className="stat place-items-center space-y-4">
          <p className="stat-value text-7xl">
            {inView && <CountUp duration={3} end={2} />}k
          </p>
          <p className="text-4xl">Five Star Ratings</p>
        </div>
        <div className="stat place-items-center space-y-4">
          <p className="stat-value text-7xl">
            {inView && <CountUp duration={3} end={3} />}M
          </p>
          <p className="text-4xl">Served Breakfast</p>
        </div>
      </div>
    </div>
  );
};

export default Count;
