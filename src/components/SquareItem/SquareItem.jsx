import React from 'react'
import './SquareItem.css';

const SquareItem = ({ item }) => {
  return (
    <div className="rent-item r-card">
      <img src={item.image} alt="property" />
      <div className="secondaryText r-price price-line">
        <p className='dollar'>$</p>
        <p className="rent-price">{item.price}</p>
      </div>
      <p className="rent-name">{item.name}</p>
      <p className="secondaryText">{item.detail}</p>
    </div>
  );
};

export default SquareItem;
