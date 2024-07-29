import { useState } from "react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';


const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyId: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="inquiry-form p-4 rounded shadow" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                name="name"
                placeholder="Name*"
                onChange={handleChange}
                required
                style={{ borderRight: 'none', padding: '16px 8px' }}
              />
              <span className="input-group-text" style={{ backgroundColor: '#fff' }}>
                <AiOutlineUser />
              </span>
            </div>

            <div className="input-group mb-3">
              <input type="tel"
                className="form-control"
                name="phone"
                placeholder="Phone*"
                onChange={handleChange}
                required
                style={{ borderRight: 'none', padding: '16px 8px' }}
              />
              <span className="input-group-text" style={{ backgroundColor: '#fff' }}>
                <AiOutlinePhone />
              </span>
            </div>

            <div className="input-group mb-3">
              <input type="email"
                className="form-control"
                name="email"
                placeholder="Email*"
                onChange={handleChange}
                required
                style={{ borderRight: 'none', padding: '16px 8px' }}
              />
              <span className="input-group-text" style={{ backgroundColor: '#fff' }}>
                <AiOutlineMail />
              </span>
            </div>

            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                name="propertyId"
                placeholder="Property ID*"
                onChange={handleChange}
                required
                style={{ borderRight: 'none', padding: '16px 8px' }}
              />
              <span className="input-group-text" style={{ backgroundColor: '#fff' }}>
                <AiOutlineKey />
              </span>
            </div>

            <textarea className="form-control mb-3"
              name="message"
              placeholder="Message"
              onChange={handleChange}
              style={{ padding: '16px 8px' }}
            ></textarea>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;