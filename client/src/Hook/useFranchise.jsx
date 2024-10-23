import { useQuery } from "react-query";
import { getAllFranchise } from "../utils/Api";

const useFranchise = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allFranchise",
    getAllFranchise,
    { refetchOnWindowFocus: false, staleTime: 30000, cacheTime: 30000 }
  );

  return { data, isError, isLoading, refetch };
};

export default useFranchise;
