import React, { useEffect, useState } from "react";
import useFranchise from "../Hook/useFranchise";
import { PuffLoader } from "react-spinners";
import Pagination from "../components/Pagination/Pagination";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Brands = () => {
  const { data, isError, isLoading } = useFranchise();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Show one item per page
  const navigate = useNavigate();
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

  const totalPage = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);
  const handleCardClick = (id) => {
    toast.success(`card with id ${id} clicked`);
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
                  <h3>Our Agencies</h3>
                </div>
              </div>
            </div>
          </section>
          <div className="row">
            <div className="col-lg-8 col-md-12 blog-pots">
              <section className="headings-2 pt-0">
                <div className="pro-wrapper">
                  <div className="detail-wrapper-body">
                    <div className="listing-title-bar">
                      <div className="text-heading text-left">
                        <p className="font-weight-bold mb-0 mt-3">
                          {data.length} Search results
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
                    <div className="project-single">
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
                            <a
                              onClick={() => handleCardClick(item.id)}
                              style={{ cursor: "pointer" }}
                            >
                              {item.title}
                            </a>
                          </h3>
                          <ul className="the-agents-details">
                            <li>Size: {item.size}</li>
                            <li>Rent: {item.rent}</li>
                            <li>Investment {item.investment}</li>
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
                          <p className="author__meta">Agent of Property</p>
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
