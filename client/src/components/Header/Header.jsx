import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth0 } from '@auth0/auth0-react';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';

const Header = () => {
  const [dropdowns, setDropdowns] = useState({
    residential: false,
    commercial: false,
    franchise: false,
  });

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  //drop down menu
  const toggleDropDown = (menu) => {
    setDropdowns({
      ...dropdowns,
      [menu]: !dropdowns[menu]
    });
  };

  // Navigator follow
  const [isheaderVisible, setIsHeaderVisible] = useState(true);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <section className={`h_wrapper ${isheaderVisible ? '' : 'hidden'}`}>
      <div className="flexCenter paddings innerWidth h-container">
        {/* Logo */}
        <Link to="/"><img src="/logo.png" alt="logi" width={100} /></Link>


        <div className="flexCenter h-menu">

          {/*Residential */}
          <div className="menu-item"
            onMouseEnter={() => { toggleDropDown('residential'); }}
            onMouseLeave={() => { toggleDropDown('residential'); }}>

            <Link to="../../residential">Residential</Link>

            {dropdowns.residential && (
              <div className="dropdown">
                <Link to="../../rent">Rent</Link>
                <Link to="../../sell">Sell</Link>
                <Link to="../../buy">Buy</Link>
              </div>
            )}
          </div>

          {/* Commercial */}
          <div className="menu-item"
            onMouseEnter={() => toggleDropDown('commercial')}
            onMouseLeave={() => toggleDropDown('commercial')}>

            <Link to="../../commercial">Commercial</Link>

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
            onMouseEnter={() => toggleDropDown('franchise')}
            onMouseLeave={() => toggleDropDown('franchise')}>

            <Link to="../../franchise">Franchise</Link>

            {dropdowns.franchise && (
              <div className="dropdown">
                <Link to="#">Introduction</Link>
                <Link to="#">Procedure</Link>
                <Link to="#">Brand</Link>
              </div>
            )}
          </div>

          {/*Contact & News & Login */}
          <div className="menu-Item">
            <Link to="../../contact">Contact</Link>
          </div>
          <div className="menu-Item">
            <Link to="#">News</Link>
          </div>
          {!isAuthenticated ?
            (<button className="button" onClick={loginWithRedirect}>Login</button>)
            :
            (<ProfileMenu user={user} logout={logout} />)
          }
        </div>

      </div>
    </section>
  );
};

export default Header