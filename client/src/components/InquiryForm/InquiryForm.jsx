import { useState } from "react";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    listingId: ''
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
            <input type="text" className="form-control mb-3" name="name" placeholder="Name" onChange={handleChange} />
            <input type="tel" className="form-control mb-3" name="phone" placeholder="Phone" onChange={handleChange} />
            <input type="email" className="form-control mb-3" name="email" placeholder="Email" onChange={handleChange} />
            <input type="text" className="form-control mb-3" name="listingId" placeholder="Listing ID" onChange={handleChange} />
            <textarea className="form-control mb-3" name="message" placeholder="Message" onChange={handleChange}></textarea>
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