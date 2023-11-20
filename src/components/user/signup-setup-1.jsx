import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import eyeImg from "../../include/images/eye-d.svg";
import eyeOff from "../../include/images/eye-d-off.svg";
import { useState, useEffect } from "react";
import {
  getMisc,
  getCountry,
  getUsState,
  getUsCitiesDropdown,
} from "../../store/misc";
import { connect } from "react-redux";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import { customStyles } from "../../common/customStyles/reactSelectStyle";
import Select from "react-select";
import { getUser, sendOtpForSignup } from "../../store/users";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Header from "./header";
import close from "../../include/images/close-16x16.svg";
import profileImg from "../../include/images/fav-icon.svg";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Amplify, Storage, Auth } from "aws-amplify";
import { useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import NextButton from "../../common/form/nextButton";
Amplify.configure({
  Auth: {
    identityPoolId: "us-east-2:fa1d4017-2701-482a-9559-34a69f57d192",
    region: "us-east-2",
  },
  Storage: {
    bucket: "dev-salvex-ei",
    region: "us-east-2",
  },
});
Auth.configure({
  Auth: {
    identityPoolId: "us-east-2:fa1d4017-2701-482a-9559-34a69f57d192", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "us-east-2", // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    bucket: "dev-salvex-ei", //REQUIRED -  Amazon S3 bucket
    region: "us-east-2",
  },
});
const SignupStepOne = (props) => {
  var ref = useRef(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(null);
  const [usStateDropdown, setUsStateDropdown] = useState(null);
  const [usCityDropdown, setUsCityDropdown] = useState(null);
  const [selectValues, setSelectValues] = useState(null);
  const [selectLocation, setSelectLocation] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [stateId, setStateId] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [ImgSrc, setImgSrc] = useState();
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoading(true);
    props.getCountry((res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoading(false);
      } else {
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
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoading(true);
    props.getUsState((res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoading(false);
      } else {
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
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoading(true);
    const payload = {
      id: stateId,
    };
    props.getUsCitiesDropdown(payload, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoading(false);
      } else {
        ref && ref.current && ref.current.complete();
        setLoading(false);
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
  }, [stateId]);

  const country =
    (props.getMisc &&
      props.getMisc.Countries &&
      props.getMisc.Countries.data) ||
    {};

  const state =
    (props.getMisc && props.getMisc.usState && props.getMisc.usState.data) ||
    {};

  const cities =
    props.getMisc &&
    props.getMisc.usCitiesItems &&
    props.getMisc.usCitiesItems.data;

  useEffect(() => {
    const data =
      country &&
      country.length > 0 &&
      country.map((item) => ({
        name: item.name,
        code: item.code,
        _id: item._id,
      }));
    setCountryDropdown(data);

    const sData =
      state &&
      state.length > 0 &&
      state.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    setUsStateDropdown(sData);

    const cData =
      cities &&
      cities.length > 0 &&
      cities.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    setUsCityDropdown(cData);
  }, [country, state, cities]);

  const validateHandler = () => {
    const errors = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!selectValues || !selectValues.email) {
      errors.email = "Email is required";
    } else if (!regex.test(selectValues.email)) {
      errors.email = "Invalid Email";
    }

    if (!selectValues || !selectValues.password) {
      errors.password = "Password is required";
    } else if (selectValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!selectValues || !selectValues.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (selectValues.password !== selectValues.confirmPassword) {
      errors.password = "Passwords do not match";
      errors.confirmPassword = "Passwords do not match";
    }

    if (!selectValues || !selectValues.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!selectValues || !selectValues.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!selectLocation || !selectLocation.country) {
      errors.country = "Country is required";
    }
    if (!selectLocation || !selectLocation.city) {
      errors.city = "City is required";
    }
    if (!selectLocation || !selectLocation.state) {
      errors.state = "State is required";
    }

    if (!selectValues || ( _.isNull(selectedImage))) {
      errors.image = "Profile Picture is required";
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

  const sendVerification = (e) => {
    if (validateHandler()) {
      if (selectValues?.profileImage && selectedImage) {
        const value = { ...selectValues };
        const lValue = { ...selectLocation };
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoading(true);
        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(
            <AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          );
          return setLoading(false);
        } else if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType
          )
        ) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />
            ),
            setLoading(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;

          Storage.put(fileName, file, {
            completeCallback: (event) => {},
            progressCallback: (progress) => {},
            errorCallback: (err) => {
              return (
                setLoading(false),
                toast(<AlertError message={"Something Went Wrong"} />)
              );
            },
          }).then((result) => {
            const payload = {
              profilePicture: "public/" + result.key,
              firstName: value.firstName ? value.firstName : "",
              lastName: value.lastName ? value.lastName : "",
              email: value.email ? value.email : "",
              country: lValue.country ? lValue.country : "",
              password: value.password ? value.password : "",
              website: value.website ? value.website : "",
              state: lValue.state ? lValue.state : "",
              city: lValue.city ? lValue.city : "",
              organizationName: value.organizationName
                ? value.organizationName
                : "",
            };
            props.sendOtpForSignup(payload, (res) => {
              if (res.status === 200) {
                props.setSteps({
                  step: 2,
                  data: {
                    ...props.steps.data,
                    code: res?.data?.data?.code,
                    token: res?.data?.data?.token,
                    email: value?.email ? value?.email : "",
                    profileImage: selectedImage ? selectedImage : "",
                  },
                });
                ref && ref.current && ref.current.complete();
                setLoading(false);
                toast(<AlertSuccess message="Information Saved" />);
                toast(
                  <AlertSuccess message={`Code- ${res?.data?.data?.code}`} />
                );
              } else {
                ref && ref.current && ref.current.complete();
                setLoading(false);
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
          });
        }
      }
    }
  };

  return (
    <>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <div class="page-outer-wrapper font-family-poppins grey-bg min-vh-100">
        <Header step="step-1" />
        <div class="registration-flow-container fw-medium">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="rfc-content-holder mx-auto">
                  <div class="rf-head-row">
                    <div class="rf-step-count d-flex align-items-center">
                      Step <span class="rf-current">01</span>{" "}
                      <span class="rf-total">/ 03</span>
                    </div>
                    <h1>Create an account</h1>
                    <div class="rf-label-box fw-medium text-green">
                      <Link to="/login">Login Instead</Link>
                    </div>
                  </div>
                  <div class="rf-form-row-group">
                    <div class="form-floating-row d-flex flex-wrap">
                      <div class="ff-column">
                        <div class="ff-label-box">Profile Picture</div>
                        <div class="ff-image-box d-flex">
                          <img src={ImgSrc ? ImgSrc : profileImg} alt="" />
                          {ImgSrc && (
                            <button
                              type="button"
                              class="ff-close-img"
                              onClick={() => {
                                const data = { ...selectValues };
                                data.profilePicture = {};
                                data.profileImage = false;
                                setSelectValues(data);
                                setSelectedImage(null);
                                setImgSrc(null);
                              }}
                            >
                              <img src={close} alt="close arrow" />
                            </button>
                          )}
                          <button
                            type="button"
                            className={
                              "ff-update-link mt-auto position-relative"
                            }
                          >
                            <input
                              type="file"
                              class="form-control"
                              id="fileInput"
                              aria-describedby="fileHelp"
                              accept=".jpg, .jpeg, .png"
                              onChange={(e) => {
                                const data = { ...selectValues };
                                data.profileImage = true;
                                setSelectedImage(e.target.files[0]);
                                setSelectValues(data);
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = () => {
                                  setImgSrc(reader.result);
                                };
                              }}
                            />
                            Update
                          </button>
                        </div>
                        {error && error.image ? (
                          <p
                            style={{
                              color: "#FF4242",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {error.image}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="form-floating-row d-flex flex-wrap">
                      <div class="ff-column">
                        <div
                          class={
                            error && error.firstName
                              ? "is-invalid form-floating custom-form-floating"
                              : "form-floating custom-form-floating"
                          }
                        >
                          <input
                            type="text"
                            class={
                              error && error.firstName
                                ? "is-invalid form-control"
                                : "form-control "
                            }
                            value={
                              selectValues && selectValues.firstName
                                ? selectValues.firstName
                                : ""
                            }
                            id="firstName"
                            placeholder="First name"
                            onChange={(e) => {
                              const data = { ...selectValues };
                              data.firstName = e.target.value;
                              setSelectValues(data);
                            }}
                          />
                          <label for="firstName">First name</label>
                        </div>
                        <div class="invalid-feedback">
                          {error && error.firstName ? (
                            <p>{error.firstName}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div class="ff-column">
                        <div
                          class={
                            error && error.lastName
                              ? "is-invalid form-floating custom-form-floating"
                              : "form-floating custom-form-floating"
                          }
                        >
                          <input
                            type="text"
                            class={
                              error && error.lastName
                                ? "is-invalid form-control"
                                : "form-control "
                            }
                            id="lastName"
                            value={
                              selectValues && selectValues.lastName
                                ? selectValues.lastName
                                : ""
                            }
                            placeholder="Last name"
                            onChange={(e) => {
                              const data = { ...selectValues };
                              data.lastName = e.target.value;
                              setSelectValues(data);
                            }}
                          />
                          <label for="lastName">Last name</label>
                        </div>
                        <div class="invalid-feedback">
                          {error && error.lastName ? (
                            <p>{error.lastName}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
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
                                : "form-control "
                            }
                            id="emailAddress"
                            placeholder="Email Address"
                            value={
                              selectValues && selectValues?.email
                                ? selectValues?.email
                                : ""
                            }
                            onChange={(e) => {
                              const data = { ...selectValues };
                              data.email = e.target.value;
                              setSelectValues(data);
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
                            error && error.country
                              ? "is-invalid form-floating custom-form-floating"
                              : "form-floating custom-form-floating"
                          }
                        >
                          <Select
                            value={{
                              name: selectLocation?.countryName,
                              value: selectLocation?.country,
                            }}
                            className={
                              error && error.country
                                ? "is-invalid form-select c-selec"
                                : "form-select c-select"
                            }
                            components={{
                              DropdownIndicator: () => null,
                              IndicatorSeparator: () => null,
                            }}
                            id="cuntrySelect"
                            placeholder={false}
                            styles={customStyles}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option._id}
                            options={countryDropdown}
                            name={countryDropdown}
                            onChange={(event) => {
                              const data = { ...selectLocation };
                              data.countryName = event.name;
                              data.country = event.code;
                              setSelectLocation(data);
                            }}
                          />
                          <label for="floatingSelect">Country</label>
                        </div>
                        <div class="invalid-feedback">
                          {error && error.country ? <p>{error.country}</p> : ""}
                        </div>
                      </div>
                    </div>
                    <div class="form-floating-row d-flex flex-wrap">
                      {(selectLocation &&
                        selectLocation?.country &&
                        selectLocation?.country === "US") ||
                      (selectLocation &&
                        selectLocation?.countryName &&
                        selectLocation?.countryName === "United States") ? (
                        <div class="ff-column">
                          <div
                            class={
                              error && error.state
                                ? "is-invalid form-floating custom-form-floating"
                                : "form-floating custom-form-floating"
                            }
                          >
                            <Select
                              className={
                                error && error.state
                                  ? "is-invalid form-select c-select"
                                  : "form-select c-select "
                              }
                              components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }}
                              id="cuntrySelect"
                              placeholder={false}
                              styles={customStyles}
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id}
                              options={usStateDropdown}
                              name={usStateDropdown}
                              onChange={(event) => {
                                const data = { ...selectLocation };
                                data.state = event.name;
                                data.value = event.id;
                                setStateId(event.id);
                                setSelectLocation(data);
                              }}
                            />
                            <label for="floatingSelect">State</label>
                          </div>
                          <div class="invalid-feedback">
                            {error && error.state ? <p>{error.state}</p> : ""}
                          </div>
                        </div>
                      ) : (
                        <div class="ff-column">
                          <div
                            class={
                              error && error.state
                                ? "is-invalid form-floating custom-form-floating"
                                : "form-floating custom-form-floating"
                            }
                          >
                            <input
                              type="email"
                              class={
                                error && error.state
                                  ? "is-invalid form-control"
                                  : "form-control "
                              }
                              id="firstName"
                              placeholder="State"
                              value={
                                selectLocation && selectLocation.state
                                  ? selectValues?.state
                                  : ""
                              }
                              onChange={(e) => {
                                const data = { ...selectLocation };
                                data.state = e.target.value;
                                setSelectLocation(data);
                              }}
                            />
                            <label for="firstName">State</label>
                          </div>
                          <div class="invalid-feedback">
                            {error && error.state ? <p>{error.state}</p> : ""}
                          </div>
                        </div>
                      )}
                      {(selectLocation &&
                        selectLocation?.country &&
                        selectLocation?.country === "US") ||
                      (selectLocation &&
                        selectLocation?.countryName &&
                        selectLocation?.countryName === "United States") ? (
                        <div class="ff-column">
                          <div
                            class={
                              error && error.city
                                ? "is-invalid form-floating custom-form-floating"
                                : "form-floating custom-form-floating"
                            }
                          >
                            <Select
                              className={
                                error && error.city
                                  ? "is-invalid form-select c-select"
                                  : "form-select c-select "
                              }
                              components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }}
                              id="cuntrySelect"
                              placeholder={false}
                              styles={customStyles}
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id}
                              options={usCityDropdown}
                              name={usCityDropdown}
                              onChange={(event) => {
                                const data = { ...selectLocation };
                                data.city = event.name;
                                data.value = event.id;
                                setSelectLocation(data);
                              }}
                            />
                            <label for="floatingSelect">City</label>
                          </div>
                          <div class="invalid-feedback">
                            {error && error.city ? <p>{error.city}</p> : ""}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div class="ff-column">
                            <div
                              class={
                                error && error.city
                                  ? "is-invalid form-floating custom-form-floating"
                                  : "form-floating custom-form-floating"
                              }
                            >
                              <input
                                type="email"
                                class={
                                  error && error.city
                                    ? "is-invalid form-control"
                                    : "form-control "
                                }
                                id="firstName"
                                placeholder="City"
                                value={
                                  selectLocation && selectLocation.city
                                    ? selectLocation?.city
                                    : ""
                                }
                                onChange={(e) => {
                                  const data = { ...selectLocation };
                                  data.city = e.target.value;
                                  setSelectLocation(data);
                                }}
                              />
                              <label for="firstName">City</label>
                            </div>
                            <div class="invalid-feedback">
                              {error && error.city ? <p>{error.city}</p> : ""}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div class="form-floating-row d-flex flex-wrap">
                      <div class="ff-column">
                        <div class="form-floating custom-form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="website"
                            placeholder="Website"
                            value={
                              selectValues && selectValues?.website
                                ? selectValues?.website
                                : ""
                            }
                            onChange={(e) => {
                              const data = { ...selectValues };
                              data.website = e.target.value;
                              setSelectValues(data);
                            }}
                          />
                          <label for="website">Website</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-floating-row d-flex flex-wrap">
                      <div class="ff-column">
                        <div class="form-floating custom-form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="organizationName"
                            placeholder="organizationName"
                            value={
                              selectValues && selectValues?.organizationName
                                ? selectValues?.organizationName
                                : ""
                            }
                            onChange={(e) => {
                              const data = { ...selectValues };
                              data.organizationName = e.target.value;
                              setSelectValues(data);
                            }}
                          />
                          <label for="organizationName">Organization</label>
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
                              error && error.confirmPassword
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            id="floatingPassword"
                            placeholder="Password"
                            value={
                              selectValues && selectValues?.password
                                ? selectValues?.password
                                : ""
                            }
                            onChange={(e) => {
                              const data = { ...selectValues };
                              data.password = e.target.value;
                              setSelectValues(data);
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
                      <div class="ff-column">
                        <div
                          class={
                            error && error.confirmPassword
                              ? "is-invalid form-floating custom-form-floating"
                              : "form-floating custom-form-floating"
                          }
                        >
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            class={
                              error && error.confirmPassword
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                            id="floatingPassword2"
                            placeholder="Password"
                            value={
                              selectValues && selectValues?.confirmPassword
                                ? selectValues?.confirmPassword
                                : ""
                            }
                            onChange={(e) => {
                              const data = { ...selectValues };
                              data.confirmPassword = e.target.value;
                              setSelectValues(data);
                            }}
                          />
                          <label for="floatingPassword">Confirm Password</label>
                          {showConfirmPassword ? (
                            <button
                              type="button"
                              class="show-password-btn"
                              data-target="floatingPassword2"
                              onClick={toggleShowConfirmPassword}
                            >
                              <img src={eyeImg} alt="eye d" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              class="show-password-btn"
                              data-target="floatingPassword2"
                              onClick={toggleShowConfirmPassword}
                            >
                              <img src={eyeOff} alt="eye d" />
                            </button>
                          )}
                        </div>
                        <div class="invalid-feedback">
                          {error && error.confirmPassword ? (
                            <p>{error.confirmPassword}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="rf-form-btn d-flex align-items-center justify-content-end">
                      <NextButton
                        handleSubmit={(e) => {
                          sendVerification(e);
                        }}
                        loading={loading}
                        classData={"btn btn-default  btn-lg"}
                        label="Continue"
                        page={"signup"}
                      />
                    </div>
                  </div>
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
  getCountry: (callback) => dispatch(getCountry(callback)),
  getUsState: (callback) => dispatch(getUsState(callback)),
  getUsCitiesDropdown: (data, callback) =>
    dispatch(getUsCitiesDropdown(data, callback)),
  sendOtpForSignup: (data, callback) =>
    dispatch(sendOtpForSignup(data, callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
  getMisc: getMisc(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SignupStepOne));
