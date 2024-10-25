import React, { useEffect, useState } from "react";
import useFranchise from "../Hook/useFranchise";
import Pagination from "../components/Pagination/Pagination";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const Brands = () => {
  const { data, isError, isLoading } = useFranchise();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Show one item per page
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [franchiseRange, setFranchiseRange] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    phone_number: "",
    message: "",
    date: "",
    address: "",
  });
  useEffect(() => {
    document.body.classList.add(
      "inner-pages",
      "agents",
      "homepage-4",
      "hd-white",
      "int_white_bg"
    );
    // Cleanup on unmount
    return () => {
      document.body.classList.remove(
        "inner-pages",
        "agents",
        "homepage-4",
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
    .filter((item) => item.title.toLowerCase().includes(filter.toLowerCase()))
    .filter((item) => {
      if (item.franchiseFee) {
        if (franchiseRange === "under_100000") {
          return item.franchiseFee < 100000;
        } else if (franchiseRange === "100000_to_200000") {
          return item.franchiseFee > 100000 && item.franchiseFee < 200000;
        } else if (franchiseRange === "200000_to_300000") {
          return item.franchiseFee > 200000 && item.franchiseFee < 300000;
        } else if (franchiseRange === "300000_to_400000") {
          return item.franchiseFee > 400000 && item.franchiseFee < 500000;
        } else if (franchiseRange === "400000_to_500000") {
          return item.franchiseFee > 400000 && item.franchiseFee < 500000;
        } else if (franchiseRange === "500000_to_600000") {
          return item.franchiseFee > 500000 && item.franchiseFee < 600000;
        } else if (franchiseRange === "600000_to_700000") {
          return item.franchiseFee > 600000 && item.franchiseFee < 700000;
        } else if (franchiseRange === "700000_to_800000") {
          return item.franchiseFee > 700000 && item.franchiseFee < 800000;
        } else if (franchiseRange === "over_800000") {
          return item.franchiseFee > 800000;
        }
      }
      return true;
    });

  const totalPage = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);
  const handleCardClick = (id) => {
    navigate(`/brands/${id}`);
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_q33lpyn",
        "template_0h18zpb",
        formData,
        "k6e91nsNgaMtTME-P"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <div id="wrapper">
      <div className="clearfix"></div>
      <section className="properties-right featured portfolio blog pt-5">
        <div className="container">
          <section className="headings-2 pt-0 pb-55">
            <div className="pro-wrapper">
              <div className="detail-wrapper-body">
                <div className="listing-title-bar">
                  <div className="text-heading text-left">
                    <p className="pb-2">
                      <a href="/">Home </a> &nbsp;/&nbsp; <span>Brands</span>
                    </p>
                  </div>
                  <h3>Franchise Listing</h3>
                </div>
              </div>
            </div>
          </section>

          {/*/ Search Form */}
          <div className="col-12 px-0 parallax-searchs">
            <div className="banner-search-wrap">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tabs_1">
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
                        value={franchiseRange}
                        onChange={(e) => setFranchiseRange(e.target.value)}
                      >
                        <option value="">Franchise Fee</option>
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
                        <option value="600000_to_700000">
                          $600000 - $700000
                        </option>
                        <option value="700000_to_800000">
                          $700000 - $800000
                        </option>
                        <option value="over_800000">Over $800000</option>
                      </select>
                    </div>

                    {/* waiting for more option */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*/ End Search Form */}
          <div className="row">
            <div className="col-lg-8 col-md-12 blog-pots">
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
              <div className="row">
                {currentPageData.map((item) => (
                  <div
                    className="item col-lg-6 col-md-6 col-xs-12 people rent"
                    key={item.id}
                  >
                    <div
                      className="project-single"
                      onClick={() => handleCardClick(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="project-inner project-head">
                        <div className="homes">
                          {/* homes img */}
                          <a className="homes-img">
                            <img
                              src={item.image}
                              alt="home-1"
                              className="img-responsive"
                            />
                          </a>
                        </div>
                      </div>
                      {/* homes content */}
                      <div className="homes-content">
                        {/* homes address */}
                        <div className="the-agents">
                          <h3>
                            <a style={{ cursor: "pointer" }}>{item.title}</a>
                          </h3>
                          <ul className="the-agents-details">
                            <li>Size: {item.size}</li>
                            <li>Rent: {item.rent}</li>
                            <li>Franchise Fee: ${item.franchiseFee}</li>
                          </ul>
                        </div>
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
            <aside className="col-lg-4 col-md-12 car">
              <div className="single widget">
                <div className="sidebar">
                  <div className="widget-boxed mt-33 mt-5">
                    <div className="widget-boxed-header">
                      <h4>Agent Information</h4>
                    </div>
                    <div className="widget-boxed-body">
                      <div className="sidebar-widget author-widget2">
                        <div className="author-box clearfix">
                          <h4 className="author__title">Jiesi Zhou</h4>
                          <p className="author__meta">Real Estate Broker</p>
                        </div>
                        <ul className="author__contact">
                          <li>
                            <span className="la la-map-marker">
                              <i className="fa fa-map-marker" />
                            </span>
                            2015 Rue Drummond
                          </li>
                          <li>
                            <span className="la la-phone">
                              <i className="fa fa-phone" aria-hidden="true" />
                            </span>
                            <a>514-262-7709</a>
                          </li>
                          <li>
                            <span className="la la-envelope-o">
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              />
                            </span>
                            <a>richard@mengchenghui.com</a>
                          </li>
                        </ul>
                        <div className="agent-contact-form-sidebar">
                          <h4>Request Inquiry</h4>
                          <form name="contact_form" onSubmit={handleSubmit}>
                            <input
                              type="text"
                              id="fname"
                              name="full_name"
                              placeholder="Full Name"
                              value={formData.full_name}
                              onChange={handleFormChange}
                              required
                            />
                            <input
                              type="number"
                              id="pnumber"
                              name="phone_number"
                              placeholder="Phone Number"
                              value={formData.phone_number}
                              onChange={handleFormChange}
                              required
                            />
                            <input
                              type="email"
                              id="emailid"
                              name="email_address"
                              placeholder="Email Address"
                              value={formData.email_address}
                              onChange={handleFormChange}
                              required
                            />
                            <textarea
                              placeholder="Message"
                              name="message"
                              required=""
                              value={formData.message}
                              onChange={handleFormChange}
                            />
                            <input
                              type="submit"
                              name="sendmessage"
                              className="multiple-send-message"
                              value="Submit Request"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;
