import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Root from "../layouts/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyBookings from "../pages/MyBookings";
import Rooms from "../pages/Rooms";
import PrivateRoute from "./PrivateRoute";
import ViewRoomDetails from "../pages/ViewRoomDetails";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../pages/AboutUs";
import Contacts from "../pages/Contacts";
import Gallery from "../pages/Gallery";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
        loader: () => fetch(`${import.meta.env.VITE_URL}/allRooms`),
      },
      {
        path: "/room/:id",
        element: <ViewRoomDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/room/${params.id}`),
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
export default router;
