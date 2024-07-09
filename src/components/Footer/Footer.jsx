import React from 'react'
import './Footer.css'

export const Footer = () => {
    console.log("aaa");
  return (
    <footer className="footer">
        <div className="container">
        <div className="row">
            <div className="col-md-4 ft-1">
                <h3>Richard Zhou</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, voluptatem placeat ullam itaque consequuntur inventore nesciunt, fuga rerum quasi animi quia ipsam illo eveniet. Asperiores pariatur maiores dolorem neque esse. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas libero sed dolorem rerum sunt expedita dolorum molestiae nisi? Iusto, et vel cum illo atque sit voluptatibus cupiditate assumenda rem animi.</p>
                <div className="footer-icons">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-weixin"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-linkedin-in"></i>
                </div>
            </div>


            <div className="col-md-4 ft-2">
                <h5>Quick Links</h5>
                <ul>
                    <li>
                        <a href="/">Services</a>
                    </li>
                    <li>
                        <a href="/">About Us</a>
                    </li>
                    <li>
                        <a href="/">Contact</a>
                    </li>
                    <li>
                        <a href="/">Blogs</a>
                    </li>
                </ul>
            </div>


            <div className="col-md-4 ft-3">
                <h5>Contact Info</h5>
                <div className="contact-container">
                    <p><i  className="fa-solid fa-phone-volume"></i>+123-123-1234</p>
                    <p><i  className="fa-solid fa-envelope"></i>abc@gmail.com</p>
                    <p><i className="fa-solid fa-location-dot"></i> 1234 Rue Drumond</p>
                </div>
            </div>
        </div>
    </div>
    
    <div className="last-Footer">
        <p>Design by Firstname LastName</p>
    </div>
    </footer>
  );
};

export default Footer;
