import { useQuery } from "react-query";
import { getCommercial } from "../utils/Api";

const useCommercial = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allCommercial",
    getCommercial,
    { refetchOnWindowFocus: false }
  );
  return { data, isError, isLoading, refetch };
};

export default useCommercial;
