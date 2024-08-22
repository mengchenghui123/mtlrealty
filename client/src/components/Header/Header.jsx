import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@mantine/core";
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
                      <a href="/sell">Buy</a>
                    </li>
                    <li>
                      <a href="/buy">Sell</a>
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
                  <a href="contact-us.html">Contact</a>
                </li>

                <li className="d-none d-xl-none d-block d-lg-block">
                  <a href="login.html">Login</a>
                </li>
                <li className="d-none d-xl-none d-block d-lg-block">
                  <a href="register.html">Register</a>
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

            <AddPropertyModal opened={modalOpened} setOpened={setModalopened} />

            {/* Header Widget / End */}
          </div>
          {/* Right Side Content / End */}
          {/* Right Side Content / End */}
          <div className="header-user-menu user-menu add">
            <div className="header-user-name">
              {!isAuthenticated ? (
                <button className="button" onClick={loginWithRedirect}>
                  Login
                </button>
              ) : (
                <ProfileMenu user={user} logout={logout} />
              )}
            </div>
          </div>
          {/* Right Side Content / End */}
        </div>
      </div>
      {/* Header / End */}
    </header>

    // <section
    //   className={`h_wrapper ${isheaderVisible ? "" : "hidden"}`}
    //   inert={!isheaderVisible ? "true" : undefined}
    // >
    //   <div className="flexCenter paddings innerWidth h-container">
    //     {/* Logo */}
    //     <Link to="/">
    //       <img src="/logo.png" alt="logo" width={100} />
    //     </Link>

    //     <div className="flexCenter h-menu" role="menubar">
    //       {/* Residential */}
    //       <Menu
    //         trigger="hover"
    //         delay={500}
    //         transition="fade"
    //         placement="end"
    //         withinPortal
    //       >
    //         <Menu.Target>
    //           <div className="menu-item">
    //             <Link to="/residential" role="menuitem">
    //               Residential
    //             </Link>
    //           </div>
    //         </Menu.Target>
    //         <Menu.Dropdown>
    //           <Menu.Item component={Link} to="/rent" role="menuitem">
    //             Rent
    //           </Menu.Item>
    //           <Menu.Item component={Link} to="/sell" role="menuitem">
    //             Sell
    //           </Menu.Item>
    //           <Menu.Item component={Link} to="/buy" role="menuitem">
    //             Buy
    //           </Menu.Item>
    //         </Menu.Dropdown>
    //       </Menu>

    //       {/* Commercial */}
    //       <Menu
    //         trigger="hover"
    //         delay={500}
    //         transition="fade"
    //         placement="end"
    //         withinPortal
    //       >
    //         <Menu.Target>
    //           <div className="menu-item">
    //             <Link to="/commercial" role="menuitem">
    //               Commercial
    //             </Link>
    //           </div>
    //         </Menu.Target>
    //         <Menu.Dropdown>
    //           <Menu.Item component={Link} to="#" role="menuitem">
    //             Commercial Leasing
    //           </Menu.Item>
    //           <Menu.Item component={Link} to="/partners" role="menuitem">
    //             Partners
    //           </Menu.Item>
    //           <Menu.Item component={Link} to="#" role="menuitem">
    //             Protetles
    //           </Menu.Item>
    //         </Menu.Dropdown>
    //       </Menu>

    //       {/* Franchise */}
    //       <Menu
    //         trigger="hover"
    //         delay={500}
    //         transition="fade"
    //         placement="end"
    //         withinPortal
    //       >
    //         <Menu.Target>
    //           <div className="menu-item">
    //             <Link to="/franchise" role="menuitem">
    //               Franchise
    //             </Link>
    //           </div>
    //         </Menu.Target>
    //         <Menu.Dropdown>
    //           <Menu.Item component={Link} to="#" role="menuitem">
    //             Introduction
    //           </Menu.Item>
    //           <Menu.Item component={Link} to="#" role="menuitem">
    //             Procedure
    //           </Menu.Item>
    //           <Menu.Item component={Link} to="/brands" role="menuitem">
    //             Brand
    //           </Menu.Item>
    //         </Menu.Dropdown>
    //       </Menu>

    //       {/* add property */}
    //       <div onClick={handleAddPropertyClick}>Add Property</div>
    //       <AddPropertyModal opened={modalOpened} setOpened={setModalopened} />

    //       {isAuthenticated && isAdmin && (
    //         <div className="menu-item">
    //           <Link to="/admin" role="menuitem">
    //             Admin
    //           </Link>
    //         </div>
    //       )}
    //       {/* Contact & News & Login */}
    //       <div className="menu-item">
    //         <Link to="/contact" role="menuitem">
    //           Contact
    //         </Link>
    //       </div>
    //       <div className="menu-item">
    //         <Link to="#" role="menuitem">
    //           News
    //         </Link>
    //       </div>

    //       {!isAuthenticated ? (
    //         <button className="button" onClick={loginWithRedirect}>
    //           Login
    //         </button>
    //       ) : (
    //         <ProfileMenu user={user} logout={logout} />
    //       )}
    //     </div>
    //   </div>
    // </section>
  );
};

export default Header;
