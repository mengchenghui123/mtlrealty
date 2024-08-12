import { FaHome, FaBuilding, FaWarehouse, FaBed, FaLongArrowAltRight } from 'react-icons/fa';
import './PropertyServices.css';

const PropertyServices = () => {
  const services = [
    {
      icon: <FaHome size={30} color='#fff' />,
      title: 'Houses',
      description: 'Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.',
    },
    {
      icon: <FaBuilding size={30} color='#fff' />,
      title: 'Apartments',
      description: 'Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.',
    },
    {
      icon: <FaWarehouse size={30} color='#fff' />,
      title: 'Commercial',
      description: 'Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.',
    },
    {
      icon: <FaBed size={30} color='#fff' />,
      title: 'Hotels',
      description: 'Nonec pede justo fringilla vel aliquet nec vulputate eget arcu in enim justo rhoncus ut imperdiet venenatis vitae justo.',
    }
  ];

  return (
    <div className="property-services-container">
      <div className="property-services-content mx-auto">
        <div className="row">
          <div className="col-12">
            <div className="r-head flexColStart">
              <span className="fs-5 fw-semibold text-uppercase">Property</span>
              <span className="orangeText">Services</span>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-md-3 col-sm-6">
              <div className="service-card text-left">
                <div className="service-icon rounded-circle d-flex align-items-center justify-content-center">
                  {service.icon}
                </div>
                <h5 className="mt-3 fw-semibold">{service.title}</h5>
                <p className="fs-6">{service.description}</p>
                <a href="#" className="read-more fs-6">Read More <FaLongArrowAltRight /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyServices;
