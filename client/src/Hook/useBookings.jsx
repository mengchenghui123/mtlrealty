import React, { useContext, useEffect, useRef } from "react";
import userDetailContext from "../context/userDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/Api";

const useBookings = () => {
  const { userDetails, setUserDetail } = useContext(userDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getAllBookings(user.email, userDetails?.token),
    onSuccess: (data) => {
      if (!Array.isArray(data)) {
        throw new Error("Data format is incorrect", data);
      }
      setUserDetail((prev) => ({ ...prev, bookings: data }));
    },
    enabled: !!user?.email && !!userDetails?.token,
    staleTime: 30000,
  });

  useEffect(() => {
    queryRef.current = refetch;
    if (userDetails?.token) {
      refetch();
    }
  }, [userDetails?.token, refetch]);
  return { data, isError, isLoading, refetch };
};

export default useBookings;
