import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  //hide header bar
  return (
    <div id="wrapper">
      <div className="header-container">
        <header>
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
                      <a>Residential</a>
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
                      <a>Commercial</a>
                      <ul>
                        <li>
                          <Link to="/BusinessForSale">Business for Sale</Link>
                        </li>
                        <li>
                          <Link to="/CommercialLeasing">
                            Commercial Leasing
                          </Link>
                        </li>
                        <li>
                          <Link to="/CommercialPartner">Partners</Link>
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
                      <Link to="contact">Contact</Link>
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
