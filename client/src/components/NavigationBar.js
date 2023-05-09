import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";

function NavigationBar() {
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true);
  let auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserExists(true);
        setLoading(false);
      } else {
        setUserExists(false);
        setLoading(false);
      }
    });
  }, [auth]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" id="navbar-custom">
        <a className="navbar-brand" style={{ color: "white" }} href="/">
          NYC Historical Sites
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" id="link-txt1">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sites" id="link-txt2">
                Sites
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/map" id="link-txt3">
                Map
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/itineraries" id="link-txt4">
                Itineraries
              </Link>
            </li>
            {!loading && userExists && (
              <li className="nav-item">
                <Link className="nav-link" to="/requestSite" id="link-txt5">
                  Request Site
                </Link>
              </li>
            )}
          </ul>
          {!loading && (
            <div>
              {!userExists ? (
                <div>
                  <Link to="/signin">
                    <button className="btn btn-log" type="submit">
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/account">
                    <button className="btn btn-log" type="submit">
                      Account
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
export default NavigationBar;
