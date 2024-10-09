import React, { useEffect } from "react";

export const Footer = () => {
  return (
    <div id="wrapper" className="int_main_wraapper">
      <footer className="first-footer rec-pro">
        <div className="top-footer bg-white">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="netabout">
                  <a href="index.html" className="logo">
                    <img
                      src="https://i.imgur.com/awa2U2i.png"
                      alt="netcom"
                      style={{ height: "40%", width: "40%" }}
                    />
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
                        <p className="in-p ti">richard@mengchenghui.com</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
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
                        <a href="CommercialLeasing">Commercial Leasing</a>
                      </li>
                      <li>
                        <a href="CommercialPartner">Commercial Partner</a>
                      </li>
                      <li>
                        <a href="about">about</a>
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
              <div className="col-lg-3 col-md-6">
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
              <div className="col-lg-3 col-md-6">
                <div className="newsletters">
                  <h3>Newsletters</h3>
                  <p>
                    Sign Up for Our Newsletter to get Latest Updates and Offers.
                    Subscribe to receive news in your inbox.
                  </p>
                </div>
                <form
                  className="bloq-email mailchimp form-inline"
                  method="post"
                >
                  <label htmlFor="subscribeEmail" className="error"></label>
                  <div className="email">
                    <input
                      type="email"
                      id="subscribeEmail"
                      name="EMAIL"
                      placeholder="Enter Your Email"
                    />
                    <input type="submit" value="Subscribe" />
                    <p className="subscription-success"></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="second-footer bg-white-1 rec-pro">
          <div className="container-fluid sd-f">
            <p>2024 © Copyright - All Rights Reserved.</p>
            <ul className="netsocials">
              <li>
                <a href="#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-weixin" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-youtube" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
