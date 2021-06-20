import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";
import { Button } from "../Button/Button";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closedMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link className="navbar-logo" onClick={closedMobileMenu}>
              <RiStockFill className="navbar-icon" />
              PYPR
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="../pages/PageTrade"
                  className="nav-links"
                  onClick={closedMobileMenu}
                >
                  Trade
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="../pages/PagePortfolio"
                  className="nav-links"
                  onClick={closedMobileMenu}
                >
                  Portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="../pages/PageProfile"
                  className="nav-links"
                  onClick={closedMobileMenu}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-btn">
                {button ? (
                  <Link to="../pages/PageLogin" className="btn-link">
                    <Button buttonStyle="btn--outline">SIGN UP</Button>
                  </Link>
                ) : (
                  <Link to="../pages/PageLogin" className="btn-link">
                    <Button
                      buttonStyle="btn--outline"
                      buttonSize="btn--mobile"
                      onClick={closedMobileMenu}
                    >
                      SIGN UP
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
