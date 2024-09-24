import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFranchise from "../Hook/useFranchise";
import { PuffLoader } from "react-spinners";

const BrandPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useFranchise();

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

  const franchise = data.find((p) => p.id === id);
  if (!franchise) {
    return (
      <div className="container mt-5">
        <h2>franchise Not Found</h2>
      </div>
    );
  }

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
                    <a className="popup-img" href={franchise.image}>
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
                    <a className="popup-img" href="images/interior/p-2.png">
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
                    <a className="popup-img" href="images/interior/p-3.png">
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
                    <a className="popup-img" href="images/interior/p-4.png">
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
                    <a className="popup-img" href="images/interior/p-5.png">
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
                            <span className="mrg-l-5 category-tag">
                              Franchise
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
                          <img
                            src="images/testimonials/ts-1.jpg"
                            alt="author-image"
                            className="author__img"
                          />
                          <h4 className="author__title">Lisa Clark</h4>
                          <p className="author__meta">Agent of Property</p>
                        </div>
                        <ul className="author__contact">
                          <li>
                            <span className="la la-map-marker">
                              <i className="fa fa-map-marker" />
                            </span>
                            302 Av Park, New York
                          </li>
                          <li>
                            <span className="la la-phone">
                              <i className="fa fa-phone" aria-hidden="true" />
                            </span>
                            <a href="#">(234) 0200 17813</a>
                          </li>
                          <li>
                            <span className="la la-envelope-o">
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              />
                            </span>
                            <a href="#">lisa@gmail.com</a>
                          </li>
                        </ul>
                        <div className="agent-contact-form-sidebar">
                          <h4>Request Inquiry</h4>
                          <form
                            name="contact_form"
                            method="post"
                            action="functions.php"
                          >
                            <input
                              type="text"
                              id="fname"
                              name="full_name"
                              placeholder="Full Name"
                              required=""
                            />
                            <input
                              type="number"
                              id="pnumber"
                              name="phone_number"
                              placeholder="Phone Number"
                              required=""
                            />
                            <input
                              type="email"
                              id="emailid"
                              name="email_address"
                              placeholder="Email Address"
                              required=""
                            />
                            <textarea
                              placeholder="Message"
                              name="message"
                              required=""
                              defaultValue={""}
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
          {/* START SIMILAR PROPERTIES */}

          {/* END SIMILAR PROPERTIES */}
        </div>
      </section>
    </div>
  );
};

export default BrandPage;
