import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/Common";
import Heart from "../Heart/Heart";

const PropertyGrid = ({ properties, title }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1);
  const handleCardClick = (id) => {
    if (title === "Residential") {
      navigate(`/property/${id}`);
    } else if (title === "Franchise") {
      navigate(`/brands/${id}`);
    } else if (title === "Commercial") {
      navigate(`/commercial/${id}`);
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

  const getFirstThreeWords = (title) => {
    return title.split(" ").slice(0, 3).join(" ");
  };

  return (
    <section className="recently portfolio featured bg-white-1 rec-pro">
      <div className="container-fluid">
        <div className="row">
          <div className="section-title col-md-5 pl-44">
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
                  <div className="landscapes listing-item compact thehp-1">
                    <div
                      className="recent-16"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCardClick(property.id)}
                    >
                      <div
                        className="recent-img16 img-fluid img-center"
                        style={{
                          backgroundImage: `url(${property.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat", // 防止图片重复
                          backgroundPosition: "center", // 图片居中显示
                          height: "100%", // 设置容器高度，可以根据需求调整
                          width: "100%", // 设置宽度为100%，适应容器
                          position: "relative", // 设置为相对定位
                        }}
                      ></div>

                      <div className="recent-content" />
                      <div className="listing-badges">
                        <span>{property.type}</span>
                        <div
                          style={{
                            position: "absolute", // 绝对定位确保在图片上层
                            top: "10px", // 距离顶部 10px
                            right: "10px", // 距离右边 10px
                            zIndex: 2, // 确保按钮在图片上方
                          }}
                        >
                          <Heart id={property.id} />
                        </div>
                      </div>
                      <div className="recent-details">
                        <div className="recent-title">
                          {getFirstThreeWords(property.title)}
                        </div>
                        <div className="recent-price mb-3">
                          {formatPrice(property.price)}
                          {property.type === "Rent" ? " / Month" : ""}
                          {property.type === "Sale" && property.taxed === false
                            ? " + tax"
                            : ""}
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
                    </div>
                  </div>
                ) : title === "Franchise" ? (
                  <div className="landscapes listing-item compact thehp-1">
                    <div
                      className="recent-16"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCardClick(property.id)}
                    >
                      <div
                        className="recent-img16 img-fluid img-center"
                        style={{
                          backgroundImage: `url(${property.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat", // 防止图片重复
                          backgroundPosition: "center", // 图片居中显示
                          height: "100%", // 设置容器高度，可以根据需求调整
                          width: "100%", // 设置宽度为100%，适应容器
                          position: "relative", // 设置为相对定位
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute", // 绝对定位确保在图片上层
                          top: "10px", // 距离顶部 10px
                          right: "10px", // 距离右边 10px
                          zIndex: 2, // 确保按钮在图片上方
                        }}
                      >
                        <Heart id={property.id} />
                      </div>
                      <div
                        className="recent-img16 img-fluid img-center"
                        style={{
                          backgroundImage: `url(${property.image})`,
                        }}
                      />
                      <div className="recent-content" />
                      <div className="recent-details">
                        <div className="recent-title">
                          {getFirstThreeWords(property.title)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : title === "Commercial" ? (
                  <div className="landscapes listing-item compact thehp-1">
                    <div
                      className="recent-16"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCardClick(property.id)}
                    >
                      <div
                        className="recent-img16 img-fluid img-center"
                        style={{
                          backgroundImage: `url(${property.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat", // 防止图片重复
                          backgroundPosition: "center", // 图片居中显示
                          height: "100%", // 设置容器高度，可以根据需求调整
                          width: "100%", // 设置宽度为100%，适应容器
                          position: "relative", // 设置为相对定位
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute", // 绝对定位确保在图片上层
                          top: "10px", // 距离顶部 10px
                          right: "10px", // 距离右边 10px
                          zIndex: 2, // 确保按钮在图片上方
                        }}
                      >
                        <Heart id={property.id} />
                      </div>
                      <div
                        className="recent-img16 img-fluid img-center"
                        style={{
                          backgroundImage: `url(${property.image})`,
                        }}
                      />
                      <div className="recent-content" />
                      <div className="recent-details">
                        <div className="recent-title">
                          {getFirstThreeWords(property.title)}
                        </div>
                        <div className="recent-price mb-3">
                          {formatPrice(property.price)}
                          {property.type === "Rent" ? " Per Month" : ""}
                          {property.taxed === false ? " + tax" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
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
