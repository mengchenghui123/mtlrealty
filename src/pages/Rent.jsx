import SquareItem from '../components/SquareItem/SquareItem';
import data from '../utils/slider.json'

const Rent = () => {
  return (
    <div className="rent-page">
      <h1>Rent List</h1>
      <div className="rent-list">
        {data.map(item => (
          <SquareItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Rent;