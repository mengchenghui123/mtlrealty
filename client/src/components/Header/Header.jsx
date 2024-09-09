import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import useAuthCheck from "../../Hook/useAuthCheck";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";

const Header = () => {
  const [dropdowns, setDropdowns] = useState({
    residential: false,
    commercial: false,
    franchise: false,
  });

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const isAdmin = user?.["https://your-namespace/roles"]?.includes("Admin");

  // Navigator follow
  const [isheaderVisible, setIsHeaderVisible] = useState(true);
  const prevScrollY = useRef(0);
  const [modalOpened, setModalopened] = useState(false);

  const { validateLogin } = useAuthCheck();
  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalopened(true);
    }
  };

  //hide header bar
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
                  <img src="/logo.png" alt="" />
                </a>
              </div>
              {/* Mobile Navigation */}
              <div className="mmenu-trigger">
                <button className="hamburger hamburger--collapse" type="button">
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
              </div>
              {/* Main Navigation */}
              <nav id="navigation" className="style-1">
                <ul id="responsive">
                  <li>
                    <a href="/residential">Residential</a>
                    <ul>
                      <li>
                        <a href="/rent">Rent</a>
                      </li>
                      <li>
                        <a href="/buy">Buy</a>
                      </li>
                      <li>
                        <a href="/sell">Sell</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Commercial</a>
                    <ul>
                      <li>
                        <a href="#">Commercial Leasing</a>
                      </li>
                      <li>
                        <a href="/partners">Partners</a>
                      </li>
                      <li>
                        <a href="#">proprietary</a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a href="#">franchise </a>
                    <ul>
                      <li>
                        <a href="#">Introduction</a>
                      </li>
                      <li>
                        <a href="#">Procedure</a>
                      </li>
                      <li>
                        <a href="/brands">Brand</a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a href="#">News</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </nav>
              {/* Main Navigation / End */}
            </div>
            {/* Left Side Content / End */}
            {/* Right Side Content / End */}
            <div className="right-side d-none d-none d-lg-none d-xl-flex">
              {/* Header Widget */}
              <div className="header-widget">
                <a
                  className="button border"
                  onClick={(e) => {
                    e.preventDefault(); // 阻止默认的跳转行为
                    handleAddPropertyClick(); // 调用点击处理函数
                  }}
                >
                  Add Listing
                  <i className="fas fa-laptop-house ml-2" />
                </a>
              </div>

              <AddPropertyModal
                opened={modalOpened}
                setOpened={setModalopened}
              />
            </div>
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
  );
};

export default Header;
