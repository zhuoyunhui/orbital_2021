// changed log out button, added backtest tab

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";
import { Button } from "../Button/Button";
import { IconContext } from "react-icons/lib";
import { auth } from "../../config/firebase";
import "./Navbar.css";

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
            <Link className="navbar-logo" to="/" onClick={closedMobileMenu}>
              <RiStockFill className="navbar-icon" />
              PYPR
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="/trade"
                  className="nav-links"
                  onClick={closedMobileMenu}
                >
                  Trade
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/backtest"
                  className="nav-links"
                  onClick={closedMobileMenu}
                >
                  Backtest
                </Link>
              </li>
              <div className="port">
                <li className="nav-item">
                  <Link
                    to="/portfolio"
                    className="nav-links"
                    onClick={closedMobileMenu}
                  >
                    Portfolio
                  </Link>
                </li>
              </div>
              <li className="nav-btn">
                {button ? (
                  <Button
                    buttonStyle="btn--outline"
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Log Out
                  </Button>
                ) : (
                  <Button
                    buttonStyle="btn--outline"
                    buttonSize="btn--mobile"
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Log Out
                  </Button>
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
