import { useEffect } from "react";
import { toast } from "react-toastify";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import { formatPrice } from '../../utils/Common';

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

  useEffect(() => {
    console.log(properties[1]);
    const initSlick = () => {
      const $ = window.jQuery;
      if ($ && $('.slick-lancers').length) {
        $('.slick-lancers').slick({
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          adaptiveHeight: true,
          responsive: [{
            breakpoint: 1292,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: true,
              arrows: false
            }
          }, {
            breakpoint: 993,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: true,
              arrows: false
            }
          }, {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false
            }
          }]
        });
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
            <h3>Properties</h3>
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
                      <div className="recent-title">{truncate(property.title, { length: 15 })}</div>
                      <div className="recent-price mb-3">{formatPrice(property.price)}</div>
                      <div className="house-details thehp-1">
                        <i className="fa fa-bed mr-1" aria-hidden="true" />{" "}
                        {property.facilities.bedrooms} Bed <span>|</span>{" "}
                        <i className="fa fa-bath mr-1" aria-hidden="true" />{" "}
                        {property.facilities.bathrooms} Bath <span>|</span>{" "}
                        <i className="fa fa-object-group mr-1" aria-hidden="true" />{" "}
                        {property.facilities.area}
                      </div>

                    </div>
                    <div className="view-proper">View Details</div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    // <!-- END SECTION PROPERTIES FOR SALE -->
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
