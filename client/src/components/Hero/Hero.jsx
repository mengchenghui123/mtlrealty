import { useEffect } from "react";
import useProperty from "../../Hook/useProperty";
import { PuffLoader } from "react-spinners";

const Hero = () => {
  const { data, isError, isLoading } = useProperty();
  useEffect(() => {
    if (!isLoading && !isError && data.length > 0) {
      new Swiper(".swiper-container", {
        speed: 1000,
        loop: true,
        autoplay: false,
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    } else {
      console.log("initializing data");
    }
  }, [isLoading, isError, data]);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error loading Properties</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="puffloaderStyle" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const heroProperty = data
    .filter((property) => property.type === "Sale" || property.type === "Rent")
    .slice(0, 5);

  return (
    <div className="int_content_wraapper int_content_left">
      {/*===Start Revolution Slider===*/}
      <div className="int_banner_slider">
        <div className="banner_box_wrapper">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 align-self-center">
                <div className="main_contentblock">
                  <div className="swiper-container" data-aos="fade-right">
                    <div className="swiper-wrapper">
                      {heroProperty.map((property) => (
                        <div className="swiper-slide" key={property.id}>
                          <div className="swiper_imgbox imgbox1">
                            <div className="swipper_img">
                              <h4>
                                For {property.type} <span>REALTY</span>
                              </h4>
                              <h2>{property.title}</h2>
                              <h3>
                                ${property.price.toLocaleString("en-US")}
                                <span className="banner_span1" />
                              </h3>
                              <p>
                                <i className="fa fa-map-marker mr-3" />
                                {property.address}
                              </p>
                              <ul className="homes-list clearfix">
                                <li>
                                  <i className="fa fa-bed" aria-hidden="true" />
                                  <span>{property.facilities.bedrooms}</span>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-bath"
                                    aria-hidden="true"
                                  />
                                  <span>{property.facilities.bathrooms}</span>
                                </li>
                                <li>
                                  <i
                                    className="fa fa-object-group"
                                    aria-hidden="true"
                                  />
                                  <span>{property.livingSpace} sq ft</span>
                                </li>
                                <li>
                                  <i
                                    className="fas fa-warehouse"
                                    aria-hidden="true"
                                  />
                                  <span>{property.parking || 0}</span>
                                </li>
                              </ul>
                              <a
                                href={`/property/${property.id}`}
                                className="int_btn"
                              >
                                View Property{" "}
                                <span className="btn_caret">
                                  <i className="fas fa-caret-right" />
                                </span>
                              </a>
                              <h1>MTL</h1>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-7 align-self-center pr-0">
                {/*=== Swiper ===*/}
                <div className="main_imgblock">
                  <div className="swiper-container" data-aos="fade-left">
                    <div className="swiper-wrapper">
                      {heroProperty.map((property) => (
                        <div className="swiper-slide" key={property.id}>
                          <div className="swiper_contbox">
                            <div className="swipper_conntent">
                              <img
                                src={property.image || "error"}
                                className="img-fluid "
                                alt="images"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=== Add Arrows ===*/}
            <div className="banner_navi">
              <div className="swiper-button-next">Next</div>
              <div className="swiper-button-prev">Prev</div>
            </div>
          </div>
        </div>
      </div>
      {/*===End Revolution Slider===*/}
    </div>
  );
};

export default Hero;
