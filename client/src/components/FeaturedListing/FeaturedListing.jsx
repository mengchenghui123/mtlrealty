import SquareItem from "../SquareItem/SquareItem";
import './FeaturedListing.css'

const FeaturedListing = ({ data }) => {
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
}

export default FeaturedListing;