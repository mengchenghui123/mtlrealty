import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCommercial from "../Hook/useCommercial";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

const CommercialDetail = () => {
  const { data, isError, isLoading } = useCommercial();
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    phone_number: "",
    message: "",
    date: "",
    address: "",
  });

  useEffect(() => {
    document.body.classList.add("inner-pages", "int_white_bg", "hd-white");

    return () => {
      document.body.classList.remove("inner-pages", "int_white_bg", "hd-white");
    };
  }, [id]);

  if (isLoading || !data) {
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

  const commercial = data.find((p) => p.id === id);
  if (!commercial) {
    return (
      <div className="container mt-5">
        <h2>commercial Not Found</h2>
      </div>
    );
  }

  const batches = [];
  const images = commercial.images || [];
  for (let i = 0; i < images.length; i += 4) {
    const currentBatch = images.slice(i, i + 4);
    while (currentBatch.length < 4) {
      currentBatch.push(...images.slice(0, 4 - currentBatch.length));
    }
    batches.push(currentBatch);
  }

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
    <section className="single-proper blog details">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 blog-pots">
            <div className="row">
              <div className="col-md-12">
                <section className="headings-2 pt-0">
                  <div className="pro-wrapper">
                    <div className="detail-wrapper-body">
                      <div className="listing-title-bar">
                        <h3>{commercial.title}</h3>

                        <div className="mt-0">
                          <a
                            href="#listing-location"
                            className="listing-address"
                          >
                            <i className="fa fa-map-marker pr-2 ti-location-pin mrg-r-5" />
                            {commercial.address}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="single detail-wrapper mr-2">
                      <div className="detail-wrapper-body">
                        <div className="listing-title-bar">
                          <h4>${commercial.price.toLocaleString("en-US")}</h4>
                          <div className="mt-0"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div
                  id="listingDetailsSlider"
                  className="carousel listing-details-sliders slide mb-30"
                >
                  <h5 className="mb-4">Gallery</h5>
                  <div className="carousel-inner">
                    {batches[currentBatchIndex].map((image, index) => (
                      <div
                        key={index}
                        className={`${
                          index === 0 ? "active" : ""
                        } item carousel-item`}
                        data-slide-number={index}
                      >
                        <img
                          src={image}
                          className="img-fluid"
                          alt={`slider-listing-${index}`}
                        />
                      </div>
                    ))}
                  </div>

                  <a
                    className="carousel-control left"
                    href="#listingDetailsSlider"
                    data-slide="prev"
                  >
                    <i className="fa fa-angle-left" />
                  </a>
                  <a
                    className="carousel-control right"
                    href="#listingDetailsSlider"
                    data-slide="next"
                  >
                    <i className="fa fa-angle-right" />
                  </a>

                  <ul className="carousel-indicators smail-listing list-inline">
                    {batches[currentBatchIndex].map((image, index) => (
                      <li
                        key={index}
                        className={`list-inline-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <a
                          id={`carousel-selector-${index}`}
                          className={`${index === 0 ? "selected" : ""}`}
                          data-slide-to={index}
                          data-target="#listingDetailsSlider"
                        >
                          <img
                            src={image}
                            className="img-fluid"
                            alt={`listing-small-${index}`}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="carousel-pagination">
                    {batches.map((_, pageIndex) => (
                      <button
                        key={pageIndex}
                        className={`page-btn ${
                          currentBatchIndex === pageIndex ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(pageIndex)}
                      >
                        {pageIndex + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="blog-info details mb-30">
                  <h5 className="mb-4">Description</h5>
                  <p className="mb-3">{commercial.description}</p>
                </div>
              </div>
            </div>
            <div className="single homes-content details mb-30">
              {/* title */}
              <h5 className="mb-4">Commercial Details</h5>
              <ul className="homes-list clearfix">
                <li>
                  <span className="font-weight-bold mr-1">Annual Revenue:</span>
                  <span className="det">{commercial.annualRevenue}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">
                    Property Investment:
                  </span>
                  <span className="det">{commercial.totalInvestment}</span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">Area:</span>
                  <span className="det">
                    {commercial.Area ? `${commercial.Area} sqft` : "N/A"}
                  </span>
                </li>
                <li>
                  <span className="font-weight-bold mr-1">
                    Estimate Profit:
                  </span>
                  <span className="det">
                    {commercial.estimatedProfit
                      ? `${commercial.estimatedProfit} sqft`
                      : "N/A "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <aside className="col-lg-4 col-md-12 car">
            <div className="single widget">
              {/* Start: Schedule a Tour */}

              {/* End: Schedule a Tour */}
              {/* end author-verified-badge */}
              <div className="sidebar">
                <div className="widget-boxed mt-33 mt-5">
                  <div className="widget-boxed-header">
                    <h4>Agent Information</h4>
                  </div>
                  <div className="widget-boxed-body">
                    <div className="sidebar-widget author-widget2">
                      <div className="author-box clearfix">
                        <h4 className="author__title">
                          {commercial.agentInfo.name}
                        </h4>
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
                          <a>{commercial.agentInfo.phone}</a>
                        </li>
                        <li>
                          <span className="la la-envelope-o">
                            <i className="fa fa-envelope" aria-hidden="true" />
                          </span>
                          <a>{commercial.agentInfo.email}</a>
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
  );
};

export default CommercialDetail;
