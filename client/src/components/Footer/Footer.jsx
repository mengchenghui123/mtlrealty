import React, { useEffect } from "react";

export const Footer = () => {
  return (
    <div id="wrapper" className="int_main_wraapper">
      <footer className="first-footer rec-pro">
        <div className="top-footer bg-white">
          <div className="container-fluid">
            <div className="row justify-content-center">
              {" "}
              {/* 使用 justify-content-center 居中对齐 */}
              <div className="col-lg-4 col-md-6">
                <div className="netabout">
                  <a className="logo">
                    <img src="https://i.imgur.com/awa2U2i.png" alt="netcom" />
                  </a>
                </div>
                <div className="contactus">
                  <ul>
                    <li>
                      <div className="info">
                        <i className="fa fa-map-marker" aria-hidden="true" />
                        <p className="in-p">2015 Rue Drummond, Montreal</p>
                      </div>
                    </li>
                    <li>
                      <div className="info">
                        <i className="fa fa-phone" aria-hidden="true" />
                        <p className="in-p">+514-262-7709</p>
                      </div>
                    </li>
                    <li>
                      <div className="info">
                        <i className="fa fa-envelope" aria-hidden="true" />
                        <p className="in-p ti">jzhou@sothebysrealty.ca</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="navigation">
                  <h3>Navigation</h3>
                  <div className="nav-footer">
                    <ul>
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/sell">Sale</a>
                      </li>
                      <li>
                        <a href="/buy">Buy</a>
                      </li>
                      <li>
                        <a href="rent">Rent</a>
                      </li>
                      <li className="no-mgb">
                        <a href="franchise">Franchise</a>
                      </li>
                    </ul>
                    <ul className="nav-right">
                      <li>
                        <a href="BusinessForSale">Commercial Leasing</a>
                      </li>
                      <li>
                        <a href="CommercialPartner">Commercial Partner</a>
                      </li>
                      <li>
                        <a href="about">About Us</a>
                      </li>
                      <li>
                        <a href="brands">Franchise Brands</a>
                      </li>
                      <li className="no-mgb">
                        <a href="contact">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="widget">
                  <h3>Get In Touch</h3>
                  <div className="twitter-widget contuct">
                    <div className="twitter-area">
                      <div className="single-item">
                        <div className="text">
                          <p>
                            We provide the latest listing for buying, selling,
                            renting properties, as well as information on
                            business sales and franchise opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="second-footer bg-white-1 rec-pro">
          <div className="container-fluid sd-f">
            <p>2024 © Copyright - All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
