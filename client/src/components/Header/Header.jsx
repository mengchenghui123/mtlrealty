import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
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
    <section
      className={`h_wrapper ${isheaderVisible ? "" : "hidden"}`}
      inert={!isheaderVisible ? "true" : undefined}
    >
      <div className="flexCenter paddings innerWidth h-container">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" alt="logo" width={100} />
        </Link>

        <div className="flexCenter h-menu" role="menubar">
          {/* Residential */}
          <Menu
            trigger="hover"
            delay={500}
            transition="fade"
            placement="end"
            withinPortal
          >
            <Menu.Target>
              <div className="menu-item">
                <Link to="/residential" role="menuitem">
                  Residential
                </Link>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} to="/rent" role="menuitem">
                Rent
              </Menu.Item>
              <Menu.Item component={Link} to="/sell" role="menuitem">
                Sell
              </Menu.Item>
              <Menu.Item component={Link} to="/buy" role="menuitem">
                Buy
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* Commercial */}
          <Menu
            trigger="hover"
            delay={500}
            transition="fade"
            placement="end"
            withinPortal
          >
            <Menu.Target>
              <div className="menu-item">
                <Link to="/commercial" role="menuitem">
                  Commercial
                </Link>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} to="#" role="menuitem">
                Commercial Leasing
              </Menu.Item>
              <Menu.Item component={Link} to="/partners" role="menuitem">
                Partners
              </Menu.Item>
              <Menu.Item component={Link} to="#" role="menuitem">
                Protetles
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* Franchise */}
          <Menu
            trigger="hover"
            delay={500}
            transition="fade"
            placement="end"
            withinPortal
          >
            <Menu.Target>
              <div className="menu-item">
                <Link to="/franchise" role="menuitem">
                  Franchise
                </Link>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} to="#" role="menuitem">
                Introduction
              </Menu.Item>
              <Menu.Item component={Link} to="#" role="menuitem">
                Procedure
              </Menu.Item>
              <Menu.Item component={Link} to="/brands" role="menuitem">
                Brand
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* add property */}
          <div onClick={handleAddPropertyClick}>Add Property</div>
          <AddPropertyModal opened={modalOpened} setOpened={setModalopened} />

          {isAuthenticated && isAdmin && (
            <div className="menu-item">
              <Link to="/admin" role="menuitem">
                Admin
              </Link>
            </div>
          )}
          {/* Contact & News & Login */}
          <div className="menu-item">
            <Link to="/contact" role="menuitem">
              Contact
            </Link>
          </div>
          <div className="menu-item">
            <Link to="#" role="menuitem">
              News
            </Link>
          </div>

          {!isAuthenticated ? (
            <button className="button" onClick={loginWithRedirect}>
              Login
            </button>
          ) : (
            <ProfileMenu user={user} logout={logout} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
