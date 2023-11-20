import React, { useRef, useState } from "react";
import logo from "../../include/images/logo.svg";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getUser, userLogin } from "../../store/users";
import { connect } from "react-redux";
import AlertSuccess from "../../common/alerts/alertSuccess";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import eyeImg from "../../include/images/eye-d.svg";
import eyeOff from "../../include/images/eye-d-off.svg";
import {
  getRedirectUrl,
  setProfile,
  setToken,
  removeKey,
} from "../../utils/localStorageServices";
import LoadingBar from "react-top-loading-bar";
import NextButton from "../../common/form/nextButton";
const Login = (props) => {
  var ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState();
  const [error, setError] = useState({});
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const validateHandler = () => {
    const errors = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!loginData || !loginData.email) {
      errors.email = "Email is required";
    } else if (!regex.test(loginData.email)) {
      errors.email = "Invalid Email";
    }

    if (!loginData || !loginData.password) {
      errors.password = "Password is required";
    }

    const isEmpty = Object.values(errors).every((x) => x === null || x === "");

    if (!isEmpty) {
      setError(errors);
      return false;
    } else {
      setError(errors);
      return true;
    }
  };

  const sendLogin = () => {
    if (validateHandler()) {
      setError({});
      ref && ref.current && ref.current.continuousStart();
      const value = { ...loginData };
      setLoading(true);
      const payload = {
        email: value.email ? value.email : "",
        password: value && value.password ? value.password : "",
      };

      props.userLogin(payload, (res) => {
        if (res.status === 200) {
          const data = res.data.data;
          const { accessToken, refreshToken } = data;
          setToken(refreshToken, accessToken);
          setProfile(data);
          const redirectUrl = getRedirectUrl();
          if (redirectUrl) {
            removeKey("redirectUrl");
            window.location.assign(`${redirectUrl}`);
          } else {
            history.push("/feed");
          }
          setLoading(false);
          ref && ref.current && ref.current.complete();
          toast(<AlertSuccess message="Information Saved" />);
        } else {
          setLoading(false);
          ref && ref.current && ref.current.complete();
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
    }
  };
  return (
    <>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <div class="page-outer-wrapper font-family-poppins grey-bg">
        <header id="header">
          <nav class="navbar navbar-expand-xl">
            <div class="container">
              <div class="nav-inside d-flex align-items-center justify-content-center">
                <Link to={"/"} class="navbar-brand">
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <div class="login-container fw-medium">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="login-content-holder mx-auto">
                  <div class="login-head-row">
                    <h1>Member Login</h1>
                  </div>
                  <div class="login-form-row-group">
                    <div class="form-floating-row d-flex flex-wrap">
                      <div class="ff-column">
                        <div
                          class={
                            error && error.email
                              ? "is-invalid form-floating custom-form-floating"
                              : "form-floating custom-form-floating"
                          }
                        >
                          <input
                            type="email"
                            class={
                              error && error.email
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            id="emailAddress"
                            placeholder="Email Address"
                            value={
                              loginData && loginData?.email
                                ? loginData.email
                                : ""
                            }
                            onChange={(e) => {
                              const data = { ...loginData };
                              data.email = e.target.value;
                              setLoginData(data);
                            }}
                          />
                          <label for="emailAddress">Email Address</label>
                        </div>
                        <div class="invalid-feedback">
                          {error && error.email ? <p>{error.email}</p> : ""}
                        </div>
                      </div>
                    </div>
                    <div class="form-floating-row d-flex flex-wrap">
                      <div class="ff-column">
                        <div
                          class={
                            error && error.password
                              ? "is-invalid form-floating custom-form-floating"
                              : "form-floating custom-form-floating"
                          }
                        >
                          <input
                            type={showPassword ? "text" : "password"}
                            class={
                              error && error.password
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            id="floatingPassword"
                            placeholder="Password"
                            value={
                              loginData && loginData?.password
                                ? loginData.password
                                : ""
                            }
                            onChange={(e) => {
                              const data = { ...loginData };
                              data.password = e.target.value;
                              setLoginData(data);
                            }}
                          />
                          <label for="floatingPassword">Password</label>

                          {showPassword ? (
                            <button
                              type="button"
                              class="show-password-btn"
                              data-target="floatingPassword"
                              onClick={toggleShowPassword}
                            >
                              <img src={eyeImg} alt="eye d" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              class="show-password-btn"
                              data-target="floatingPassword"
                              onClick={toggleShowPassword}
                            >
                              <img src={eyeOff} alt="eye d" />
                            </button>
                          )}
                        </div>
                        <div class="invalid-feedback">
                          {error && error.password ? (
                            <p>{error.password}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div class="form-floating-row remember-me-row d-sm-flex flex-wrap align-items-center justify-content-between">
                      <div class="form-check d-flex align-items-center">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="rememberMe"
                        />
                        <label class="form-check-label" for="rememberMe">
                          Remember me
                        </label>
                      </div>
                      {/* <Link to="/forgot-password">Forgot your password?</Link> 
                    </div> */}
                    <div class="login-form-btn d-flex align-items-center justify-content-end">
                      <NextButton
                        handleSubmit={sendLogin}
                        loading={loading}
                        classData={"btn btn-default"}
                        label="Login"
                      />
                    </div>
                    <div class="login-link">
                      Not a Member?{" "}
                      <Link to="/signup">
                        {" "}
                        <strong>Register</strong>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="footer2"
          class="d-flex align-items-center justify-content-center"
        >
          <div class="container">
            <div class="row">
              <div class="col-md-12 d-md-flex align-items-md-center justify-content-md-center">
                <ul class="footer-nav-list d-flex justify-content-center justify-content-md-start align-items-center">
                  <li>
                    <a href="#!">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#!">Privacy Policy</a>
                  </li>
                </ul>
                <div class="copyright-box">
                  <img src="include/images/copyright.svg" alt="" />
                  &copy; Environmental Inclusion. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (data, callback) => dispatch(userLogin(data, callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login));
