import './Introduce.css'

const Introduce = () => {

  return (
    <div className="container introduce-container">
      <div className="row align-items-center">
        <div className="col-md-5">
          <div className="left-box">
            <div className='d-flex align-items-center justify-content-start mb-3'>
              <p className='fs-5' style={{ margin: '0 1px' }}>Number of properties:</p>
              <span className="fs-3 fw-medium">150+</span>
            </div>
            <div className='d-flex align-items-center mb-3'>
              <p className='fs-5' style={{ margin: '0 2px' }}>Number of Area Coverage:</p>
              <span className="fs-3 fw-medium">10+</span>
            </div>
            <div className='d-flex align-items-center mb-3'>
              <p className='fs-5' style={{ margin: '0 1px' }}>Number of brokers:</p>
              <span className="fs-3 fw-medium">30+</span>
            </div>
            <div className='d-flex align-items-center mb-3'>
              <p className='fs-5' style={{ margin: '0 1px' }}>Years in Business:</p>
              <span className="fs-3 fw-medium">20+</span>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="right-box">
            <img className='img-fluid rounded shadow-sm mb-3' src="wrapper2.png" alt="introduce" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduce;