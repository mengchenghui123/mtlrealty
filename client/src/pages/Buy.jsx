import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFranchise from "../Hook/useFranchise";
import emailjs from "emailjs-com";

const Buy = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    phone_number: "",
    message: "",
  });

  useEffect(() => {
    document.body.classList.add(
      "inner-pages",
      "hd-white",
      "about",
      "int_white_bg"
    );
    // Cleanup on unmount
    return () => {
      document.body.classList.remove(
        "inner-pages",
        "hd-white",
        "about",
        "int_white_bg"
      );
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setShowAlert(true);
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
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: "",
          });
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <div id="wrapper">
      <div className="clearfix"></div>
      <section
        className="headings"
        style={{ backgroundImage: 'url("https://i.imgur.com/5d6uLes.png")' }}
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
                  Since 2018, with solid investment and project management
                  experience in the real estate sector, we have helped many
                  people successfully purchase their dream homes, providing
                  clients with a unique and powerful advantage.
                </p>
                <p>
                  Professionalism, integrity, and attention to detail are our
                  hallmarks. As skilled negotiators, we know how to close deals
                  and ensure client satisfaction, even in the most challenging
                  situations. Whether it's assisting sellers in selling their
                  properties or helping buyers find their dream homes, we
                  understand how to analyze the market comprehensively and
                  provide clients with the relevant information to make informed
                  decisions.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-xs-12">
              <img alt="image" src="https://i.imgur.com/R7KPVaV.png" />
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works bg-white-2">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>Property </span>Type
            </h2>
          </div>
          <div className="row service-1">
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv"
              data-aos="fade-up"
            >
              <div className="serv-flex">
                <div className="art-1 img-13">
                  <img src="https://i.imgur.com/YNK303f.png" alt="" />
                  <h3>House</h3>
                </div>
              </div>
            </article>
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv"
              data-aos="fade-up"
            >
              <div className="serv-flex">
                <div className="art-1 img-14">
                  <img src="https://i.imgur.com/U3hYPFd.png" alt="" />
                  <h3>Condo</h3>
                </div>
              </div>
            </article>
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv mb-0 pt"
              data-aos="fade-up"
            >
              <div className="serv-flex arrow">
                <div className="art-1 img-15">
                  <img src="https://i.imgur.com/HtURfHN.png" alt="" />
                  <h3>Plex</h3>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="counterup">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr">
                <i className="fa fa-trophy " aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">300</p>
                  <h3>Sold House</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr mb-0">
                <i className="fa fa-shopping-bag" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">400</p>
                  <h3>Listings</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr mb-0 last">
                <i className="fa fa-users" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">25</p>
                  <h3>Daily Client</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr mb-0 last">
                <i className="fa fa-trophy" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">7</p>
                  <h3>Years experience</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team">
        <div className="container">
          <div className="sec-title">
            <h2>
              Home
              <span> Buying </span>Process
            </h2>
          </div>
          <img
            src="https://i.imgur.com/n4g6Ax4.png"
            alt=""
            style={{ width: "60%", height: "60%", marginLeft: "20%" }}
          />
        </div>
      </section>
      <section className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h3 className="mb-4">Contact Us</h3>
              <form
                id="contactform"
                className="contact-form"
                name="contactform"
                method="post"
                noValidate=""
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="text"
                    required
                    className="form-control input-custom input-full"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    required=""
                    className="form-control input-custom input-full"
                    name="phone_number"
                    placeholder="Phone"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-custom input-full"
                    name="email_address"
                    placeholder="Email"
                    value={formData.email_address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control textarea-custom input-full"
                    id="ccomment"
                    name="message"
                    required=""
                    rows={8}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  id="submit-contact"
                  className="btn btn-primary btn-lg"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="col-lg-4 col-md-12 bgc">
              <div className="call-info">
                <h3>Contact Details</h3>
                <p className="mb-5">
                  Please find below contact details and contact us today!
                </p>
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
                  <li>
                    <div className="info cll">
                      <i className="fa fa-clock-o" aria-hidden="true" />
                      <p className="in-p ti">8:00 a.m - 9:00 p.m</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Buy;
