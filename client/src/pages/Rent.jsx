import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import useProperty from "../Hook/useProperty";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Rent = () => {
  const { data, isError, isLoading } = useProperty();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [propertyType, setPropertyType] = useState(""); // 新增状态
  const [priceRange, setPriceRange] = useState("");
  const itemsPerPage = 10; // Show one item per page

  const navigate = useNavigate();

  useEffect(() => {
    // Add class on mount
    document.body.classList.add(
      "inner-pages",
      "homepage-4",
      "agents",
      "list",
      "hp-6",
      "full",
      "hd-white",
      "int_white_bg"
    );

    // Remove class on unmount
    return () => {
      document.body.classList.remove(
        "inner-pages",
        "homepage-4",
        "agents",
        "list",
        "hp-6",
        "full",
        "hd-white",
        "int_white_bg"
      );
    };
  }, []);

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

  const propertyForRent = data
    .filter((item) => item.type === "Rent")
    .filter(
      (property) =>
        property.title.toLowerCase().includes(filter.toLowerCase()) ||
        property.city.toLowerCase().includes(filter.toLowerCase()) ||
        property.country.toLowerCase().includes(filter.toLowerCase())
    )
    .filter((property) => {
      // 确保返回布尔值
      if (propertyType) {
        return property.propertyType
          .toLowerCase()
          .includes(propertyType.toLowerCase());
      }
      return true; // 如果没有选择类型，则不过滤
    })
    .filter((property) => {
      const price = property.price; // 确保你的数据模型中有 price 字段
      if (priceRange === "under_1400") {
        return price < 1400;
      } else if (priceRange === "1400_to_2000") {
        return price >= 1400 && price <= 2000;
      } else if (priceRange === "over_2000") {
        return price > 2000;
      }
      return true; // 如果没有选择价格范围，则不过滤
    });

  const totalPage = Math.ceil(propertyForRent.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = propertyForRent.slice(offset, offset + itemsPerPage);
  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  return (
    <div id="wrapper">
      <div className="clearfix"></div>
      <section className="properties-list full featured portfolio blog">
        <div className="container">
          <section className="headings-2 pt-0 pb-0">
            <div className="pro-wrapper">
              <div className="detail-wrapper-body">
                <div className="listing-title-bar">
                  <div className="text-heading text-left">
                    <p>
                      <a href="/">Home </a> &nbsp;/&nbsp;{" "}
                      <span>Buy Listings</span>
                    </p>
                  </div>
                  <h3>List View</h3>
                </div>
              </div>
            </div>
          </section>
          {/* Search Form */}
          <div className="col-12 px-0 parallax-searchs">
            <div className="banner-search-wrap">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tabs_1">
                  <div className="rld-main-search">
                    <div className="row">
                      <div className="rld-single-input">
                        <input
                          type="text"
                          placeholder="Search by title/city/country"
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                        />
                      </div>
                      <div className="rld-single-select ml-22">
                        <select
                          className="select single-select"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                        >
                          <option value="">Property Type</option>
                          <option value="House">House</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Condo">Condo</option>
                        </select>
                      </div>
                      <div className="rld-single-select">
                        <select
                          className="select single-select"
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value)}
                        >
                          <option value="">Select Price Range</option>
                          <option value="under_1400">Under $1400</option>
                          <option value="1400_to_2000">$1400 - $2000</option>
                          <option value="over_2000">Over $2000</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*/ End Search Form */}
          <section className="headings-2 pt-0">
            <div className="pro-wrapper">
              <div className="detail-wrapper-body">
                <div className="listing-title-bar">
                  <div className="text-heading text-left">
                    <p className="font-weight-bold mb-0 mt-3">
                      {propertyForRent.length} Search results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="page-container">
            <div className="container">
              {currentPageData.map((property) => (
                <div
                  className="row featured portfolio-items mb-4"
                  key={property.id}
                >
                  <div
                    className="item col-lg-4 col-md-12 col-xs-12 landscapes sale pr-0 pb-0"
                    data-aos="fade-up"
                  >
                    <div
                      className="project-single mb-0 bb-0"
                      onClick={() => handleCardClick(property.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="project-inner project-head">
                        <div className="homes">
                          {/* homes img */}
                          <a
                            className="homes-img"
                            onClick={() => handleCardClick(property.id)}
                          >
                            <img
                              src={property.image}
                              alt={`home-${property.id}`}
                              className="img-responsive"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* homes content */}
                  <div
                    className="col-lg-8 col-md-12 homes-content pb-0 mb-44"
                    data-aos="fade-up"
                  >
                    {/* homes address */}
                    <h3
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <a onClick={() => handleCardClick(property.id)}>
                        {property.title}
                      </a>
                      <span style={{ marginLeft: "auto", fontWeight: "bold" }}>
                        ${property.price.toLocaleString("en-CA")} Per Month
                      </span>
                    </h3>
                    <p className="homes-address mb-3">
                      <i className="fa fa-map-marker" />
                      <span>{property.address}</span>
                    </p>
                    {/* homes List */}
                    <ul className="homes-list clearfix pb-3">
                      <li className="the-icons">
                        <i className="flaticon-bed mr-2" aria-hidden="true" />
                        <span>
                          {property.facilities.bedrooms
                            ? property.facilities.bedrooms
                            : "0"}{" "}
                          Bedrooms
                        </span>
                      </li>
                      <li className="the-icons">
                        <i
                          className="flaticon-bathtub mr-2"
                          aria-hidden="true"
                        />
                        <span>
                          {property.facilities.bathrooms
                            ? property.facilities.bathrooms
                            : "0"}{" "}
                          Bathrooms
                        </span>
                      </li>
                      <li className="the-icons">
                        <i
                          className="flaticon-square mr-2"
                          aria-hidden="true"
                        />
                        <span>
                          {property.livingSpace ? property.livingSpace : "N/A"}{" "}
                          sq ft
                        </span>
                      </li>
                      <li className="the-icons">
                        <i className="flaticon-car mr-2" aria-hidden="true" />
                        <span>
                          {property.facilities.parking
                            ? property.facilities.parking
                            : "0"}{" "}
                          parking
                        </span>
                      </li>
                    </ul>
                    <div className="footer">
                      <a href="contact">Jiesi Zhou</a>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rent;
