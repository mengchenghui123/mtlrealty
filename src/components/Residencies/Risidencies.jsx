import React from 'react'
import "swiper/css"
import './Residencies.css'
import data from '../../utils/slider.json'

export const Risidencies = () => {
  return (
    <section className="r-wrapper">
        <div className="paddings innerwidth r-container">
            <div className="r-head flexColStart">
                <span className="orangeText">Best Choice</span>
                <span className="primarytext">popular Residencies</span>
            </div>


            <div className="r-grid">
                {
                    data.slice(0,8).map((card, i)=>(
                            <div className="flexColStart r-card" key={i}>
                                <img src={card.image} alt="home" />
                                <span className='secondaryText r-price'>
                                    <span style={{color: "orange"}}>$</span>
                                    <span>{card.price}</span>
                                </span>
                                <span className="primaryText">{card.name}</span>
                                <span className="secondaryText">{card.detail}</span>
                            </div>
                    ))}
            </div>
            <div className="view-more-container">
                <button className="view-more-button">
                    View More
                </button>
            </div>
        </div>
    </section>
  )
}

export default Risidencies
