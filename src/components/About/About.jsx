import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import './About.css';

export const About = () => {
  return (
    <div className="about-page">
        <Header/>
            <div className="about-container">
                {/* 第一块 */}
                <section className="about-section about-us">
                    <div className="about-us-content flexSpaceBetween">
                        <img src="r1.png" alt="about us" className="about-us-image"/>
                        <div className="about-us-text">
                            <h1 className="primaryText">About US</h1>
                            <p className="secondaryText">this is a brief descriptipn......</p>
                        </div>
                    </div>

                    <div className="about-us-stats flexSpaceBetween">
                        <div className="stats flexColStart">
                            <p>Project Completed: 10000</p>
                            <p>Years in Business: 50</p>
                            <p>Number of Client: 2000</p>
                            <p>Number of Area Coverage: 5</p>
                        </div>
                        <div className="about-us-button flexColCenter">
                            <button className="button">Contact Us</button>
                            <button className="button">Our Vision for Your Home</button>
                        </div>
                    </div>
                </section>

                {/* 第二块 */}
                <section className="about-section our-story flexSpaceBetween">
                    <div className="story-content">
                    <h2 className="primaryText">Our Story</h2>
                    <p className="secondaryText">Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                    </div>
                </section>

                {/* 第三块 */}
                <section className="about-section why-choose-us flexSpaceBetween">
                    <div className="why-content">
                    <h2 className="primaryText">Why Choose Us</h2>
                    <p className="secondaryText">Reason to choose us: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tenetur omnis harum. Officia minima illo, vitae harum sed repellendus consectetur libero assumenda omnis commodi quisquam odit placeat in corrupti nihil?</p>
                    </div>
                </section>

                {/* 第四块 */}
                <section className="about-section our-team flexSpaceBetween">
                    <div className="team-content">
                    <h2 className="primaryText">Our Team</h2>
                    <p className="secondaryText">Meet our team</p>
                    </div>
                </section>

                {/* 第五块 */}
                <section className="about-section testimonials flexSpaceBetween">
                    <div className="testimonial-box">
                          <h2 className="primaryText">TESTIMONIAL</h2>
                          <div className="testimonial-content">
                            <p className="secondaryText">Great service and support...</p>
                            <p className="secondaryText">Customer name</p>
                          </div>
                    </div>

                        <div className="testimonial-box">
                            <div className="testimonial-content">
                            <p className="secondaryText">"i highly recomend them...."</p>
                            <p className="secondaryText">customer name</p>
                            </div>
                        </div>
                </section>
            </div>
        <Footer/>
    </div>
  );
};

export default About;
