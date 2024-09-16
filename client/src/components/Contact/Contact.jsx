import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
// import "./Contact.css"

export const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    phone_number: "",
    message: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.body.classList.add("inner-pages", "hd-white", "int_white_bg");

    const address = "2015 Rue Drummond, Montreal";
    if (window.loadMapWithAddress) {
      window.loadMapWithAddress(address);
    }
    return () => {
      document.body.classList.remove("inner-pages", "hd-white", "int_white_bg");
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
    <>
      <div className="clearfix"></div>
      <section style={{}}>
        <div className="text-heading text-center">
          <div className="container">
            <h1>Contact Us</h1>
            <h2>
              <a href="index.html">Home </a> &nbsp;/&nbsp; Contact Us
            </h2>
          </div>
        </div>
      </section>

      <section className="contact-us">
        <div className="container">
          <div className="property-location mb-5">
            <h3>Our Location</h3>
            <div className="divider-fade" />
            <div id="map-contact" className="contact-map" />
          </div>
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
    </>
  );

  // return (
  //   <div className="contact-page">
  //     <div className="ContactPagecontainer" >
  //       <div className="row mb-5 mt-3 text-center">
  //         <div className="col-12">
  //           <h1 className="display-4 mb-4">
  //             Contact Me
  //           </h1>
  //         </div>
  //       </div>

  //       {/* get in touch */}
  //       <div className="contact-row sec-sp">
  //         <div className="col-lg-5 mb-5">
  //           <h3 className="color_sec py-4"> Get in Touch </h3>
  //           <address>
  //             <strong>Email: abc@gmail.com</strong>
  //             <br />
  //             <br />
  //             <p>
  //               <strong>Phone: 123-123-1234</strong>
  //             </p>
  //           </address>
  //         </div>

  //         {/* contact form */}
  //         <div className="col-lg-7 mb-5">
  //           <h3 className="color_sec py-4">Contact Form</h3>
  //           {showAlert && <div className="alert alert-success">
  //             Your message has been sent successfully
  //           </div>}
  //           <form onSubmit={handleSubmit}>
  //             <div className="form-group">
  //               <label htmlFor="name">Name</label>
  //               <input
  //                 type="text"
  //                 className="form-control"
  //                 id="name"
  //                 name="name"
  //                 value={formData.name}
  //                 onChange={handleChange}
  //                 required
  //               />
  //             </div>

  //             <div className="form-group">
  //               <label htmlFor="email">Email</label>
  //               <input
  //                 type="email"
  //                 className="form-control"
  //                 id="email"
  //                 name="email"
  //                 value={formData.email}
  //                 onChange={handleChange}
  //                 required
  //               />
  //             </div>

  //             <div className="form-group">
  //               <label htmlFor="email">Message</label>
  //               <textarea
  //                 className="form-control"
  //                 id="message"
  //                 name="message"
  //                 rows="5"
  //                 value={formData.message}
  //                 onChange={handleChange}
  //                 required>
  //               </textarea>
  //             </div>
  //             <button type="submit" className="btn btn-primary mt-3">Submit</button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Contact;
