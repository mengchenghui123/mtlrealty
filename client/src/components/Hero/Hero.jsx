import { useState, useEffect } from 'react';


const Hero = () => {
  // const [properties] = useState([
  //   {
  //     type: "For Sale",
  //     estate: "Estate",
  //     title: "Luxury Villa House",
  //     price: "230,000",
  //     location: "Est St, 77 - Central Park South, NYC",
  //     bedrooms: 6,
  //     bathrooms: 3,
  //     area: "720 sq ft",
  //     garages: 2,
  //     image: "/wrapper2.png",
  //     bannerClass: "imgbox1",
  //   },
  //   {
  //     type: "For Rent",
  //     estate: "Estate",
  //     title: "Luxury Villa House",
  //     price: "4,600",
  //     location: "Est St, 77 - Central Park South, NYC",
  //     bedrooms: 6,
  //     bathrooms: 3,
  //     area: "720 sq ft",
  //     garages: 2,
  //     image: "/wrapper1.webp",
  //     bannerClass: "imgbox2",
  //   },
  // ]);

  // useEffect(() => {
  //   const initSwiper = () => {
  //     if (!window.Inland) {
  //       window.Inland = {
  //         initialised: false,
  //         version: 1.0,
  //         mobile: false,
  //         init: function () {
  //           if (!this.initialised) {
  //             this.initialised = true;
  //             this.BannerSlider();
  //           }
  //         },

  //         BannerSlider: function () {
  //           new window.Swiper(".banner_box_wrapper .swiper-container", {
  //             speed: 1000,
  //             loop: true,
  //             autoplay: false,
  //             slidesPerView: 1,
  //             navigation: {
  //               nextEl: ".banner_box_wrapper .swiper-button-next",
  //               prevEl: ".banner_box_wrapper .swiper-button-prev",
  //             },
  //           });
  //         },
  //       };
  //       window.Inland.init();
  //     }
  //   };

  //   setTimeout(() => {
  //     initSwiper();
  //   }, 0);
  // }, []);

  return (
    <div className="int_content_wraapper int_content_left">
      {/*===Start Revolution Slider===*/}
      <div className="int_banner_slider">
        <div className="banner_box_wrapper">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 align-self-center">
                <div className="main_contentblock">
                  <div className="swiper-container" data-aos="fade-right">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="swiper_imgbox imgbox1">
                          <div className="swipper_img">
                            <h4>
                              For Sale <span>Estate</span>
                            </h4>
                            <h2>Luxury Villa House</h2>
                            <h3>
                              $ 230,000
                              <span className="banner_span1" />
                            </h3>
                            <p>
                              <i className="fa fa-map-marker mr-3" />
                              Est St, 77 - Central Park South, NYC
                            </p>
                            {/* homes List */}
                            <ul className="homes-list clearfix">
                              <li>
                                <i className="fa fa-bed" aria-hidden="true" />
                                <span>6 Bedrooms</span>
                              </li>
                              <li>
                                <i className="fa fa-bath" aria-hidden="true" />
                                <span>3 Bathrooms</span>
                              </li>
                              <li>
                                <i
                                  className="fa fa-object-group"
                                  aria-hidden="true"
                                />
                                <span>720 sq ft</span>
                              </li>
                              <li>
                                <i
                                  className="fas fa-warehouse"
                                  aria-hidden="true"
                                />
                                <span>2 Garages</span>
                              </li>
                            </ul>
                            <a
                              href="single-property-1.html"
                              className="int_btn"
                            >
                              View Property{" "}
                              <span className="btn_caret">
                                <i className="fas fa-caret-right" />
                              </span>
                            </a>
                            <h1>Real</h1>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="swiper_imgbox imgbox2">
                          <div className="swipper_img">
                            <h4>
                              For Rent <span>Estate</span>
                            </h4>
                            <h2>Luxury Villa House</h2>
                            <h3>
                              $ 4,600
                              <span className="banner_span1" />
                            </h3>
                            <p>
                              <i className="fa fa-map-marker mr-3" />
                              Est St, 77 - Central Park South, NYC
                            </p>
                            {/* homes List */}
                            <ul className="homes-list clearfix">
                              <li>
                                <i className="fa fa-bed" aria-hidden="true" />
                                <span>6 Bedrooms</span>
                              </li>
                              <li>
                                <i className="fa fa-bath" aria-hidden="true" />
                                <span>3 Bathrooms</span>
                              </li>
                              <li>
                                <i
                                  className="fa fa-object-group"
                                  aria-hidden="true"
                                />
                                <span>720 sq ft</span>
                              </li>
                              <li>
                                <i
                                  className="fas fa-warehouse"
                                  aria-hidden="true"
                                />
                                <span>2 Garages</span>
                              </li>
                            </ul>
                            <a
                              href="single-property-1.html"
                              className="int_btn"
                            >
                              View Property{" "}
                              <span className="btn_caret">
                                <i className="fas fa-caret-right" />
                              </span>
                            </a>
                            <h1>Real</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-7 align-self-center pr-0">
                {/*=== Swiper ===*/}
                <div className="main_imgblock">
                  <div className="swiper-container" data-aos="fade-left">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="swiper_contbox">
                          <div className="swipper_conntent">
                            <img
                              src="images/slider/slider-8.png"
                              className="img-fluid "
                              alt="images"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="swiper_contbox">
                          <div className="swipper_conntent">
                            <img
                              src="images/slider/slider-9.png"
                              className="img-fluid"
                              alt="images"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=== Add Arrows ===*/}
            <div className="banner_navi">
              <div className="swiper-button-next">Next</div>
              <div className="swiper-button-prev">Prev</div>
            </div>
          </div>
        </div>
      </div>
      {/*===End Revolution Slider===*/}
    </div>
  );
};

export default Hero;
