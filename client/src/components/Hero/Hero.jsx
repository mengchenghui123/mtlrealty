import React, { useState } from 'react';
import './Hero.css';
import { FaBed, FaBath, FaRegObjectGroup, FaWarehouse, FaCaretRight } from 'react-icons/fa';

const Hero = () => {
  const [property] = useState({
    type: "for rent",
    title: "luxury villa house",
    price: "4,600",
    location: "Est St, 77 - Central Park South, NYC",
    bedrooms: 6,
    bathrooms: 3,
    area: "720 sq ft",
    garages: 2,
    image: "/wrapper2.png"
  });

  return (
    <div className="hero-container">
      <div className="row justify-content-center align-items-center position-relative">
        <div className="col-md-4">
          <div className="hero-info">
            <span className="property-type">{property.type}</span>
            <h1 className="property-title">{property.title}</h1>
            <p className="property-price">${property.price}</p>
            <p className="property-location">{property.location}</p>
            <div className="property-details">
              <div className="row">
                <div className="col-md-6">
                  <p><FaBed /> {property.bedrooms} Bedrooms</p>
                </div>
                <div className="col-md-6">
                  <p><FaBath /> {property.bathrooms} Bathrooms</p>
                </div>
                <div className="col-md-6">
                  <p><FaRegObjectGroup /> {property.area}</p>
                </div>
                <div className="col-md-6">
                  <p><FaWarehouse /> {property.garages} Garages</p>
                </div>
              </div>
            </div>
            <button className="hero-btn">View Property <FaCaretRight /></button>
          </div>
          <div className="d-flex justify-content-center align-items-center hero-nav-btn-container position-absolute">
            <div className="hero-btn-break-line" />
            <button className="hero-nav-btn hero-prev-btn">Prev</button>
            <div className="hero-btn-break-line" />
            <button className="hero-nav-btn">Next</button>
            <div className="hero-btn-break-line" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="hero-image-container">
            <img src={property.image} alt={property.title} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;