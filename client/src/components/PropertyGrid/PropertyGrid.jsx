import { useEffect } from "react";
import { toast } from "react-toastify";
import { truncate } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/Common";
import Heart from "../Heart/Heart";

const PropertyGrid = ({ properties, title }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1);
  const handleCardClick = (id) => {
    toast.success(`card with id ${id} clicked`);
    if (title === "Residential") {
      navigate(`/property/${id}`);
    } else if (title === "Franchise") {
      navigate(`/brands/${id}`);
    }
  };

  useEffect(() => {
    const initSlick = () => {
      const $ = window.jQuery;
      const slickElement = $(".slick-lancers");

      if (slickElement.length > 0) {
        if (!slickElement.hasClass("slick-initialized"))
          slickElement.slick({
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            adaptiveHeight: true,
            responsive: [
              {
                breakpoint: 1292,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  dots: true,
                  arrows: false,
                },
              },
              {
                breakpoint: 993,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  dots: true,
                  arrows: false,
                },
              },
              {
                breakpoint: 769,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
                  arrows: false,
                },
              },
            ],
          });
      } else {
        console.log("Slick element already initialized or not found");
      }
    };

    // 延迟初始化，确保 DOM 元素存在
    const timeoutId = setTimeout(() => {
      initSlick();
    }, 100);

    // 清理定时器
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    // <!-- START SECTION PROPERTIES FOR SALE -->
    <section className="recently portfolio featured bg-white-1 rec-pro">
      <div className="container-fluid">
        <div className="row">
          <div className="section-title col-md-5 pl-44">
            <h3>Real Estate</h3>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="portfolio col-xl-12 p-0">
          <div className="slick-lancers">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="agents-grid"
                data-aos="fade-up"
                data-aos-delay={150 + index * 100}
              >
                {title === "Residential" ? (
                  <>
                    <Heart id={property.id} />
                    <div className="landscapes listing-item compact thehp-1">
                      <a
                        href="#"
                        className="recent-16"
                        onClick={() => handleCardClick(property.id)}
                      >
                        <div
                          className="recent-img16 img-fluid img-center"
                          style={{
                            backgroundImage: `url(${property.image})`,
                          }}
                        />
                        <div className="recent-content" />
                        <div className="listing-badges">
                          <span>{property.type}</span>
                        </div>
                        <div className="recent-details">
                          <div className="recent-title">
                            {truncate(property.title, { length: 15 })}
                          </div>
                          <div className="recent-price mb-3">
                            {formatPrice(property.price)}
                          </div>
                          <div className="house-details thehp-1">
                            <i className="fa fa-bed mr-1" aria-hidden="true" />{" "}
                            {property.facilities.bedrooms} Bed <span>|</span>{" "}
                            <i className="fa fa-bath mr-1" aria-hidden="true" />{" "}
                            {property.facilities.bathrooms} Bath <span>|</span>{" "}
                            <i
                              className="fa fa-object-group mr-1"
                              aria-hidden="true"
                            />{" "}
                            {property.lotSize ? `${property.lotSize}` : "N/A "}
                          </div>
                        </div>
                      </a>
                    </div>
                  </>
                ) : title === "Franchise" ? (
                  <>
                    <div className="landscapes listing-item compact thehp-1">
                      <a
                        className="recent-16"
                        onClick={() => handleCardClick(property.id)}
                      >
                        <div
                          className="recent-img16 img-fluid img-center"
                          style={{
                            backgroundImage: `url(${property.image})`,
                          }}
                        />
                        <div className="recent-content" />

                        <div className="recent-details">
                          <div className="recent-title">{property.title}</div>
                        </div>
                      </a>
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    // <!-- END SECTION PROPERTIES FOR SALE -->
  );
};

export default PropertyGrid;
