import React from 'react';
import {useParams} from 'react-router-dom';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import data from '../../utils/slider.json';
import './PropertyDetail.css'

export const PropertyDetail = () => {
    const {id} = useParams();
    const property = data.find((p)=>p.id === parseInt(id));

    if(!property){
        return <div className="container mt-5"><h2>roperty Not Found</h2></div>;
    }

  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-8 offset-md-2"></div>
            <div className="card">
                <img src={property.image} className = "card-img-top" alt={property.name} />
                <div className="card-body">
                    <h5 className="card-title">{property.name}</h5>
                    <p className="card-text text-muted">${property.price}</p>
                    <p className="card-text">{property.detail}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PropertyDetail;
