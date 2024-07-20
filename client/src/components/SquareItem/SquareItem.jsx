import React from 'react'
import './SquareItem.css';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiFillHeart } from 'react-icons/ai'

const SquareItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    toast.success(`card with id ${item.id} clicked`);
    navigate(`/property/${item.id}`);
  };


  return (
    <div className="rent-item r-card" onClick={handleClick}>
      <AiFillHeart size={24} color="white" />
      <img src={item.image} alt="property" />
      <div className="secondaryText r-price price-line">
        <p className='dollar'>$</p>
        <p className="rent-price">{item.price}</p>
      </div>
      <p className="rent-name">{item.title}</p>
      <p className="secondaryText">{truncate(item.description, { length: 80 })}</p>
    </div>
  );
};

SquareItem.proptype = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
  }).isRequired,
};

export default SquareItem;
