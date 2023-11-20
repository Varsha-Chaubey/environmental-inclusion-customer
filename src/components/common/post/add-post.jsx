import React, { useEffect, useState } from "react";
import close from "../../../include/images/close.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import imgIcon from "../../../include/images/button-img-1.svg";
import videosIcon from "../../../include/images/button-img-2.svg";
import smileIcon from "../../../include/images/button-img-3.svg";
import { toast } from "react-toastify";
import RightFeedSidebar from "../../common/pageInfoSidebar/rightFeedSidebar";
import LeftSideBar from "../../common/pageInfoSidebar/leftSideBar";
import AlertError from "../../../common/alerts/alertError";
import {
  getMyFeedData,
  getUsersPreferences,
  getUser,
} from "../../../store/users";
import PageLayout from "../../../layout/PageLayout/pageLayout";

const AddPost = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("profile", (res) => {
      if (res && res.status === 200) {
        setUserProfile(res?.data?.data);
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

  //   signup
  const [countryDropdown, setCountryDropdown] = useState(null);
  const [selectValues, setSelectValues] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [ImgSrc, setImgSrc] = useState();
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
                            <Link to="/feed">Feeds</Link>
                          </div>
                        </div>
                        <h1>Add Post</h1>
                      </div>
                      <div class="panel-body flex-grow-1">
                        <div class="widget d-flex flex-wrap add-green-border">
                          <div class="widget-icon">
                            <div class="w-icon d-flex align-items-center justify-content-center overflow-hidden">
                              <img
                                src={
                                  userProfile?.profilePicture?.original
                                    ? process.env.REACT_APP_MEDIA +
                                      userProfile?.profilePicture?.original
                                    : ""
                                }
                                alt="feed icon"
                              />
                            </div>
                          </div>
                          <div class="widget-content">
                            <div class="w-content-upper">
                              <div class="w-textarea-block">
                                <textarea
                                  class="w-textarea"
                                  placeholder="Write something here"
                                ></textarea>
                              </div>
                            </div>
                            <div class="w-content-lower">
                              <div class="w-button-holder d-flex flex-wrap align-items-center">
                                <div class="w-button">
                                  <button
                                    type="button"
                                    class="w-button-box d-flex align-items-center justify-content-center"
                                  >
                                    <img src={imgIcon} alt="image gallery" />
                                  </button>
                                </div>
                                <div class="w-button">
                                  <button
                                    type="button"
                                    class="w-button-box d-flex align-items-center justify-content-center"
                                  >
                                    <img src={videosIcon} alt="image video" />
                                  </button>
                                </div>
                                <div class="w-button">
                                  <button
                                    type="button"
                                    class="w-button-box d-flex align-items-center justify-content-center"
                                  >
                                    <img src={smileIcon} alt="image smile" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="widget d-flex flex-wrap">
                          <div class="widget-icon">
                            <div class="w-icon d-flex align-items-center justify-content-center overflow-hidden">
                              <img
                                src={
                                  userProfile?.profilePicture?.original
                                    ? process.env.REACT_APP_MEDIA +
                                      userProfile?.profilePicture?.original
                                    : ""
                                }
                                alt="feed icon"
                              />
                            </div>
                          </div>
                          <div class="widget-content">
                            <div class="widget-text-holder">
                              <div class="w-heading-block position-relative">
                                <div class="w-heading-box d-flex align-items-center flex-wrap">
                                  <div class="w-label-box fw-semibold">
                                    Environmental Inclusion
                                  </div>
                                  <span class="w-dot-box"></span>
                                  <div class="w-time-box d-flex align-items-center">
                                    <span class="w-time-count">5</span> min
                                  </div>
                                </div>
                              </div>
                              <div class="w-text-box">
                                <p>
                                  Lorem Ipsum has been the industry's standard
                                  dummy text ever since the 1500s, when an
                                  unknown printer took a galley of type and
                                  scrambled.
                                </p>
                                <div class="w-button-holder d-flex flex-wrap align-items-center">
                                  <div class="w-button">
                                    <button
                                      type="button"
                                      class="w-button-box d-flex align-items-center justify-content-center"
                                    >
                                      <img src={imgIcon} alt="image gallery" />
                                    </button>
                                  </div>
                                  <div class="w-button">
                                    <button
                                      type="button"
                                      class="w-button-box d-flex align-items-center justify-content-center"
                                    >
                                      <img src={videosIcon} alt="image video" />
                                    </button>
                                  </div>
                                  <div class="w-button">
                                    <button
                                      type="button"
                                      class="w-button-box d-flex align-items-center justify-content-center"
                                    >
                                      <img src={smileIcon} alt="image smile" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="w-image-holder">
                                <img
                                  src="include/images/cat-2.jpg"
                                  alt="w image"
                                />
                                <button type="button" class="trash-button-box">
                                  <img
                                    src="include/images/trash-24x24.svg"
                                    alt="w volumne"
                                  />
                                </button>
                              </div>
                              <div class="col-text-area">
                                <div class="col-text-item">
                                  <div class="col-text-box w-100 h-100 d-flex flex-wrap align-items-center justify-content-between">
                                    <div class="col-text-label">
                                      Categories of Species
                                    </div>
                                    <div class="col-badges-box d-flex align-items-center rounded-pill">
                                      <div class="col-badges-label">
                                        Mammals, Balkan lynx
                                      </div>
                                      <button type="button" class="colse-x-btn">
                                        <img
                                          src="include/images/close-x-16.svg"
                                          alt=""
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-text-item">
                                  <div class="col-text-box w-100 h-100 d-flex flex-wrap align-items-center justify-content-between">
                                    <div class="col-text-label">
                                      Science & Education
                                    </div>
                                    <button
                                      type="button"
                                      class="col-select-btn"
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                                <div class="col-text-item">
                                  <div class="col-text-box w-100 h-100 d-flex flex-wrap align-items-center justify-content-between">
                                    <div class="col-text-label">
                                      Organizations, Zoos and Wildlife Reserves
                                    </div>
                                    <button
                                      type="button"
                                      class="col-select-btn"
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                                <div class="col-text-item">
                                  <div class="col-text-box w-100 h-100 d-flex flex-wrap align-items-center justify-content-between">
                                    <div class="col-text-label">Regions</div>
                                    <button
                                      type="button"
                                      class="col-select-btn"
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                                <div class="col-text-item">
                                  <div class="col-text-box w-100 h-100 d-flex flex-wrap align-items-center justify-content-between">
                                    <div class="col-text-label">
                                      War and Threats Environment
                                    </div>
                                    <button
                                      type="button"
                                      class="col-select-btn"
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>

                                <div class="col-btn-group d-flex align-items-center justify-content-between">
                                  <div class="col-dropdown-menu">
                                    <div class="dropdown">
                                      <div
                                        class="has-green-toggle dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <div class="dropdown-toggle-inside d-flex align-items-center">
                                          <div class="dl-icon d-flex flex-wrap align-items-center justify-content-center">
                                            <svg
                                              width="16"
                                              height="17"
                                              viewBox="0 0 16 17"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M7.99967 15.1667C11.6816 15.1667 14.6663 12.1819 14.6663 8.50004C14.6663 4.81814 11.6816 1.83337 7.99967 1.83337C4.31778 1.83337 1.33301 4.81814 1.33301 8.50004C1.33301 12.1819 4.31778 15.1667 7.99967 15.1667Z"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M1.33301 8.5H14.6663"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M7.99967 1.83337C9.66719 3.65894 10.6148 6.02806 10.6663 8.50004C10.6148 10.972 9.66719 13.3411 7.99967 15.1667C6.33215 13.3411 5.38451 10.972 5.33301 8.50004C5.38451 6.02806 6.33215 3.65894 7.99967 1.83337Z"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                            </svg>
                                          </div>
                                          <div class="dl-text">Public</div>
                                          <div class="chevron-down-wrap d-flex align-items-center justify-content-center">
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M4 6L8 10L12 6"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="dropdown-menu">
                                        <div class="dropdown-item">
                                          <a
                                            href="#"
                                            class="dropdown-link w-100 h-100 d-flex flex-wrap align-items-center"
                                          >
                                            <div class="dl-icon d-flex flex-wrap align-items-center justify-content-center">
                                              <svg
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M7.99967 15.1667C11.6816 15.1667 14.6663 12.1819 14.6663 8.50004C14.6663 4.81814 11.6816 1.83337 7.99967 1.83337C4.31778 1.83337 1.33301 4.81814 1.33301 8.50004C1.33301 12.1819 4.31778 15.1667 7.99967 15.1667Z"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M1.33301 8.5H14.6663"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M7.99967 1.83337C9.66719 3.65894 10.6148 6.02806 10.6663 8.50004C10.6148 10.972 9.66719 13.3411 7.99967 15.1667C6.33215 13.3411 5.38451 10.972 5.33301 8.50004C5.38451 6.02806 6.33215 3.65894 7.99967 1.83337Z"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                              </svg>
                                            </div>
                                            <div class="dl-text">Public</div>
                                          </a>
                                        </div>
                                        <div class="dropdown-item">
                                          <a
                                            href="#"
                                            class="dropdown-link w-100 h-100 d-flex flex-wrap align-items-center"
                                          >
                                            <div class="dl-icon d-flex flex-wrap align-items-center justify-content-center">
                                              <svg
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M12.6667 7.83337H3.33333C2.59695 7.83337 2 8.43033 2 9.16671V13.8334C2 14.5698 2.59695 15.1667 3.33333 15.1667H12.6667C13.403 15.1667 14 14.5698 14 13.8334V9.16671C14 8.43033 13.403 7.83337 12.6667 7.83337Z"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M4.66699 7.83337V5.16671C4.66699 4.28265 5.01818 3.43481 5.6433 2.80968C6.26842 2.18456 7.11627 1.83337 8.00033 1.83337C8.88438 1.83337 9.73223 2.18456 10.3573 2.80968C10.9825 3.43481 11.3337 4.28265 11.3337 5.16671V7.83337"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                              </svg>
                                            </div>
                                            <div class="dl-text">Private</div>
                                          </a>
                                        </div>
                                        <div class="dropdown-item">
                                          <a
                                            href="#"
                                            class="dropdown-link w-100 h-100 d-flex flex-wrap align-items-center"
                                          >
                                            <div class="dl-icon d-flex flex-wrap align-items-center justify-content-center">
                                              <svg
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M11.3337 14.5V13.1667C11.3337 12.4594 11.0527 11.7811 10.5526 11.281C10.0525 10.781 9.37424 10.5 8.66699 10.5H3.33366C2.62641 10.5 1.94814 10.781 1.44804 11.281C0.947944 11.7811 0.666992 12.4594 0.666992 13.1667V14.5"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M5.99967 7.83333C7.47243 7.83333 8.66634 6.63943 8.66634 5.16667C8.66634 3.69391 7.47243 2.5 5.99967 2.5C4.52691 2.5 3.33301 3.69391 3.33301 5.16667C3.33301 6.63943 4.52691 7.83333 5.99967 7.83333Z"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M15.333 14.5V13.1667C15.3326 12.5758 15.1359 12.0019 14.7739 11.5349C14.4119 11.0679 13.9051 10.7344 13.333 10.5867"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M10.667 2.58667C11.2406 2.73354 11.749 3.06714 12.1121 3.53488C12.4752 4.00262 12.6722 4.57789 12.6722 5.17C12.6722 5.76212 12.4752 6.33739 12.1121 6.80513C11.749 7.27287 11.2406 7.60647 10.667 7.75334"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                              </svg>
                                            </div>
                                            <div class="dl-text">
                                              Friends Only
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-btn">
                                    <a href="#" class="btn btn-default btn-sm">
                                      Post
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
  getMyFeedData: (params, callback) =>
    dispatch(getMyFeedData(params, callback)),
  getUsersPreferences: (params, callback) =>
    dispatch(getUsersPreferences(params, callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddPost));
