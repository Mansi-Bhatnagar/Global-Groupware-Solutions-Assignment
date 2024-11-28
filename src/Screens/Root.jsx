import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();

  //Effects
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/users");
    }
  }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
};
export default RootLayout;
