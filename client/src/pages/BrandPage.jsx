import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const BrandPage = () => {
  const { brand } = useParams();
  const brandData = {
    yangguofu: {
      title: "Brand 1",
      description: "Description for yangguofu",
      imageUrl: "https://i.imgur.com/RWCvEfx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    chimaek: {
      title: "Brand 2",
      description: "Description for chimaek",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    tori: {
      title: "Brand 2",
      description: "Description for tori",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    chickenplus: {
      title: "Brand 2",
      description: "Description for chickenplus",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    yifang: {
      title: "Brand 2",
      description: "Description for yifang",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    chungchun: {
      title: "Brand 2",
      description: "Description for chungchun",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    pho: {
      title: "Brand 2",
      description: "Description for pho",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    cnt: {
      title: "Brand 2",
      description: "Description for cnt",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    k2: {
      title: "Brand 2",
      description: "Description for k2",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    clawmee: {
      title: "Brand 2",
      description: "Description for clawmee",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    lepetitsao: {
      title: "Brand 2",
      description: "Description for pho",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    meetfresh: {
      title: "Brand 2",
      description: "Description for meetfresh",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    lanzhou: {
      title: "Brand 2",
      description: "Description for lanzhou",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    lepoke: {
      title: "Brand 2",
      description: "Description for lepoke",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    clawville: {
      title: "Brand 2",
      description: "Description for clawville",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    deargarden: {
      title: "Brand 2",
      description: "Description for deargarden",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    shuyi: {
      title: "Brand 2",
      description: "Description for shuyi",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    sushisama: {
      title: "Brand 2",
      description: "Description for sushisama",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    heytea: {
      title: "Brand 2",
      description: "Description for heytea",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    burgerking: {
      title: "Brand 2",
      description: "Description for burgerking",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    ganadara: {
      title: "Brand 2",
      description: "Description for ganadara",
      imageUrl: "https://i.imgur.com/lKAI3Cg.jpg",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
    presotea: {
      title: "Brand 2",
      description: "Description for presotea",
      imageUrl: "https://i.imgur.com/DjmJcWx.png",
      imageUrl1: "https://i.imgur.com/Fp71E5j.png",
      imageUrl2: "https://i.imgur.com/xrExzgz.png",
      imageUrl3: "https://i.imgur.com/tcSNKzD.jpg",
      imageUrl4: "https://i.imgur.com/mnA7gy3.jpg",
    },
  };
  // 添加更多品牌数据

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

  // 获取当前品牌的数据
  const data = brandData[brand] || {
    title: "Brand Not Found",
    description: "No description available.",
    imageUrl: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    imageUrl4: "",
  };
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
                    <a className="popup-img" href="images/interior/p-1.png">
                      <img
                        className="img-fluid w100"
                        src={data.imageUrl}
                        alt=""
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
                        src={data.imageUrl1}
                        alt=""
                        style={{ height: "325px" }}
                      />
                    </a>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-6 p0">
                  <div className="popup-images">
                    <a className="popup-img" href="images/interior/p-3.png">
                      <img
                        className="img-fluid w100"
                        src={data.imageUrl2}
                        alt=""
                        style={{ height: "325px" }}
                      />
                    </a>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-6 p0">
                  <div className="popup-images">
                    <a className="popup-img" href="images/interior/p-4.png">
                      <img
                        className="img-fluid w100"
                        src={data.imageUrl3}
                        alt=""
                        style={{ height: "325px" }}
                      />
                    </a>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-6 p0">
                  <div className="popup-images">
                    <a className="popup-img" href="images/interior/p-5.png">
                      <img
                        className="img-fluid w100"
                        src={data.imageUrl4}
                        alt=""
                        style={{ height: "325px" }}
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
                            Luxury Villa House{" "}
                            <span className="mrg-l-5 category-tag">
                              For Sale
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* Star Description */}
                  <div className="blog-info details mb-30">
                    <h5 className="mb-4">Description</h5>
                    <p className="mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Cum rerum beatae consequatur, totam fugit, alias fuga
                      aliquam quod tempora a nisi esse magnam nulla quas! Error
                      praesentium, vero dolorum laborum. Lorem ipsum dolor sit
                      amet, consectetur adipisicing elit. Cum rerum beatae
                      consequatur, totam fugit.
                    </p>
                    <p className="mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Cum rerum beatae consequatur, totam fugit, alias fuga
                      aliquam quod tempora a nisi esse magnam nulla quas! Error
                      praesentium, vero dolorum laborum. Lorem ipsum dolor sit
                      amet, consectetur adipisicing elit. Cum rerum beatae
                      consequatur, totam fugit.
                    </p>
                    <p className="mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Cum rerum beatae consequatur, totam fugit, alias fuga
                      aliquam quod tempora a nisi esse magnam nulla quas! Error
                      praesentium, vero dolorum laborum. Lorem ipsum dolor sit
                      amet, consectetur adipisicing elit. Cum rerum beatae
                      consequatur, totam fugit.
                    </p>
                  </div>
                  {/* End Description */}
                </div>
              </div>
              {/* Star Property Details */}
              <div className="single homes-content details mb-30">
                {/* title */}
                <h5 className="mb-4">Property Details</h5>
                <ul className="homes-list clearfix">
                  <li>
                    <span className="font-weight-bold mr-1">Property ID:</span>
                    <span className="det">V254680</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">
                      Property Type:
                    </span>
                    <span className="det">House</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">
                      Property status:
                    </span>
                    <span className="det">For Sale</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">
                      Property Price:
                    </span>
                    <span className="det">$230,000</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Rooms:</span>
                    <span className="det">6</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Bedrooms:</span>
                    <span className="det">7</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Bath:</span>
                    <span className="det">4</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Garages:</span>
                    <span className="det">2</span>
                  </li>
                  <li>
                    <span className="font-weight-bold mr-1">Year Built:</span>
                    <span className="det">10/6/2020</span>
                  </li>
                </ul>
                {/* title */}
              </div>
              <div className="floor-plan property wprt-image-video w50 pro">
                <h5>Floor Plans</h5>
                <img alt="image" src="images/bg/floor-plan-1.png" />
              </div>

              <div className="property-location map">
                <h5>Location</h5>
                <div className="divider-fade" />
                <div id="map-contact" className="contact-map" />
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
                              defaultValue="Submit Request"
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
