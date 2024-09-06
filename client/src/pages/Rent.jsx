import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import useProperty from "../Hook/useProperty";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Rent = () => {
  const { data, isError, isLoading } = useProperty();
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
      "hd-white"
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
        "hd-white"
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
    );
  const totalPage = Math.ceil(propertyForRent.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = propertyForRent.slice(offset, offset + itemsPerPage);
  const handleCardClick = (id) => {
    toast.success(`card with id ${id} clicked`);
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
                        <select className="select single-select">
                          <option value={1}>Property Type</option>
                          <option value={2}>Single Family</option>
                          <option value={3}>Apartment</option>
                          <option value={3}>Condo</option>
                        </select>
                      </div>
                      <div className="rld-single-select">
                        <select className="select single-select mr-0">
                          <option value={1}>Location</option>
                          <option value={2}>Ville-Marie</option>
                          <option value={3}>Brossard</option>
                          <option value={3}>Le Sud-Ouest</option>
                          <option value={3}>La Prairie</option>
                        </select>
                      </div>
                      {/* waiting for more option */}
                      <div className="dropdown-filter">
                        <span></span>
                      </div>
                      <div className="col-xl-2 col-lg-2 col-md-4 pl-0">
                        <a className="btn btn-yellow" href="#">
                          Search Now
                        </a>
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
              <div className="cod-pad single detail-wrapper mr-2 mt-0 d-flex justify-content-md-end align-items-center">
                <div className="input-group border rounded input-group-lg w-auto mr-4">
                  <label
                    className="input-group-text bg-transparent border-0 text-uppercase letter-spacing-093 pr-1 pl-3"
                    htmlFor="inputGroupSelect01"
                  >
                    <i className="fas fa-align-left fs-16 pr-2" />
                    Sortby:
                  </label>
                  <select
                    className="form-control border-0 bg-transparent shadow-none p-0 selectpicker sortby"
                    data-style="bg-transparent border-0 font-weight-600 btn-lg pl-0 pr-3"
                    id="inputGroupSelect01"
                    name="sortby"
                  >
                    <option value={1}>Top Selling</option>
                    <option value={2}>Most Viewed</option>
                    <option value={3}>Price(low to high)</option>
                    <option value={4}>Price(high to low)</option>
                  </select>
                </div>
                <div className="sorting-options">
                  <a href="#" className="change-view-btn active-view-btn">
                    <i className="fa fa-th-list" />
                  </a>
                  <a
                    href="properties-full-grid-1.html"
                    className="change-view-btn lde"
                  >
                    <i className="fa fa-th-large" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="page-container">
            <div className="container">
              {currentPageData.map((property) => (
                <div className="row featured portfolio-items" key={property.id}>
                  <div
                    className="item col-lg-4 col-md-12 col-xs-12 landscapes sale pr-0 pb-0"
                    data-aos="fade-up"
                  >
                    <div className="project-single mb-0 bb-0">
                      <div className="project-inner project-head">
                        <div className="homes">
                          {/* homes img */}
                          <a
                            href="#"
                            className="homes-img"
                            onClick={() => handleCardClick(property.id)}
                          >
                            <div className="homes-tag button alt featured">
                              Featured
                            </div>
                            <div className="homes-tag button alt sale">
                              For Rent
                            </div>
                            <div className="homes-price">
                              ${property.price.toLocaleString("en-CA")}
                            </div>
                            <img
                              src={property.image}
                              alt={`home-${property.id}`}
                              className="img-responsive"
                            />
                          </a>
                        </div>
                        <div className="button-effect">
                          <a
                            className="btn"
                            onClick={() => handleCardClick(property.id)}
                          >
                            <i className="fa fa-link" />
                          </a>

                          <a
                            href="single-property-2.html"
                            className="img-poppu btn"
                          >
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
                    <h3>
                      <a onClick={() => handleCardClick(property.id)}>
                        {property.title}
                      </a>
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
                      <a href="agent-details.html">JieSi Zhou</a>
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
