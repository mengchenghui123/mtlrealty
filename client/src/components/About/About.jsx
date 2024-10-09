import React, { useEffect } from "react";

export const About = () => {
  useEffect(() => {
    document.body.classList.add("inner-pages", "hd-white");
  }, []);

  return (
    <>
      {/* Section Headings */}
      <section className="headings" style={{ background: "black" }}>
        <div className="text-heading text-center">
          <div className="container">
            <h1>About Our Company</h1>
            <h2>
              <a href="/">Home</a> &nbsp;/&nbsp; About Us
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
                  About <span>Find Houses</span>
                </h2>
              </div>
              <div className="pftext">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum odio id voluptatibus incidunt cum? Atque quasi eum
                  debitis optio ab. Esse itaque officiis tempora possimus odio
                  rerum aperiam ratione, sunt. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit sunt.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum odio id voluptatibus incidunt cum? Atque quasi eum
                  debitis optio ab. Esse itaque officiis tempora possimus odio
                  rerum aperiam ratione, sunt. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit sunt.
                </p>
              </div>
              <div className="box bg-2">
                <a
                  href="about.html"
                  className="text-center button button--moema button--text-thick button--text-upper button--size-s"
                >
                  Read More
                </a>
                <img
                  src="signature-example.png"
                  className="ml-5"
                  alt="signature"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-xs-12">
              <div className="wprt-image-video w50">
                <img alt="image" src="bg-video.jpg" />
                <a
                  className="icon-wrap popup-video popup-youtube"
                  href="https://www.youtube.com/watch?v=2xHQqYRcrx4"
                >
                  <i className="fa fa-play"></i>
                </a>
                <div className="iq-waves">
                  <div className="waves wave-1"></div>
                  <div className="waves wave-2"></div>
                  <div className="waves wave-3"></div>
                </div>
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
                title: "Wide Range Of Properties",
                text: "Lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.",
              },
              {
                icon: "icon-5.svg",
                title: "Trusted by thousands",
                text: "Lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.",
              },
              {
                icon: "icon-6.svg",
                title: "Financing made easy",
                text: "Lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.",
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
      {/* Section Team */}
      <section className="team">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>Our </span>Team
            </h2>
            <p>We provide full service at every step.</p>
          </div>
          <div className="row team-all">
            {[
              {
                name: "Carls Jhons",
                role: "Financial Advisor",
                image: "t-5.jpg",
              },
              { name: "Arling Tracy", role: "Acountant", image: "t-5.jpg" },
              { name: "Mark Web", role: "Founder & CEO", image: "t-5.jpg" },
              { name: "Katy Grace", role: "Team Leader", image: "t-5.jpg" },
            ].map((member, index) => (
              <div
                key={index}
                className={`col-lg-3 col-md-6 team-pro ${
                  index >= 2 ? "pb-none" : ""
                }`}
              >
                <div className="team-wrap">
                  <div className="team-img">
                    <img src={member.image} alt="" />
                  </div>
                  <div className="team-content">
                    <div className="team-info">
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                      <div className="team-socials">
                        <ul>
                          <li>
                            <a href="#" title="facebook">
                              <i
                                className="fa fa-facebook"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <a href="#" title="twitter">
                              <i
                                className="fa fa-twitter"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <a href="#" title="instagram">
                              <i
                                className="fa fa-instagram"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <span>
                        <a href="team-details.html">View Profile</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Testimonials */}
      <section className="testimonials home18 bg-white">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>Clients </span>Testimonials
            </h2>
            <p>We collect reviews from our customers.</p>
          </div>
          <div className="owl-carousel style3">
            {[
              {
                name: "Lisa Smith",
                location: "New York",
                stars: 5,
                image: "images/testimonials/ts-1.jpg",
                text: "Lorem ipsum dolor sit amet...",
              },
              {
                name: "Jhon Morris",
                location: "Los Angeles",
                stars: 4.5,
                image: "images/testimonials/ts-2.jpg",
                text: "Lorem ipsum dolor sit amet...",
              },
              // Add other testimonials here
            ].map((testimony, index) => (
              <div key={index} className="test-1 pb-0 pt-0">
                <img src={testimony.image} alt="" />
                <h3 className="mt-3 mb-0">{testimony.name}</h3>
                <h6 className="mt-1">{testimony.location}</h6>
                <ul className="starts text-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <li key={i}>
                      <i
                        className={`fa ${
                          i < testimony.stars ? "fa-star" : "fa-star-o"
                        }`}
                      ></i>
                    </li>
                  ))}
                </ul>
                <p>{testimony.text}</p>
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
