import { useQuery } from "react-query";
import { getCommercial } from "../utils/Api";

const useCommercial = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allCommercial",
    getCommercial,
    { refetchOnWindowFocus: false, staleTime: 30000, cacheTime: 30000 }
  );
  return { data, isError, isLoading, refetch };
};

export default useCommercial;
