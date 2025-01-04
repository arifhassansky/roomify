import loginBg from "../assets/loginbg.svg";
import android from "../assets/android.png";
import ios from "../assets/ios.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import authContext from "../context/AuthContext";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signIn, googleSignIn, githubSignIn, setEmail } =
    useContext(authContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        navigate(location.state ? location.state : "/");
        toast.success("Login Successfull!");
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

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login Successfull!");
        setEmail(email);
        navigate(location.state ? location.state : "/");
        setError("");
      })
      .catch(() => {
        setError("Invalid Username or Password..!");
      });
  };
  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="min-h-screen mx-auto flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-20 bg-[#472d9c] bg-no-repeat px-4 sm:px-8"
    >
      <Helmet>
        <title>Login | Roomify</title>
      </Helmet>
      {/* Left Section */}
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

      {/* Right Section */}
      <div className="backdrop-blur-2xl shadow-lg rounded-xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Welcome to Roomify!
        </h2>

        <form onSubmit={handleLogin} className="mt-6">
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4 text-white text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 bg-transparent rounded"
              />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:text-black transition duration-300"
          >
            Sign In
          </button>
          <p className="my-2 text-red-600 text-center">{error}</p>
        </form>
        <div className="divider">or</div>
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

        {/* Sign Up Link */}
        <p className="mt-4 text-md text-center">
          Don’t have an account?
          <Link
            to="/register"
            className="text-green-400 font-medium hover:underline ml-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
