import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import userDetailContext from "../../context/userDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/Api";
import useFavourites from "../../Hook/useFavourites";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import useBookings from "../../Hook/useBookings";

const Layout = () => {
  useFavourites();
  useBookings();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetail } = useContext(userDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    document.body.classList.add("int_white_bg", "hd-white");
    const getTokenAndRegister = async () => {
      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "https://api.realEstate.com",
            scope: "openid profile email",
          },
        });
        localStorage.setItem("access_token", res);
        setUserDetail((prev) => ({ ...prev, token: res }));
        mutate(res);
      } catch (error) {
        console.error("failed to get token", error);
      }
    };
    if (isAuthenticated) {
      getTokenAndRegister();
    }
    return () => {
      document.body.classList.remove("int_white_bg", "hd-white");
    };
  }, [isAuthenticated, getAccessTokenWithPopup, setUserDetail, mutate]);

  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
