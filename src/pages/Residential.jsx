import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Introduce from "../components/Introduce/Introduce";
import FeaturedListing from "../components/FeaturedListing/FeaturedListing";
import InquiryForm from "../components/InquiryForm/InquiryForm";
import data from '../utils/slider.json'

const Residential = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="residential-box">
        <h1 className="title">Residential</h1>
        <Introduce />
        <div style={{ backgroundColor: '#f0f0f0' }}>
          <FeaturedListing data={data} />
        </div>
        <InquiryForm />
      </div>
      <Footer />
    </div >
  );
}

export default Residential;