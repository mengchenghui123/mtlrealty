import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/Api";

const useProperty = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    getAllProperties,
    { refetchOnWindowFocus: false, staleTime: 30000, cacheTime: 30000 }
  );

  return { data, isError, isLoading, refetch };
};

export default useProperty;
