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

  const commercialForRent = data.filter(
    (property) =>
      property.title.toLowerCase().includes(filter.toLowerCase()) ||
      property.city.toLowerCase().includes(filter.toLowerCase()) ||
      property.country.toLowerCase().includes(filter.toLowerCase())
  );
  const totalPage = Math.ceil(commercialForRent.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = commercialForRent.slice(
    offset,
    offset + itemsPerPage
  );
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
                      <span>Commercial Listings</span>
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
                      {commercialForRent.length} Search results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default CommercialLeasing;
