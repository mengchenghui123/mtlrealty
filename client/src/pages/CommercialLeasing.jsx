import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import useCommercial from "../Hook/useCommercial";
import { useNavigate } from "react-router-dom";

const CommercialLeasing = () => {
  const { data, isError, isLoading } = useCommercial();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [commercialType, setCommercialType] = useState(""); // 新增状态
  const [priceRange, setPriceRange] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
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

  const filteredData = data
    .filter((item) => item.type === "Commercial Leasing")
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
      const priceString = item.price; // 价格是字符串
      const priceNumber = parseFloat(priceString.replace(/[^\d.]/g, "")); // 提取数字部分并转换为浮点数

      if (priceString.includes("/sqft") && priceUnit === "sqft") {
        // 过滤每平方英尺的价格
        if (priceRange === "under_15_per_sqft") {
          return priceNumber < 15;
        } else if (priceRange === "15_to_20_per_sqft") {
          return priceNumber >= 15 && priceNumber <= 20;
        } else if (priceRange === "20_to_30_per_sqft") {
          return priceNumber >= 20 && priceNumber <= 30;
        } else if (priceRange === "30_to_40_per_sqft") {
          return priceNumber >= 30 && priceNumber <= 40;
        } else if (priceRange === "40_to_50_per_sqft") {
          return priceNumber >= 40 && priceNumber <= 50;
        } else if (priceRange === "50_to_60_per_sqft") {
          return priceNumber >= 50 && priceNumber <= 60;
        } else if (priceRange === "over_60_per_sqft") {
          return priceNumber > 60;
        }
      } else if (priceString.includes("/Month") && priceUnit === "Month") {
        // 过滤每月的租金
        if (priceRange === "under_1500_per_month") {
          return priceNumber < 1500;
        } else if (priceRange === "1500_to_2000_per_month") {
          return priceNumber >= 1500 && priceNumber <= 2000;
        } else if (priceRange === "2000_to_3000_per_month") {
          return priceNumber >= 2000 && priceNumber <= 3000;
        } else if (priceRange === "3000_to_4000_per_month") {
          return priceNumber >= 3000 && priceNumber <= 4000;
        } else if (priceRange === "4000_to_5000_per_month") {
          return priceNumber >= 4000 && priceNumber <= 5000;
        } else if (priceRange === "4000_to_5000_per_month") {
          return priceNumber >= 5000 && priceNumber <= 6000;
        } else if (priceRange === "over_6000_per_month") {
          return priceNumber > 6000;
        }
      }

      return true; // 如果没有匹配的价格单位，则不过滤
    })
    .filter((item) => {
      const priceString = item.price;

      if (priceUnit === "sqft") {
        return priceString.includes("/sqft"); // 只包含每平方英尺的价格
      } else if (priceUnit === "Month") {
        return priceString.includes("/Month"); // 只包含每月租金的价格
      }

      return true; // 如果没有选择价格单位，则不过滤
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
                      <span>Commercial Leasing</span>
                    </p>
                  </div>
                  <h3>List View</h3>
                </div>
              </div>
            </div>
          </section>
          {/*/  Search Form */}
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
                          value={priceUnit}
                          onChange={(e) => setPriceUnit(e.target.value)}
                        >
                          <option value="">Price Unit</option>
                          <option value="sqft">sqft</option>
                          <option value="Month">Month</option>
                        </select>
                      </div>
                      <div className="rld-single-select ml-22">
                        <select
                          className="select single-select"
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value)}
                        >
                          <option value="">Price Interval</option>
                          {priceUnit === "sqft" ? (
                            <>
                              <option value="under_15_per_sqft">
                                Under $15/sqft
                              </option>
                              <option value="15_to_20_per_sqft">
                                $15 - $20/sqft
                              </option>
                              <option value="20_to_30_per_sqft">
                                $20 - $30/sqft
                              </option>
                              <option value="30_to_40_per_sqft">
                                $30 - $40/sqft
                              </option>
                              <option value="40_to_50_per_sqft">
                                $40 - $50/sqft
                              </option>
                              <option value="50_to_60_per_sqft">
                                $50 - $60/sqft
                              </option>
                              <option value="over_60_per_sqft">
                                Over $60/sqft
                              </option>
                            </>
                          ) : (
                            <>
                              <option value="under_1500_per_month">
                                Under $1500/month
                              </option>
                              <option value="1500_to_2000_per_month">
                                $1500 - $2000/month
                              </option>
                              <option value="2000_to_3000_per_month">
                                $2000 - $3000/month
                              </option>
                              <option value="3000_to_4000_per_month">
                                $3000 - $4000/month
                              </option>
                              <option value="4000_to_5000_per_month">
                                $4000 - $5000/month
                              </option>
                              <option value="5000_to_6000_per_month">
                                $5000 - $6000/month
                              </option>
                              <option value="over_6000_per_month">
                                Over $6000/month
                              </option>
                            </>
                          )}
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
                        ${commercial.price.toLocaleString("en-CA")}
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

export default CommercialLeasing;
