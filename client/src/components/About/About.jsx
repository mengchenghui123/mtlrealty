import React, { useEffect } from "react";

export const About = () => {
  useEffect(() => {
    document.body.classList.add("inner-pages", "hd-white");
  }, []);

  return (
    <>
      {/* Section Headings */}
      <section
        className="headings"
        style={{
          width: "100%", // 设置宽度为100%
          height: "400px", // 设置高度为400px
          backgroundImage: "url('https://i.imgur.com/rOKxuFU.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-heading text-center">
          {" "}
          {/* 这里设置为显眼的颜色 */}
          <div className="container">
            <h1 style={{ color: "#FF5733" }}>About Our Company</h1>
            <h2>
              <a href="/" style={{ color: "#FF5733", textDecoration: "none" }}>
                Home
              </a>{" "}
              &nbsp;/&nbsp;
              <span style={{ color: "#FF5733" }}>About Us</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Section About Us */}
      <section className="about-us fh">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 who-1">
              <div>
                <h2 className="text-left mb-4">
                  About <span>MTL Realty</span>
                </h2>
              </div>
              <div className="pftext">
                <p>
                  MTLREALTY is a leading real estate company specializing in
                  property leasing and sales, offering a wide range of
                  commercial and residential solutions.
                </p>
                <p>
                  Our expertise extends beyond traditional real estate services
                  to include business sales and franchise chains, ensuring that
                  our clients receive comprehensive support for all their
                  property and business investment needs.
                </p>
                <p>
                  With a strong commitment to excellence and customer
                  satisfaction, MTLREALTY provides tailored services that help
                  clients successfully navigate the complexities of the real
                  estate market. Our dedicated team is driven to deliver
                  top-notch results, making MTLREALTY a trusted partner in
                  achieving your property and business goals.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-xs-12">
              <div className="wprt-image-video w50">
                <img alt="image" src="https://i.imgur.com/nVPCKCa.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Why Choose Us */}
      <section className="how-it-works bg-white-2">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>Why </span>Choose Us
            </h2>
            <p>We provide full service at every step.</p>
          </div>
          <div className="row service-1">
            {[
              {
                icon: "icon-4.svg",
                title: "Residential Rent, Buy and Sell",
                text: "Our team ensures that whether you are renting, buying, or selling, the process is efficient, transparent, and tailored to your unique needs.",
              },
              {
                icon: "icon-5.svg",
                title: "Commercial leasing",
                text: "Our team offers personalized solutions to help you find the perfect location for your business operations.",
              },
              {
                icon: "icon-6.svg",
                title: "Franchise Chains",
                text: "Whether you're launching a new franchise or expanding an established brand, our team provides comprehensive support to ensure successful operations and growth.",
              },
            ].map((service, index) => (
              <article
                key={index}
                className="col-lg-4 col-md-6 col-xs-12 serv"
                data-aos="fade-up"
              >
                <div className="serv-flex">
                  <div className={`art-1 img-${index + 13}`}>
                    <img src={service.icon} alt="" />
                    <h3>{service.title}</h3>
                  </div>
                  <div className="service-text-p">
                    <p className="text-center">{service.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Counter Up */}
      <section className="counterup">
        <div className="container">
          <div className="row">
            {[
              { icon: "fa-home", count: 300, title: "Sold Houses" },
              { icon: "fa-list", count: 400, title: "Daily Listings" },
              { icon: "fa-users", count: 250, title: "Expert Agents" },
              { icon: "fa-trophy", count: 200, title: "Won Awards" },
            ].map((counter, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-xs-12">
                <div
                  className={`countr ${index >= 2 ? "mb-0" : ""} ${
                    index === 3 ? "last" : ""
                  }`}
                >
                  <i className={`fa ${counter.icon}`} aria-hidden="true"></i>
                  <div className="count-me">
                    <p className="counter text-left">{counter.count}</p>
                    <h3>{counter.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Partners */}
    </>
  );
};

export default About;
