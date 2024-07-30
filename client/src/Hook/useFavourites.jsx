import React, { useContext, useEffect, useRef } from "react";
import userDetailContext from "../context/userDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/Api";

const useFavourites = () => {
  const { userDetails, setUserDetail } = useContext(userDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  console.log("user:", user);
  console.log("userDetails", userDetails);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => {
      if (!user?.email || !userDetails?.token) {
        return [];
      }
      return getAllFav(user.email, userDetails.token);
    },
    onSuccess: (data) => {
      console.log("Data from Query", data);
      if (!Array.isArray(data)) {
        throw new Error("Data format is incorrect", data);
      }
      setUserDetail((prev) => ({ ...prev, favourites: data }));
    },
    enabled: !!user && !!userDetails?.token,
    staleTime: 30000,
  });

  useEffect(() => {
    queryRef.current = refetch;
    if (userDetails?.token) {
      refetch();
    }
  }, [userDetails?.token]);
  console.log("Query Data:", data);
  return { data, isError, isLoading, refetch };
};

export default useFavourites;
