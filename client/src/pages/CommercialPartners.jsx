import React, { useEffect } from "react";

const CommercialPartners = () => {
  useEffect(() => {
    document.body.classList.add(
      "inner-pages",
      "hd-white",
      "about",
      "int_white_bg"
    );

    return () => {
      document.body.classList.remove(
        "inner-pages",
        "hd-white",
        "about",
        "int_white_bg"
      );
    };
  });
  return (
    <div id="wrapper">
      <div className="clearfix"></div>
      <section
        className="headings"
        style={{
          backgroundImage: 'url("https://i.imgur.com/HQuicMf.jpg")',
        }}
      ></section>
      <section className="about-us fh">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 who-1">
              <div>
                <h2 className="text-left mb-4">
                  About <span>Us</span>
                </h2>
              </div>
              <div className="pftext">
                <p>
                  We believe in the importance of building and maintaining
                  strong, positive relationships. That's why we collaborate with
                  more local developers and landlords. We are committed to
                  maximizing your investment, striving for better returns, and
                  meeting the needs of our clients
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-xs-12">
              <img alt="image" src="https://i.imgur.com/LbfxiVF.jpg" />
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works bg-white-2">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>Commercial </span>Partners
            </h2>
          </div>
          <img src="https://i.imgur.com/pjjNjHn.png" alt="" />
        </div>
      </section>
    </div>
  );
};

export default CommercialPartners;
