import React, { useEffect, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import close from "../../include/images/close.svg";
import { getUser } from "../../store/users";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import rawImage from "../../include/images/row-icon-0.png";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import RightFeedSidebar from "../../components/common/pageInfoSidebar/rightFeedSidebar";
import LeftSideBar from "../../components/common/pageInfoSidebar/leftSideBar";
import {
  getMisc,
  getCountry,
  getUsState,
  getUsCitiesDropdown,
} from "../../store/misc";
import { customStyles } from "../../common/customStyles/reactSelectStyle";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Amplify, Storage, Auth } from "aws-amplify";
import Select from "react-select";
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

const EditUserProfile = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);

  //   signup
  const [countryDropdown, setCountryDropdown] = useState(null);
  const [stateDropdown, setStateDropdown] = useState(null);
  const [cityDropdown, setCityDropdown] = useState(null);
  const [selectValues, setSelectValues] = useState(null);
  const [selectLocation, setSelectLocation] = useState(null);
  const [stateId, setStateId] = useState();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [ImgSrc, setImgSrc] = useState();

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    setLoadingMain(true);
    props.getCountry((res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
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
    setLoadingMain(true);
    props.getUsState((res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
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
    setLoadingMain(true);
    const payload = {
      id: stateId,
    };
    props.getUsCitiesDropdown(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
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

  const usState =
    (props.getMisc && props.getMisc.usState && props.getMisc.usState.data) ||
    {};
  const usCities =
    (props.getMisc &&
      props.getMisc.usCitiesItems &&
      props.getMisc.usCitiesItems.data) ||
    {};

  useEffect(() => {
    const cData =
      country &&
      country.length > 0 &&
      country.map((item) => ({
        name: item.name,
        code: item.code,
        _id: item._id,
      }));
    setCountryDropdown(cData);

    const stateData =
      usState &&
      usState.length > 0 &&
      usState.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    setStateDropdown(stateData);

    const cityData =
      usCities &&
      usCities.length > 0 &&
      usCities.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    setCityDropdown(cityData);
  }, [country, usState, usCities]);

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
    if (!selectValues || !selectValues.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!selectValues || !selectValues.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!selectLocation || !selectLocation.country) {
      errors.country = "Country is required";
    }
    if (!selectLocation || !selectLocation.state) {
      errors.state = "State is required";
    }
    if (!selectLocation || !selectLocation.city) {
      errors.city = "City is required";
    }
    if (
      !selectValues ||
      (!selectValues &&
        _.isEmpty(!selectValues.profilePicture) &&
        _.isNull(selectedImage))
    ) {
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
  return (
    <>
      <PageLayout>
        <main id="main">
          <div class="page-panel-container font-family-poppins">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="page-panel-box d-flex flex-wrap">
                    <div
                      class={showMenu ? "panel-sidebar open" : "panel-sidebar"}
                    >
                      <div class="panel-header d-lg-none">
                        <div class="panel-header-inside position-relative">
                          <div class="panel-header-title">Browse Category</div>
                          <div
                            class="panel-close-button d-flex align-items-center justify-content-center"
                            onClick={() => setShowMenu(false)}
                          >
                            <img src={close} alt="close__24x24" />
                          </div>
                        </div>
                      </div>
                      <div
                        class={
                          "panel-sidebar-inside add-accor2tab sticky-lg-top"
                        }
                      >
                        <LeftSideBar />
                      </div>
                    </div>

                    <div class="panel-main-content d-flex flex-column">
                      <div class="panel-head">
                        <div class="breadcrumb-row d-flex flex-wrap">
                          <div class="breadcrumb-box">
                            <Link to="/">Home</Link>
                          </div>
                          <div class="breadcrumb-box">
                            {" "}
                            <Link to="/feed">Feeds</Link>
                          </div>
                        </div>
                        <h1>Edit Profile</h1>
                      </div>
                      <div class="panel-body flex-grow-1">
                        <div class="form-floating-row d-flex flex-wrap">
                          <div class="ff-column">
                            <div class="ff-label-box">Profile Picture</div>
                            <div class="ff-image-box d-flex">
                              <img
                                src={ImgSrc ? ImgSrc : rawImage}
                                alt="upload image"
                              />
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
                              <button
                                type="button"
                                class="ff-update-link mt-auto position-relative"
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
                          </div>
                        </div>
                        <div
                          class={
                            error && error.firstName
                              ? "is-invalid form-floating-row d-flex flex-wrap"
                              : "form-floating-row d-flex flex-wrap"
                          }
                        >
                          <div class="ff-column">
                            <div class="form-floating custom-form-floating">
                              <input
                                type="text"
                                class={
                                  error && error.firstName
                                    ? "is-invalid form-control"
                                    : "form-control "
                                }
                                id="firstName"
                                value={selectValues && selectValues.firstName}
                                placeholder="First name"
                                onChange={(e) => {
                                  const data = { ...selectValues };
                                  data.firstName = e.target.value;
                                  setSelectValues(data);
                                }}
                              />
                              <label for="firstName">First name</label>
                            </div>
                          </div>
                        </div>

                        <div
                          class={
                            error && error.lastName
                              ? "is-invalid form-floating-row d-flex flex-wrap"
                              : "form-floating-row d-flex flex-wrap"
                          }
                        >
                          <div class="ff-column">
                            <div class={"form-floating custom-form-floating"}>
                              <input
                                type="text"
                                class={
                                  error && error.lastName
                                    ? "is-invalid form-control"
                                    : "form-control "
                                }
                                id="lastName"
                                value={selectValues && selectValues.lastName}
                                placeholder="Last name"
                                onChange={(e) => {
                                  const data = { ...selectValues };
                                  data.lastName = e.target.value;
                                  setSelectValues(data);
                                }}
                              />
                              <label for="lastName">Last name</label>
                            </div>
                          </div>
                        </div>
                        <div
                          class={
                            error && error.email
                              ? "is-invalid form-floating-row d-flex flex-wrap"
                              : "form-floating-row d-flex flex-wrap"
                          }
                        >
                          <div class="ff-column">
                            <div class="form-floating custom-form-floating">
                              <input
                                type="email"
                                class={
                                  error && error.email
                                    ? "is-invalid form-control"
                                    : "form-control "
                                }
                                id="emailAddress"
                                value={selectValues && selectValues.email}
                                placeholder="Email Address"
                                onChange={(e) => {
                                  const data = { ...selectValues };
                                  data.email = e.target.value;
                                  setSelectValues(data);
                                }}
                              />
                              <label for="emailAddress">Email Address</label>
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
                                className={
                                  error && error.country
                                    ? "is-invalid form-select c-select"
                                    : "form-select c-select "
                                }
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
                              {error && error.country ? (
                                <p>{error.country}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>

                        <div class="form-floating-row d-flex flex-wrap">
                          <div class="ff-column">
                            <div class="form-floating custom-form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="website"
                                placeholder="Website"
                              />
                              <label for="website">Website</label>
                            </div>
                          </div>
                        </div>
                        <div class="form-floating-row d-flex flex-wrap">
                          <div class="ff-column">
                            <div class="form-floating custom-form-floating">
                              <input
                                type="password"
                                class="form-control"
                                id="floatingPassword"
                                value="********"
                                placeholder="Password"
                              />
                              <label for="floatingPassword">Password</label>
                              <button type="button" class="ff-change-link">
                                Change
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="p-p-btn d-flex align-items-center justify-content-end">
                          <a href="#!" class="btn btn-default btn-sm">
                            Save
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      class={
                        showRightMenu
                          ? " panel-sidebar-right open"
                          : "panel-sidebar-right"
                      }
                    >
                      <div class="panel-header d-lg-none">
                        <div class="panel-header-inside position-relative">
                          <div class="panel-header-title">Selected Topics</div>
                          <div
                            class="panel-close-button d-flex align-items-center justify-content-center"
                            onClick={() => setShowRightMenu(false)}
                          >
                            <img src={close} alt="close__24x24" />
                          </div>
                        </div>
                      </div>
                      <div class="sticky-lg-top">
                        <div class="sticky-widget sticky-label-widget">
                          <p>
                            Select All Species, Regions, Organizations, Zoos &
                            Wildlife, Science & Education, Global Threats,
                            Biologists and Friends That You Want to Follow.
                          </p>
                        </div>
                        <div class="sticky-widget">
                          <RightFeedSidebar
                            showRightMenu={showRightMenu}
                            setShowRightMenu={setShowRightMenu}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageLayout>
      <div class="sticky-bottom-wrapper sticky-bottom d-lg-none">
        <div class="sbw-inside w-100 d-flex flex-wrap">
          <div class="sbw-item w-50">
            <button
              type="button"
              class="sbw-btn sbw-btn-green"
              id="openLeftPanel"
            >
              Browse Category
            </button>
          </div>
          <div class="sbw-item w-50">
            <button
              type="button"
              class="sbw-btn sbw-btn-light-green"
              id="openRightPanel"
              onClick={() => setShowRightMenu(!showRightMenu)}
            >
              Selected Topics
            </button>
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
});

const mapStateToProps = (state) => ({
  getMisc: getMisc(state),
  getUser: getUser(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EditUserProfile));
