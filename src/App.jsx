import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import RootLayout from "./Screens/Root";
import Login from "./Screens/Login";
import Users from "./Screens/Users";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <Login /> },
      { path: "/users", element: <Users /> },
    ],
  },
]);

function App() {
  return (
    <>
      {" "}
      <RouterProvider router={router} />{" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      ;
    </>
  );
}

export default App;
