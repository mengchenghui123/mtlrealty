import React, { useEffect } from "react";

export const Footer = () => {
  useEffect(() => {
    document.body.className = "int_white_bg hd-white";

    // Cleanup on unmount
    return () => {
      document.body.className = "";
    };
  }, []);
  return (
    <footer className="first-footer rec-pro">
      <div className="top-footer bg-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="netabout">
                <a href="index.html" className="logo">
                  <img src="images/logo-black.svg" alt="netcom" />
                </a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                  incidunt architecto soluta laboriosam, perspiciatis,
                  aspernatur officiis esse.
                </p>
              </div>
              <div className="contactus">
                <ul>
                  <li>
                    <div className="info">
                      <i className="fa fa-map-marker" aria-hidden="true" />
                      <p className="in-p">95 South Park Avenue, USA</p>
                    </div>
                  </li>
                  <li>
                    <div className="info">
                      <i className="fa fa-phone" aria-hidden="true" />
                      <p className="in-p">+456 875 369 208</p>
                    </div>
                  </li>
                  <li>
                    <div className="info">
                      <i className="fa fa-envelope" aria-hidden="true" />
                      <p className="in-p ti">support@findhouses.com</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
