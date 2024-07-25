import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import userDetailContext from "../../context/userDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/Api";

const Layout = () => {

  const {isAuthenticated, user, getAccessTokenWithPopup} = useAuth0()
  const {setUserDetail} =useContext(userDetailContext)

  const {mutate} = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token)=> createUser(user?.email, token)
  })

  useEffect(()=>{
    
    const getTokenAndRegister = async ()=>{
      try{
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "https://dev-htkjk3aua38i5rux.us.auth0.com/api/v2/",
            scope: "openid profile email",
          },
        });
        localStorage.setItem("access_token", res)
        setUserDetail((prev) => ({ ...prev, token: res }));
        mutate(res);
      }catch(error){
        console.error("failed to get token", error)
      }
      
    };
    if(isAuthenticated){
      getTokenAndRegister();
    }
  }, [isAuthenticated, getAccessTokenWithPopup, setUserDetail, mutate])

  

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
