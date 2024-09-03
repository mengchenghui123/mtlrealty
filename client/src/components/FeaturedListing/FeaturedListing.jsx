import SquareItem from "../SquareItem/SquareItem";
import { PuffLoader } from "react-spinners";
import "./FeaturedListing.css";

const FeaturedListing = ({ data, isError, isLoading }) => {
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error loading Properties</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="puffloaderStyle" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="orangeText pt-3 ms-3">Special</h2>
      <div className="featured-listing">
        {data.slice(0, 16).map((item) => (
          <SquareItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedListing;
