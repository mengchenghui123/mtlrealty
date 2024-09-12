import Introduce from "../components/Introduce/Introduce";
import FeaturedListing from "../components/FeaturedListing/FeaturedListing";
import InquiryForm from "../components/InquiryForm/InquiryForm";
import useProperty from "../Hook/useProperty";
import { useEffect } from "react";

const Franchise = () => {
  const { data, isError, isLoading } = useProperty();

  useEffect(() => {
    document.body.classList.add("inner-pages", "hd-white", "about");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("inner-pages", "hd-white", "about");
    };
  }, []);

  return (
    <div id="wrapper">
      <div className="clearfix"></div>
      <section className="headings">
        <div className="text-heading text-center">
          <div className="container">
            <h1>About Our Company</h1>
            <h2>
              <a href="/">Home </a> &nbsp;/&nbsp; About Us
            </h2>
          </div>
        </div>
      </section>
      <section className="about-us fh">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 who-1">
              <div>
                <h2 className="text-left mb-4">
                  FRANCHISE <span>OPPOTTUNITIES</span>
                </h2>
              </div>
              <div className="pftext">
                <p>
                  We welcome all like-minded partners to become our franchisees
                  and together we can create a better future.
                </p>
                <p>
                  We provide franchisees with a sustainable franchise model and
                  strong support in areas including operations, systems and
                  marketing.
                </p>
                <p>
                  Becoming a franchisee offers a brand-new start for your
                  business and another milestone in your career development. We
                  are confident that our collaboration will contribute to the
                  brand's sustainable growth and achieve win-win results.
                </p>
              </div>
              <div className="box bg-2">
                <img src="images/signature.png" className="ml-5" alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-xs-12">
              <img alt="image" src="https://i.imgur.com/zXAqUXD.png" />
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works bg-white-2">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>HEADQUARTERS </span>FUNCTIONS
            </h2>
          </div>
          <div className="row service-1">
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv"
              data-aos="fade-up"
            >
              <div className="serv-flex">
                <div className="art-1 img-13">
                  <img src="https://i.imgur.com/7fOdsUR.png" alt="" />
                  <h3>Brand Incluence</h3>
                </div>
              </div>
            </article>
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv"
              data-aos="fade-up"
            >
              <div className="serv-flex">
                <div className="art-1 img-14">
                  <img src="https://i.imgur.com/hIB3u9V.png" alt="" />
                  <h3>Training&Marketing Support</h3>
                </div>
              </div>
            </article>
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv mb-0 pt"
              data-aos="fade-up"
            >
              <div className="serv-flex arrow">
                <div className="art-1 img-15">
                  <img src="https://i.imgur.com/xBljgZs.png" alt="" />
                  <h3>Supply Chain Capabilities</h3>
                </div>
              </div>
            </article>
            <article
              className="col-lg-4 col-md-6 col-xs-12 serv mb-0 pt"
              data-aos="fade-up"
            >
              <div className="serv-flex arrow">
                <div className="art-1 img-15">
                  <img src="https://i.imgur.com/pqrJeWA.png" alt="" />
                  <h3>Standardization System</h3>
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
                <i className="fa fa-home" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">300</p>
                  <h3>Sold Houses</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr">
                <i className="fa fa-list" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">400</p>
                  <h3>Daily Listings</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr mb-0">
                <i className="fa fa-users" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">250</p>
                  <h3>Expert Agents</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
              <div className="countr mb-0 last">
                <i className="fa fa-trophy" aria-hidden="true" />
                <div className="count-me">
                  <p className="counter text-left">200</p>
                  <h3>Won Awars</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team">
        <div className="container">
          <img src="https://i.imgur.com/zGYFrnA.png" alt="" />
        </div>
      </section>
      <section className="testimonials home18 bg-white">
        <div className="container">
          <img
            src="https://i.imgur.com/hnoQ80y.png"
            alt=""
            style={{ width: "80%", height: "auto", marginLeft: "15%" }}
          />
        </div>
      </section>
      <div className="partners bg-white-2">
        <div className="container">
          <div className="sec-title">
            <h2>
              <span>Our </span>Partners
            </h2>
            <p>The Companies That Represent Us.</p>
          </div>
          <div className="owl-carousel style2">
            <div className="owl-item">
              <img src="https://i.imgur.com/RWCvEfx.png" alt="" />
            </div>
            <div className="owl-item">
              <img src="https://i.imgur.com/DjmJcWx.png" alt="" />
            </div>
            <div className="owl-item">
              <img src="images/partners/13.jpg" alt="" />
            </div>
            <div className="owl-item">
              <img src="images/partners/14.jpg" alt="" />
            </div>
            <div className="owl-item">
              <img src="images/partners/15.jpg" alt="" />
            </div>
            <div className="owl-item">
              <img src="images/partners/16.jpg" alt="" />
            </div>
            <div className="owl-item">
              <img src="images/partners/17.jpg" alt="" />
            </div>
            <div className="owl-item">
              <img src="images/partners/11.jpg" alt="" />
            </div>
            <div className="owl-item">
              <img src="images/partners/12.jpg" alt="" />
            </div>
            <div className="owl-item">
              <img src="images/partners/13.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franchise;
