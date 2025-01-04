import loginBg from "../assets/loginbg.svg";
import android from "../assets/android.png";
import ios from "../assets/ios.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import authContext from "../context/AuthContext";
import { Helmet } from "react-helmet";

const Register = () => {
  const {
    createUser,
    googleSignIn,
    setEmail,
    githubSignIn,
    updateUserProfile,
  } = useContext(authContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Register Successfull!");
        navigate("/");
      })
      .catch(() => {});
  };
  const handleGithubLogin = () => {
    githubSignIn()
      .then(() => {
        navigate(location.state ? location.state : "/");
        toast.success("Login Successfull!");
      })
      .catch(() => {});
  };

  const handleForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo, email, password);

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password does not match requirements");
      return;
    }

    createUser(email, password)
      .then(() => {
        toast.success("Registration Successfull!");
        setEmail(email);
        updateUserProfile({
          displayName: name,
          photoURL: photo,
        });
        navigate("/");
        setError("");
      })
      .catch(() => {});
  };
  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="min-h-screen mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-20 lg:gap-28 bg-[#472d9c] bg-no-repeat px-4 sm:px-8"
    >
      <Helmet>
        <title>Register | Roomify</title>
      </Helmet>
      {/* Left Section */}
      <div className="backdrop-blur-2xl shadow-lg rounded-xl p-6 mt-20 text-white">
        <h2 className=" font-extrabold text-2xl md:text-3xl mb-4 md:mb-6 text-center">
          Register Your Account
        </h2>

        <form onSubmit={handleForm} className="md:grid grid-cols-2 gap-x-4">
          <div className="my-2">
            <label className="font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div className="my-2">
            <label className="font-medium">Photo URL</label>
            <input
              type="url"
              name="photo"
              placeholder="Enter Your Photo URL"
              className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div className="my-2">
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div className="my-2">
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full col-span-2 btn border-none hover:text-black bg-primary rounded-md mt-6 text-white py-2 hover:bg-secondary"
          >
            Register
          </button>
          <p className="mt-2 text-red-600">{error}</p>
        </form>
        <div>
          <div className="divider divider-info">or</div>
          <div className="flex justify-center items-center gap-3">
            <button type="submit" onClick={handleGoogleLogin}>
              <img
                className="w-10 h-10"
                src="https://i.ibb.co.com/dK5ntqv/icons8-google-48.png"
              />
            </button>
            <button type="submit" onClick={handleGithubLogin}>
              <img
                className="w-14 h-14"
                src="https://i.ibb.co.com/CWkQgF5/icons8-github-48.png"
              />
            </button>
          </div>
          <h2 className="mt-4 text-center mb-8">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-md text-green-400 hover:underline ml-2"
            >
              Login
            </Link>
          </h2>
        </div>
      </div>
      {/* Right Section */}
      <div className="text-white text-center lg:text-left mt-20 lg:mt-0">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-secondary">
          Roomify
        </h2>
        <h3 className="mb-4 -mt-2 text-center lg:mr-24 text-lg sm:text-lg lg:text-xl">
          Relax & Rest
        </h3>
        <p className="text-lg sm:text-xl lg:text-3xl">
          You will be testing one of <br /> Roomify&apos;s core applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
          <div className="flex gap-2 items-center cursor-pointer">
            <img className="w-8 sm:w-10" src={android} alt="Android App" />
            <p>Roomify Android</p>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <img className="w-8 sm:w-10" src={ios} alt="iOS App" />
            <p>Roomify iOS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
