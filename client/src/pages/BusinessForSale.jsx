import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import useCommercial from "../Hook/useCommercial";
import { useNavigate } from "react-router-dom";

const BusinessForSale = () => {
  const { data, isError, isLoading } = useCommercial();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [commercialType, setCommercialType] = useState(""); // 新增状态
  const [priceRange, setPriceRange] = useState("");
  const itemsPerPage = 4; // Show one item per page

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
    return <div style={{ height: "60vh" }} />;
  }

  const commercialData = data;
  const filteredData = commercialData
    .filter((item) => item.type === "Business for Sale")
    .filter(
      (item) =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.city.toLowerCase().includes(filter.toLowerCase())
    )
    .filter((item) => {
      // 确保返回布尔值
      if (commercialType) {
        return item.commercialType
          .toLowerCase()
          .includes(commercialType.toLowerCase());
      }
      return true; // 如果没有选择类型，则不过滤
    })
    .filter((item) => {
      if (item.price) {
        if (priceRange === "under_100000") {
          return item.price < 100000;
        } else if (priceRange === "100000_to_200000") {
          return item.price > 100000 && item.price < 200000;
        } else if (priceRange === "200000_to_300000") {
          return item.price > 200000 && item.price < 300000;
        } else if (priceRange === "300000_to_400000") {
          return item.price > 300000 && item.price < 400000;
        } else if (priceRange === "400000_to_500000") {
          return item.price > 400000 && item.price < 500000;
        } else if (priceRange === "500000_to_600000") {
          return item.price > 500000 && item.price < 600000;
        } else if (priceRange === "over_600000") {
          return item.price > 600000;
        }
      }
      return true;
    });
  const totalPage = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);
  const handleCardClick = (id) => {
    navigate(`/commercial/${id}`);
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
                      <span>Business For Sale</span>
                    </p>
                  </div>
                  <h3>List View</h3>
                </div>
              </div>
            </div>
          </section>
          {/*/ Search Form */}
          <div className="col-12 px-0 parallax-searchs">
            <div className="banner-search-wrap">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tabs_1">
                  <div className="rld-main-search">
                    <div className="row">
                      <div className="rld-single-input">
                        <input
                          type="text"
                          placeholder="Search by title/city"
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                        />
                      </div>
                      <div className="rld-single-select ml-22">
                        <select
                          className="select single-select"
                          style={{ width: "300px" }}
                          value={commercialType}
                          onChange={(e) => setCommercialType(e.target.value)}
                        >
                          <option value="">Commercial Type</option>
                          <option value="Retail">Retail</option>
                          <option value="Office">Office</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Accounting">Accounting</option>
                          <option value="Advertising">Advertising</option>
                          <option value="Health">Health</option>
                          <option value="ChildCare">Child Care</option>
                          <option value="Education">Education</option>
                          <option value="Restaurant">Restaurant</option>
                          <option value="Hotel/Motel">Hotel/Motel</option>
                          <option value="Manufacturing">Manufacturing</option>
                        </select>
                      </div>
                      <div className="rld-single-select ml-22">
                        <select
                          className="select single-select"
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value)}
                        >
                          <option value="">Price Interval</option>
                          <option value="under_100000">Under $100000</option>
                          <option value="100000_to_200000">
                            $100000 - $200000
                          </option>
                          <option value="200000_to_300000">
                            $200000 - $300000
                          </option>
                          <option value="300000_to_400000">
                            $300000 - $400000
                          </option>
                          <option value="400000_to_500000">
                            $400000 - $500000
                          </option>
                          <option value="500000_to_600000">
                            $500000 - $600000
                          </option>
                          <option value="over_600000">Over $600000</option>
                        </select>
                      </div>

                      {/* waiting for more option */}
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
                      {filteredData.length} Search results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="page-container">
            <div className="container">
              {currentPageData.map((commercial) => (
                <div
                  className="row featured portfolio-items mb-4"
                  key={commercial.id}
                >
                  <div
                    className="item col-lg-4 col-md-12 col-xs-12 landscapes sale pr-0 pb-0"
                    data-aos="fade-up"
                  >
                    <div
                      className="project-single mb-0 bb-0"
                      onClick={() => handleCardClick(commercial.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="project-inner project-head">
                        <div className="homes">
                          {/* homes img */}
                          <a className="homes-img">
                            <img
                              src={commercial.image}
                              alt={`home-${commercial.id}`}
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
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <a onClick={() => handleCardClick(commercial.id)}>
                        {commercial.title}
                      </a>
                      <span style={{ marginLeft: "auto", fontWeight: "bold" }}>
                        ${Number(commercial.price).toLocaleString("en-CA")}
                        {commercial.taxed === false ? "+ tax" : ""}
                      </span>
                    </h3>
                    <p className="homes-address mb-3">
                      <i className="fa fa-map-marker" />
                      <span>{commercial.address}</span>
                    </p>
                    {/* homes List */}
                    <ul className="homes-list clearfix pb-3">
                      <li className="the-icons">
                        <i className="flaticon-bed mr-2" aria-hidden="true" />
                        <span> ${commercial.annualRevenue} Annual Revenue</span>
                      </li>
                      <li className="the-icons">
                        <i
                          className="flaticon-bathtub mr-2"
                          aria-hidden="true"
                        />
                        <span>
                          ${commercial.totalInvestment} Total Investment
                        </span>
                      </li>
                      <li className="the-icons">
                        <i
                          className="flaticon-square mr-2"
                          aria-hidden="true"
                        />
                        <span>{commercial.estimatedProfit} sq ft</span>
                      </li>
                      <li className="the-icons">
                        <i className="flaticon-car mr-2" aria-hidden="true" />
                        <span>{commercial.Area} Area</span>
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

export default BusinessForSale;
