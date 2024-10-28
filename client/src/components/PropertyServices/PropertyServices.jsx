const PropertyServices = () => {
  const services = [
    {
      iconClass: "fa fa-home",
      title: "Residential",
      description:
        "Our residential team is dedicated to helping clients discover their ideal home. Whether you are looking to buy, sell, or rent, we offer personalized consultations, extensive property listings, and expert guidance throughout the process. Our goal is to ensure that your home-buying or renting journey is smooth and enjoyable from start to finish.",
      delay: 150,
    },
    {
      iconClass: "fas fa-building",
      title: "Commercial",
      description:
        "For businesses in search of the perfect location, MTLRealty delivers comprehensive commercial real estate solutions. We assist clients in finding and securing retail spaces, office buildings, and industrial properties. Our team is equipped with the market knowledge and expertise to help you identify and secure the ideal location.",
      delay: 250,
    },
    {
      iconClass: "fas fa-warehouse",
      title: "Franchise",
      description:
        "MTLRealty serves as a trusted partner for aspiring franchise owners. We connect you with established brands and provide expert advice on site selection, lease negotiations, and operational strategies. Our mission is to help you successfully establish a franchise that thrives in today's competitive marketplace, ensuring long-term success.",
      delay: 350,
    },
    {
      iconClass: "fas fa-calculator",
      title: "Investment",
      description:
        "For investors looking to venture into real estate, we offer strategic investment services, including thorough market analysis and comprehensive property evaluations. Our team works to identify profitable opportunities, manage your real estate portfolio effectively, and maximize your returns to help you achieve your investment goals.",
      delay: 450,
    },
  ];

  return (
    <>
      {/* START SECTION SERVICES */}
      <section className="services-home rec-pro">
        <div className="container-fluid">
          <div className="section-title">
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
