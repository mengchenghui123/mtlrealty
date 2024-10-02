const PropertyServices = () => {
  const services = [
    {
      iconClass: "fa fa-home",
      title: "Houses",
      description:
        "Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.",
      delay: 150,
    },
    {
      iconClass: "fas fa-building",
      title: "Apartments",
      description:
        "Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.",
      delay: 250,
    },
    {
      iconClass: "fas fa-warehouse",
      title: "Commercial",
      description:
        "Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.",
      delay: 350,
    },
    {
      iconClass: "fas fa-calculator",
      title: "Hotels",
      description:
        "Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.",
      delay: 450,
    },
  ];

  return (
    <>
      {/* START SECTION SERVICES */}
      <section className="services-home rec-pro">
        <div className="container-fluid">
          <div className="section-title">
            <h3>Property</h3>
            <h2>Services</h2>
          </div>
          <div className="row">
            {services.map((service, index) => (
              <div
                key={index}
                className={`col-lg-3 col-md-12 m-top-${
                  index === 0 ? 0 : 40
                } m-bottom-40`}
                data-aos="fade-up"
                data-aos-delay={service.delay}
              >
                <div className="service bg-light-2 border-1 border-light box-shadow-1 box-shadow-2-hover">
                  <div className="media">
                    <i
                      className={`${service.iconClass} bg-base text-white rounded-100 box-shadow-1 p-top-5 p-bottom-5 p-right-5 p-left-5`}
                    />
                  </div>
                  <div className="agent-section p-top-35 p-bottom-30 p-right-25 p-left-25">
                    <h4 className="m-bottom-15 text-bold-700">
                      {service.title}
                    </h4>
                    <p>{service.description}</p>
                    <a
                      className="text-base text-base-dark-hover text-size-13"
                      href="properties-full-list.html"
                    >
                      Read More <i className="fa fa-long-arrow-right ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END SECTION SERVICES */}
    </>
  );
};

export default PropertyServices;
