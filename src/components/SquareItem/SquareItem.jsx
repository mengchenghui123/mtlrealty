import React from 'react'
import './SquareItem.css';

const SquareItem = ({ item }) => {
  return (
    <div className="rent-item">
      <img src={item.image} alt={item.name} />
      <div className="rent-details">
        <p className="rent-price">{item.price}</p>
        <p className="rent-name">{item.name}</p>
      </div>
    </div>
  );
};

export default SquareItem;
