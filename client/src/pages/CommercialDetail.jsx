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
        </div>
      </div>
    </section>
  );
};

export default CommercialDetail;
