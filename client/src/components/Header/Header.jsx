import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  //hide header bar
  return (
    <div id="wrapper">
      <div className="header-container">
        <header id="header-container">
          {/* Header */}
          <div id="header">
            <div className="container container-header">
              {/* Left Side Content */}
              <div className="left-side">
                {/* Logo */}
                <div id="logo">
                  <a href="/">
                    <img src="https://i.imgur.com/awa2U2i.png" alt="" />
                  </a>
                </div>
                {/* Mobile Navigation */}
                <div className="mmenu-trigger">
                  <button
                    className="hamburger hamburger--collapse"
                    type="button"
                  >
                    <span className="hamburger-box">
                      <span className="hamburger-inner" />
                    </span>
                  </button>
                </div>
                {/* Main Navigation */}
                <nav id="navigation" className="style-1">
                  <ul id="responsive">
                    <li>
                      <Link to="/residential">Residential</Link>
                      <ul>
                        <li>
                          <Link to="/rent">Rent</Link>
                        </li>
                        <li>
                          <Link to="/buy">Buy</Link>
                        </li>
                        <li>
                          <Link to="/sell">Sell</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/#">Commercial</Link>
                      <ul>
                        <li>
                          <Link to="/#">Commercial Leasing</Link>
                        </li>
                        <li>
                          <Link to="/partners">Partners</Link>
                        </li>
                        <li>
                          <Link to="#">proprietary</Link>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a>franchise </a>
                      <ul>
                        <li>
                          <Link to="franchise">Introduction</Link>
                        </li>

                        <li>
                          <Link to="/brands">Brand</Link>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <Link to="#">News</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
                {/* Main Navigation / End */}
              </div>
              {/* Left Side Content / End */}
              {/* Right Side Content / End */}

              <div className="right-side d-none d-none d-lg-none d-xl-flex sign ml-0">
                <div className="header-widget sign-in">
                  <div className="show-reg-form modal-open">
                    {!isAuthenticated ? (
                      <button onClick={loginWithRedirect}>Login</button>
                    ) : (
                      <ProfileMenu user={user} logout={logout} />
                    )}
                  </div>
                </div>
              </div>

              <div className="header-user-menu user-menu add d-none d-lg-none d-xl-flex">
                <div className="lang-wrap">
                  <div className="show-lang">
                    <span>
                      <i className="fas fa-globe-americas"></i>
                      <strong>ENG</strong>
                    </span>
                    <i className="fa fa-caret-down arrlan"></i>
                  </div>
                  <ul className="lang-tooltip lang-action no-list-style">
                    <li>
                      <a href="#" className="current-lan" data-lantext="En">
                        English
                      </a>
                    </li>
                    <li>
                      <a href="#" data-lantext="Fr">
                        Francais
                      </a>
                    </li>
                    <li>
                      <a href="#" data-lantext="Es">
                        Espanol
                      </a>
                    </li>
                    <li>
                      <a href="#" data-lantext="De">
                        Deutsch
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Right Side Content / End */}
            </div>
          </div>
          {/* Header / End */}
        </header>
      </div>
    </div>
  );
};

export default Header;
