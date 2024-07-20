import './Introduce.css'

const Introduce = ({ introduceData }) => {

  return (
    <div className="container introduce-container">
      <div className="row align-items-center">
        <div className="col-md-5">
          <div className="left-box">
            <div className='d-flex align-items-center justify-content-start mb-3'>
              <p className='fs-5' style={{ margin: '0 1px' }}>Number of properties:</p>
              <span className="fs-3 fw-medium">{introduceData.properties}+</span>
            </div>
            <div className='d-flex align-items-center mb-3'>
              <p className='fs-5' style={{ margin: '0 2px' }}>Number of Area Coverage:</p>
              <span className="fs-3 fw-medium">{introduceData.areaCoverage}+</span>
            </div>
            <div className='d-flex align-items-center mb-3'>
              <p className='fs-5' style={{ margin: '0 1px' }}>Number of brokers:</p>
              <span className="fs-3 fw-medium">{introduceData.brokers}+</span>
            </div>
            <div className='d-flex align-items-center mb-3'>
              <p className='fs-5' style={{ margin: '0 1px' }}>Years in Business:</p>
              <span className="fs-3 fw-medium">{introduceData.yearsInBusiness}+</span>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="right-box">
            <img className='img-fluid rounded shadow-sm mb-3' src={introduceData.imageUrl} alt="introduce" />
            <p>{introduceData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduce;