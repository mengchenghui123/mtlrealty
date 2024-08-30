import { useState, useEffect } from 'react';

const Hero = () => {
  const [properties] = useState([
    {
      type: "For Sale",
      estate: "Estate",
      title: "Luxury Villa House",
      price: "230,000",
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: "720 sq ft",
      garages: 2,
      image: "/wrapper2.png",
      bannerClass: "imgbox1",
    },
    {
      type: "For Rent",
      estate: "Estate",
      title: "Luxury Villa House",
      price: "4,600",
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: "720 sq ft",
      garages: 2,
      image: "/wrapper1.webp",
      bannerClass: "imgbox2",
    }
  ]);

  useEffect(() => {
    const initSwiper = () => {
      if (!window.Inland) {
        window.Inland = {
          initialised: false,
          version: 1.0,
          mobile: false,
          init: function () {
            if (!this.initialised) {
              this.initialised = true;
              this.BannerSlider();
            }
          },

          BannerSlider: function () {
            new window.Swiper('.banner_box_wrapper .swiper-container', {
              speed: 1000,
              loop: true,
              autoplay: false,
              slidesPerView: 1,
              navigation: {
                nextEl: '.banner_box_wrapper .swiper-button-next',
                prevEl: '.banner_box_wrapper .swiper-button-prev',
              },
            });
          }
        };
        window.Inland.init();
      }
    };

    setTimeout(() => {
      initSwiper();
    }, 0);

  }, []);

  return (
    <div className="int_content_wraapper int_content_left">
      <div className="int_banner_slider">
        <div className="banner_box_wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 align-self-center">
                <div className="main_contentblock">
                  <div className="swiper-container" data-aos="fade-right">
                    <div className="swiper-wrapper">
                      {properties.map((property, index) => (
                        <div className="swiper-slide" key={index}>
                          <div className={`swiper_imgbox ${property.bannerClass}`}>
                            <div className="swipper_img">
                              <h4>{property.type} <span>{property.estate}</span></h4>
                              <h2>{property.title}</h2>
                              <h3>${property.price}<span className="banner_span1"></span></h3>
                              <p><i className="fa fa-map-marker mr-3"></i>{property.location}</p>
                              <ul className="homes-list clearfix">
                                <li><i className="fa fa-bed" aria-hidden="true"></i><span>{property.bedrooms} Bedrooms</span></li>
                                <li><i className="fa fa-bath" aria-hidden="true"></i><span>{property.bathrooms} Bathrooms</span></li>
                                <li><i className="fa fa-object-group" aria-hidden="true"></i><span>{property.area}</span></li>
                                <li><i className="fas fa-warehouse" aria-hidden="true"></i><span>{property.garages} Garages</span></li>
                              </ul>
                              <a href="single-property-1.html" className="int_btn">View Property <span className="btn_caret"><i className="fas fa-caret-right"></i></span></a>
                              <h1>Real</h1>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-8 col-lg-8 col-md-7 align-self-center pr-0">
                <div className="main_imgblock">
                  <div className="swiper-container" data-aos="fade-left">
                    <div className="swiper-wrapper">
                      {properties.map((property, index) => (
                        <div className="swiper-slide" key={index}>
                          <div className="swiper_contbox">
                            <div className="swipper_conntent">
                              <img src={property.image} className="img-fluid" alt={property.title} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="banner_navi">
              <div className="swiper-button-next">Next</div>
              <div className="swiper-button-prev">Prev</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;