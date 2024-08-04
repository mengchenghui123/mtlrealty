import React from "react";
import "./PropertyGrid.css";
import { Carousel } from "@mantine/carousel";
import '@mantine/carousel/styles.css';
import { Badge } from "@mantine/core";
import { toast } from "react-toastify";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";
import { FaBed, FaBath, FaRegObjectGroup } from 'react-icons/fa';

const PropertyGrid = ({ properties, title }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    toast.success(`card with id ${id} clicked`);
    navigate(`/property/${id}`);
  };

  const titleToURL = {
    Residential: "../../residential",
    Commercial: "../../commercial",
    Franchise: "../../franchise",
  };

  const handleViewMore = () => {
    const url = titleToURL[title];
    if (url) {
      window.scrollTo(0, 0);
      navigate(url);
    } else {
      toast.error("404");
    }
  };

  return (
    <div className="property-grid-wrapper">
      <div className="r-head flexColStart">
        <span className="fs-5 fw-semibold text-uppercase">properties</span>
        <span className="orangeText">{title}</span>
      </div>

      <div className="carousel-container">
        <Carousel
          withIndicators
          height={400}
          slideSize={{ base: '100%', sm: '50%', md: '25%' }}
          slideGap={{ base: 0, sm: 'md' }}
          controlSize={35}
          loop
          align="start"
          classNames={{
            controls: 'carousel-controls',
          }}
          styles={{
            indicator: {
              width: 10,
              height: 10,
              border: '1px solid rgb(179, 115, 55)',
              borderRadius: '50%',
              backgroundColor: 'rgba(179, 115, 55, 0.5)',
              '&[dataActive]': {
                backgroundColor: 'rgba(179, 115, 55, 1)',
              },
            },
            control: {
              backgroundColor: '#fff',
            },
            indicators: {
              position: 'absolute',
              bottom: '-2rem',
            }
          }}
        >
          {properties.map((card, i) => (
            <Carousel.Slide
              // className="flexColStart r-card"
              key={i}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="card r-card"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%'
                }}
              >
                <Badge
                  className="status-badge"
                  color={card.status === 'for sale' ? 'red' : 'blue'}
                  radius="xs"
                >
                  {card.status ? card.status : 'for rent'}
                </Badge>
                <Heart id={card?.id} className="heart-icon" />
                <div className="card-info">
                  <div className="d-flex flex-column align-items-start gap-2">
                    <span className="primaryText">
                      {truncate(card.title, { length: 15 })}
                    </span>
                    <span className="primaryText">
                      <span>$</span>
                      <span>{card.price}</span>
                    </span>
                    <div className="d-flex">
                      <span className="secondaryText">
                        <span>
                          <FaBed style={{ color: 'rgb(233,41,78)', margin: '0 4px' }} />
                          {card.facilities.bedrooms} Bed
                        </span>
                      </span>
                      <div style={{ borderLeft: '1px solid #fff', margin: '0 8px' }} />
                      <span className="secondaryText">
                        <span>
                          <FaBath style={{ color: 'rgb(233,41,78)', margin: '0 4px' }} />
                          {card.facilities.bathrooms} Bath
                        </span>
                      </span>
                      <div style={{ borderLeft: '1px solid #fff', margin: '0 8px' }} />
                      <span className="secondaryText">
                        <span>
                          <FaRegObjectGroup style={{ color: 'rgb(233,41,78)', margin: '0 4px' }} />
                          xxx sq ft
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* <span className="secondaryText">
                  {truncate(card.description, { length: 80 })}
                </span> */}
                </div>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>


      {/* <div className="view-more-container">
        <button className="view-more-button" onClick={handleViewMore}>
          View More
        </button>
      </div> */}

    </div >
  );
};

// PropertyGrid.prototype={
//     properties:PropTypes.arrayOf(
//         PropTypes.shape({
//             id:PropTypes.number.isRequired,
//             image: PropTypes.string,
//             price: PropTypes.string,
//             name: PropTypes.string,
//             detail: PropTypes.string,
//         })
//     ).isRequired,
//     title: PropTypes.string.isRequired,
// };

export default PropertyGrid;
