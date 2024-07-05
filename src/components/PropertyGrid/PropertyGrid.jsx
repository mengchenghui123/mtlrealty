import React from 'react'
import './PropertyGrid.css'
import PropTypes from 'prop-types'

const PropertyGrid=({properties})=>{
    return (
        <div className="r-grid">
            {properties.map((card,i)=>{
                <div className="flexColStart r-card" key={i}>
                    <img src={card.img} alt="home" />
                    <span className="secondaryText r-price">
                        <span style={{color:"orange"}}>$</span>
                        <span>{card.price}</span>
                    </span>
                    <span className="primarytext">{card.name}</span>
                    <span className="secondaryText">{card.detail}</span>
                </div>
            })}
        </div>
    );
};

PropertyGrid.prototype={
    properties:PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string,
            price: PropTypes.string,
            name: PropTypes.string,
            detail: PropTypes.string,
        })
    ).isRequired,
};

export default PropertyGrid;