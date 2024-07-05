import Header from '../components/Header/Header'
import SquareItem from '../components/SquareItem/SquareItem';
import data from '../utils/slider.json'

const Rent = () => {

  console.log("Rent compoenent rendered");
  
  return (
    <div className="rent-page">
      <Header />
      <div className="container">
        <div className='content-box'>
          <h1 className='title'>Rent Listings</h1>
          <div className='break-line' />
          <div className="rent-list">
            {data.map((item, index) => (
              <SquareItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;