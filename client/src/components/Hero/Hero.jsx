import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProperty from "../../Hook/useProperty";
import useCommercial from "../../Hook/useCommercial";
import useFranchise from "../../Hook/useFranchise";

import Swiper from "swiper/bundle";

const Hero = () => {
  const {
    data: commercialData,
    isError: commercialError,
    isLoading: commercialLoading,
  } = useCommercial();
  const { data, isError, isLoading } = useProperty();
  const {
    data: franchiseData,
    isError: franchiseError,
    isLoading: franchiseLoading,
  } = useFranchise();
  const navigate = useNavigate();

  const featuredProperties = [
    ...(commercialData
      ?.filter((property) => property.isFeature)
      .map((property) => ({
        ...property,
        typeTag: "Commercial", // 为商业物业添加标签
      })) || []),
    ...(data
      ?.filter((property) => property.isFeature)
      .map((property) => ({
        ...property,
        typeTag: "Residential", // 为住宅物业添加标签
      })) || []),
    ...(franchiseData
      ?.filter((property) => property.isFeature)
      .map((property) => ({
        ...property,
        typeTag: "Franchise", // 为特许经营物业添加标签
      })) || []),
  ];

  useEffect(() => {
    // 确保 Swiper 在数据加载完成后再初始化
    if (!isLoading && featuredProperties.length > 0) {
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
    }
  }, [isLoading, featuredProperties]);

  if (commercialError || isError || franchiseError) {
    return <div>Error loading properties.</div>;
  }

  const heroProperty = data
    ? data
        .filter(
          (property) => property.type === "Sale" || property.type === "Rent"
        )
        .slice(0, 5)
    : [];

  const handleCardClick = (property) => {
    switch (property.typeTag) {
      case "Residential":
        navigate(`/property/${property.id}`);
        break;
      case "Commercial":
        navigate(`/commercial/${property.id}`);
        break;
      case "Franchise":
        navigate(`/brands/${property.id}`);
        break;
      default:
        navigate(`/property/${property.id}`); // 默认情况下导航到住宅路径
        break;
    }
  };

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
                      {isLoading
                        ? Array(featuredProperties.length).fill(null)
                        : featuredProperties.map((property) => (
                            <div className="swiper-slide" key={property.id}>
                              <div className="swiper_imgbox imgbox1">
                                <div className="swipper_img">
                                  {property.typeTag === "Residential" && (
                                    <>
                                      <h4>
                                        For {property.type} <span>REALTY</span>
                                      </h4>
                                      <h2>{property.title}</h2>
                                      <h3>
                                        $
                                        {property.price.toLocaleString("en-US")}
                                        {property.type === "Rent"
                                          ? " / Month"
                                          : ""}
                                        <span className="banner_span1" />
                                      </h3>
                                      <p>
                                        <i className="fa fa-map-marker mr-3" />
                                        {property.address}
                                      </p>
                                      <ul className="homes-list clearfix">
                                        <li>
                                          <i
                                            className="fa fa-bed"
                                            aria-hidden="true"
                                          />
                                          <span>
                                            {property.facilities.bedrooms}
                                          </span>
                                        </li>
                                        <li>
                                          <i
                                            className="fa fa-bath"
                                            aria-hidden="true"
                                          />
                                          <span>
                                            {property.facilities.bathrooms}
                                          </span>
                                        </li>
                                        <li>
                                          <i
                                            className="fa fa-object-group"
                                            aria-hidden="true"
                                          />
                                          <span>
                                            {property.livingSpace} sq ft
                                          </span>
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
                                        className="int_btn"
                                        onClick={() =>
                                          handleCardClick(property)
                                        }
                                      >
                                        View Property{" "}
                                        <span className="btn_caret">
                                          <i className="fas fa-caret-right" />
                                        </span>
                                      </a>
                                      <h1>MTL</h1>
                                    </>
                                  )}

                                  {/* 商业物业的内容 */}

                                  {property.typeTag === "Commercial" && (
                                    <>
                                      <h4>
                                        {property.type} <span>REALTY</span>
                                      </h4>
                                      <h2>{property.title}</h2>
                                      <h3>
                                        $
                                        {property.price.toLocaleString("en-US")}
                                        {property.type === "Commercial Leasing"
                                          ? " / Month"
                                          : ""}
                                        {property.taxed ? " + tax" : ""}
                                        <span className="banner_span1" />
                                      </h3>
                                      <p>
                                        {property.type === "Commercial Leasing"
                                          ? property.address
                                          : ""}
                                      </p>
                                      <ul className="homes-list clearfix">
                                        <li>
                                          <span>{property.commercialType}</span>
                                        </li>
                                        <li>
                                          <span>{property.city}</span>
                                        </li>
                                      </ul>
                                      <a
                                        className="int_btn"
                                        onClick={() =>
                                          handleCardClick(property)
                                        }
                                      >
                                        View Property{" "}
                                        <span className="btn_caret">
                                          <i className="fas fa-caret-right" />
                                        </span>
                                      </a>
                                      <h1>MTL</h1>
                                    </>
                                  )}

                                  {/* 特许经营物业的内容 */}
                                  {property.typeTag === "Franchise" && (
                                    <>
                                      <h4>
                                        Franchise <span>REALTY</span>
                                      </h4>
                                      <h2>{property.title}</h2>
                                      <h3>
                                        $
                                        {property.franchiseFee.toLocaleString(
                                          "en-US"
                                        )}
                                        <span className="banner_span1" />
                                      </h3>
                                      <p>{property.targetPeople}</p>
                                      <ul className="homes-list clearfix">
                                        <li>
                                          <span>
                                            {property.rent &&
                                            property.rent !== "N/A"
                                              ? property.rent
                                              : ""}
                                          </span>
                                        </li>
                                        <li>
                                          <span>
                                            {property.size &&
                                            property.size !== "N/A"
                                              ? property.rent
                                              : ""}
                                          </span>
                                        </li>
                                      </ul>
                                      <a
                                        className="int_btn"
                                        onClick={() =>
                                          handleCardClick(property)
                                        }
                                      >
                                        View Property{" "}
                                        <span className="btn_caret">
                                          <i className="fas fa-caret-right" />
                                        </span>
                                      </a>
                                      <h1>MTL</h1>
                                    </>
                                  )}
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
                      {isLoading
                        ? Array(featuredProperties.length).fill(null)
                        : featuredProperties.map((property) => (
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
              {!isLoading && (
                <>
                  <div className="swiper-button-next">Next</div>
                  <div className="swiper-button-prev">Prev</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/*===End Revolution Slider===*/}
    </div>
  );
};

export default Hero;
