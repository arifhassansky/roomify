/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import authContext from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        <ClipLoader loading={true} size={50} color="#000000" />
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
