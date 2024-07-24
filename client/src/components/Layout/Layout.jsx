import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import userDetailContext from "../../context/userDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/Api";

const Layout = () => {

  const {isAuthenticated, user} = useAuth0()
  const {setUserDetails} =useContext(userDetailContext)

  const {mutate} = useMutation({
    mutationKey: [user?.email],
    mutationFn: ()=> createUser(user?.email)
  })

 


  useEffect(()=>{
    isAuthenticated && mutate()
  }, [isAuthenticated])

  

  return (
    <>
        <Header/>
        <div style = {{minHeight: "calc(100vh - 200px)"}}>
        <Outlet/>
        </div>
        <Footer />
    </>
  );
};

export default Layout;
