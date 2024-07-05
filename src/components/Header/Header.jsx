import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [dropdowns, setDropdowns] = useState({
    residential: false,
    commercial: false,
    franchise: false,
  });

  const toggleDropDown=(menu)=>{
    console.log(`${menu} dropdown toggled`, !dropdowns[menu]);
    setDropdowns({
      ...dropdowns,
      [menu]: !dropdowns[menu]
    });
  };

  return (
    <section className="h_wrapper">
        <div className="flexCenter paddings innerWidth h-container">
            <img src="./logo.png" alt="logi" width={100}/>

            <div className="flexCenter h-menu">

              {/*Residential */}
              <div className="menu-item" 
              onMouseEnter={()=>{console.log("mouse entered"); toggleDropDown('residential');}}
              onMouseLeave={()=>{console.log("mouse lefe"); toggleDropDown('residential');}}>
              
                <a href="">Residential</a>

                {dropdowns.residential && (
                  <div className="dropdown">
                    <Link to="../../rent">Rent</Link>
                    <Link to="#">Sell</Link>
                    <Link to="#">Buy</Link>
                  </div>
                )}
              </div>

              {/* Commercial */}
              <div className="menu-item" 
              onMouseEnter={()=>toggleDropDown('commercial')}
              onMouseLeave={()=>toggleDropDown('commercial')}>
              
                <Link to="">Commercial</Link>

                {dropdowns.commercial && (
                  <div className="dropdown">
                    <Link to="#">Commercial Leasing</Link>
                    <Link to="#">Partners</Link>
                    <Link to="#">Protetles</Link>
                  </div>
                )}
              </div>

                {/*Francise */}
              <div className="menu-item" 
              onMouseEnter={()=>toggleDropDown('franchise')}
              onMouseLeave={()=>toggleDropDown('franchise')}>
              
                <Link to="">Franchise</Link>

                {dropdowns.franchise && (
                  <div className="dropdown">
                    <Link to="#">Introduction</Link>
                    <Link to="#">Procedure</Link>
                    <Link to="#">Brand</Link>
                  </div>
                )}
              </div>

              {/*Contact & news */}
                <div className="menu-Item">
                <Link to="#">Contact</Link>
                </div>
                <div className="menu-Item">
                <Link to="#">News</Link>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Header