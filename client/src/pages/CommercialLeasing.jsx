import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import useCommercial from "../Hook/useCommercial";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CommercialLeasing = () => {
  const { data, isError, isLoading } = useCommercial();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
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

  const commercialData = data;
  const totalPage = Math.ceil(commercialData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = commercialData.slice(offset, offset + itemsPerPage);
  const handleCardClick = (id) => {
    toast.success(`card with id ${id} clicked`);
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
                      <span>Commercial Listings</span>
                    </p>
                  </div>
                  <h3>List View</h3>
                </div>
              </div>
            </div>
          </section>

          {/*/ End Search Form */}
          <section className="headings-2 pt-0">
            <div className="pro-wrapper">
              <div className="detail-wrapper-body">
                <div className="listing-title-bar">
                  <div className="text-heading text-left">
                    <p className="font-weight-bold mb-0 mt-3">
                      {commercialData.length} Search results
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
                            <div
                              className="homes-tag button alt featured"
                              style={{ fontSize: "120%" }}
                            >
                              ${commercial.price.toLocaleString("en-CA")}
                            </div>
                            <div className="homes-tag button alt sale">
                              Retail
                            </div>

                            <img
                              src={commercial.image}
                              alt={`home-${commercial.id}`}
                              className="img-responsive"
                            />
                          </a>
                        </div>
                        <div className="button-effect">
                          <a
                            className="btn"
                            onClick={() => handleCardClick(commercial.id)}
                          >
                            <i className="fa fa-link" />
                          </a>

                          <a className="img-poppu btn">
                            <i className="fa fa-photo" />
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
                    <h3 style={{ cursor: "pointer" }}>
                      <a onClick={() => handleCardClick(commercial.id)}>
                        {commercial.title}
                      </a>
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
                      <a href="contact">JieSi Zhou</a>
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
