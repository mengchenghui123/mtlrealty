import React from 'react'
import './Residencies.css'
import data from '../../utils/slider.json'
import PropertyGrid from '../PropertyGrid/PropertyGrid'

export const Risidencies = () => {

    const chunkSize=8;
    const propertyChunks = [];
    const title = ["Residential", "Commercial", "Franchise"];
    
    //将数据分块，每4块房屋信息为一行
    for(let i =0;i<data.length; i+= chunkSize){
        propertyChunks.push(data.slice(i, i+chunkSize));
    }
    
  return (
    <section className="r-wrapper">
        <div className="paddings innerwidth r-container">

            {propertyChunks.map((chunk, index) => (
          <PropertyGrid key={index} properties={chunk} title={title[index%title.length]} />
        ))}
        </div>
    </section>

    //         <div className="r-grid">
    //             {
    //                 data.slice(0,8).map((card, i)=>(
    //                         <div className="flexColStart r-card" key={i}>
    //                             <img src={card.image} alt="home" />
    //                             <span className='secondaryText r-price'>
    //                                 <span style={{color: "orange"}}>$</span>
    //                                 <span>{card.price}</span>
    //                             </span>
    //                             <span className="primaryText">{card.name}</span>
    //                             <span className="secondaryText">{card.detail}</span>
    //                         </div>
    //                 ))}
    //         </div>
    //         <div className="view-more-container">
    //             <button className="view-more-button">
    //                 View More
    //             </button>
    //         </div>
    //     </div>
    // </section>
  );
};


export default Risidencies;
