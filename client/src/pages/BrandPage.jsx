import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFranchise from "../Hook/useFranchise";

import emailjs from "emailjs-com";

const BrandPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useFranchise();

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
      "sin-1",
      "homepage-4",
      "hd-white",
      "int_white_bg",
      "about"
    );

    // Cleanup on unmount
    return () => {
      document.body.classList.remove(
        "inner-pages",
        "sin-1",
        "homepage-4",
        "hd-white",
        "int_white_bg",
        "about"
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

  if (isLoading || !data) {
    return <div style={{ height: "60vh" }} />;
  }

  const franchise = data.find((p) => p.id === id);
  if (!franchise) {
    return (
      <div className="container mt-5">
        <h2>franchise Not Found</h2>
      </div>
    );
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

  const convertToDownloadLink = (shareLink) => {
    console.log(shareLink);
    const regex = /\/d\/(.*?)(\/|$)/;
    const match = shareLink.match(regex);

    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    return shareLink;
  };

  return (
    <div id="wrapper">
      <div className="clearfix"></div>
      <div className="single-property-4">
        <div className="container-fluid p0">
          <div className="row">
            <div className="col-sm-6 col-lg-6 p0">
              <div className="row m0">
                <div className="col-lg-12 p0">
                  <div className="popup-images">
                    <a className="popup-img">
                      <img
                        className="img-fluid w100"
                        src={franchise.image}
                        alt="waiting"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-6 p0">
              <div className="row m0">
                <div className="col-sm-6 col-lg-6 p0">
                  <div className="popup-images">
                    <a className="popup-img">
                      <img
                        className="img-fluid w100"
                        src={franchise.images[0]}
                        alt="waiting"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-6 p0">
                  <div className="popup-images">
                    <a className="popup-img">
                      <img
                        className="img-fluid w100"
                        src={franchise.images[1]}
                        alt="waiting"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-6 p0">
                  <div className="popup-images">
                    <a className="popup-img">
                      <img
                        className="img-fluid w100"
                        src={franchise.images[2]}
                        alt="waiting"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-6 p0">
                  <div className="popup-images">
                    <a className="popup-img">
                      <img
                        className="img-fluid w100"
                        src={franchise.images[3]}
                        alt="waiting"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                          <h3>
                            {franchise.title}{" "}
                            <span
                              onClick={() => {
                                const downloadLink = convertToDownloadLink(
                                  franchise.manual
                                );
                                window.open(downloadLink, "_blank");
                              }}
                              className="mrg-l-5 category-tag"
                              style={{ cursor: "pointer" }} // 添加指针样式，表示可以点击
                            >
                              Download Manual
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* Star Description */}
                  <div className="blog-info details mb-30">
                    <h5 className="mb-4">Description</h5>
                    <p className="mb-3">{franchise.description}</p>
                  </div>
                  {/* End Description */}
                </div>
              </div>
              {/* Star Property Details */}
              <div className="single homes-content details mb-30">
                {/* title */}
                <h5 className="mb-4">Brand Details</h5>
                <ul className="homes-list clearfix">
                  <li>
                    <span className="font-weight-bold mr-1">Size:</span>
                    <span className="det">{franchise.size}</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Rent:</span>
                    <span className="det">{franchise.rent}</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Investment:</span>
                    <span className="det">{franchise.investment}</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">
                      Franchise Fee:
                    </span>
                    <span className="det">${franchise.franchiseFee}</span>
                    {franchise.taxed === false ? " + tax" : ""}
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Sales:</span>
                    <span className="det">{franchise.sales}</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Target People</span>
                    <span className="det">{franchise.targetPeople}</span>
                  </li>
                </ul>
                {/* title */}
              </div>
              <div className="floor-plan property wprt-image-video w50 pro">
                <h5>Current Location</h5>
                <img alt="image" src={franchise.maps[0] || "image"} />
              </div>

              <div className="property-location map">
                <h5>Location Opportunities</h5>
                <img alt="image" src={franchise.maps[1] || "image"} />
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
                            {franchise.agentInfo.name}
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
                            <a>{franchise.agentInfo.phone}</a>
                          </li>
                          <li>
                            <span className="la la-envelope-o">
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              />
                            </span>
                            <a>{franchise.agentInfo.email}</a>
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

export default BrandPage;
