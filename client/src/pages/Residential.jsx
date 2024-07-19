import Introduce from "../components/Introduce/Introduce";
import FeaturedListing from "../components/FeaturedListing/FeaturedListing";
import InquiryForm from "../components/InquiryForm/InquiryForm";
import useProperty from '../Hook/useProperty'

const Residential = () => {
  const { data, isError, isLoading } = useProperty();

  return (
    <div className="page-container">
      <div className="residential-box">
        <h1 className="title">Residential</h1>
        <Introduce />
        <div style={{ backgroundColor: '#f0f0f0' }}>
          <FeaturedListing data={data} isError={isError} isLoading={isLoading} />
        </div>
        <InquiryForm />
      </div>
      <div className='break-line' />
    </div >
  );
}

export default Residential;