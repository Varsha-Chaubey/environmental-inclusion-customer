import React, { useState } from "react";
import logo from "../../include/images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import useCheckMobileScreen from "../../common/customHooks/useCheckMobileScreen";
import { getUser, userLogout } from "../../store/users";
import { connect } from "react-redux";
import { logout, removeKey } from "../../utils/localStorageServices";
import { toast } from "react-toastify";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
const Header = (props) => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const isLoggedIn = !!localStorage.getItem("data");

  const handleLogout = () => {
    props.userLogout((res) => {
      if (res && res.status === 200) {
        // Redirect to the logout URL\
        toast(<AlertSuccess message="Logout successfully" />);
        const logoutUrl = logout();
        if (logoutUrl) {
          removeKey("logoutUrl");
          window.location.assign(`${logoutUrl}`);
        } else {
          history.push("/login");
        }
       
      } else {
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  };

  return (
    <header id="header" className="header-ei">
      <nav class="navbar navbar-expand-xl">
        <div class="container">
          <div class="nav-inside d-flex align-items-center justify-content-between">
            <Link to="/" class="navbar-brand">
              <img src={logo} alt="" />
            </Link>
            <button
              class={showMenu ? "navbar-toggler" : "navbar-toggler collapsed"}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowMenu(!showMenu)}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class={
                showMenu
                  ? "collapse navbar-collapse justify-content-end show "
                  : "collapse navbar-collapse justify-content-end"
              }
              id="mainNav"
            >
              <div class="navbar-inside ml-auto">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link
                      to="/"
                      class="nav-link "
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      Home
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/endangered-species" class="nav-link">
                      Endangered Species
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/regions" class="nav-link">
                      Regions{" "}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/organizations" class="nav-link">
                      Organizations
                    </Link>
                  </li>

                  <li className=" nav-item view-all-btn ">
                    {isLoggedIn ? (
                      <Link onClick={handleLogout} className="lg-btn">
                        Logout
                      </Link>
                    ) : (
                      <Link to="/login" className="lg-btn">
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              <div class="header-right d-none d-md-block">
                {!isLoggedIn && (
                  <Link
                    to="/signup"
                    class="btn btn-default header-btn cursor-pointer"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
              <div class="header-right d-block contact-now-display d-lg-none contact-us-sticky">
                {!isLoggedIn && (
                  <Link
                    to="/signup"
                    class="btn btn-block btn-dark-green contact-now-btn"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userLogout: (callback) => dispatch(userLogout(callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
