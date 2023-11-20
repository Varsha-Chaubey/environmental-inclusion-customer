import React, { useEffect, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import close from "../../include/images/close-24x24.svg";
import {
  getMyPostData,
  getUsersPreferences,
  getUser,
  deleteMyPost,
} from "../../store/users";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import editIcon from "../../include/images/heart.svg";
import wIcon from "../../include/images/w-icon-1.svg";
import wIcon2 from "../../include/images/w-icon-2.svg";
import wIcon3 from "../../include/images/w-icon-3.svg";
import wIcon4 from "../../include/images/w-icon-4.svg";
import wIcon5 from "../../include/images/w-icon-5.svg";
import profileImage from "../../include/images/profile-w-img.jpg";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import RightFeedSidebar from "../../components/common/pageInfoSidebar/rightFeedSidebar";
import LeftFeedSidebar from "../../components/common/pageInfoSidebar/leftSideBar";
import location from "../../include/images/w-page-link-0.svg";
import link from "../../include/images/w-page-link-1.svg";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import AlertSuccess from "../../common/alerts/alertSuccess";
const UserProfile = (props) => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("createdAt");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const payload = {
      keyword: "",
      page: page,
      sort,
      order,
    };
    props.getMyPostData(payload, (res) => {
      if (res && res.status === 200) {
        setPage(1);
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
  }, [sort, order, page]);

  const myPostData =
    props.getUser && props.getUser.myPost && props.getUser.myPost.data;

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

  const deleteHandler = (item) => {
    setLoadingMain(true);
    const id = item?._id;
    props.deleteMyPost(id, (res) => {
      if (res && res.status === 200) {
        const payload = {
          keyword: "",
          page: page,
          sort,
          order,
        };
        props.getMyPostData(payload, (res) => {
          if (res && res.status === 200) {
            setLoadingMain(false);
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
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
                        <LeftFeedSidebar />
                      </div>
                    </div>
                    <div class="panel-main-content d-flex flex-column">
                      <div class="panel-body flex-grow-1">
                        <div class="widget-profile-block">
                          <div class="widget-profile-wrapper">
                            <div class="wpw-title">
                              Environmental Inclusion Feeds
                            </div>
                            <div class="wpw-content-row">
                              <div class="wpw-content-img-box">
                                <img src={profileImage} alt="profile w img" />
                              </div>
                              <div class="wpw-content">
                                <div class="wpw-content-head d-flex align-items-center justify-content-between">
                                  <div class="wpw-content-head-icon">
                                    <img
                                      src={
                                        userProfile?.profilePicture?.original
                                          ? process.env.REACT_APP_MEDIA +
                                            userProfile?.profilePicture
                                              ?.original
                                          : ""
                                      }
                                      alt="row icon"
                                    />
                                  </div>
                                  <div class="wpw-content-head-btn">
                                    <Link class="btn-dark-grey" to="/edit-profile">
                                      Edit profile
                                    </Link>
                                  </div>
                                </div>
                                <div class="wpw-content-body">
                                  <div class="w-body-content">
                                    <h4 className="caps-text">
                                      {userProfile?.firstName}{" "}
                                      {userProfile?.lastName}
                                    </h4>
                                    <p>
                                      Lorem Ipsum has been the industry's
                                      standard dummy text ever since the 1500s,
                                      when an unknown printer took a galley of
                                      type and scrambled.
                                    </p>
                                    <div class="w-page-link-list d-sm-flex flex-wrap">
                                      <div class="w-page-link-item">
                                        <div class="w-page-link-box w-100 h-100 d-flex flex-wrap align-items-center">
                                          <div class="w-page-link-icon">
                                            <img
                                              src={location}
                                              alt="w page link"
                                            />
                                          </div>
                                          <div class="w-page-link">
                                            {userProfile &&
                                            userProfile?.location
                                              ? userProfile?.location
                                                  ?.countryName
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                      <div class="w-page-link-item">
                                        <div class="w-page-link-box w-100 h-100 d-flex flex-wrap align-items-center">
                                          <div class="w-page-link-icon">
                                            <img src={link} alt="w page link" />
                                          </div>
                                          <div class="w-page-link">
                                            <a href="#" target="_blank">
                                              {userProfile &&
                                                userProfile?.email}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="ww-text-list d-flex flex-wrap align-items-center">
                                      <div class="ww-text-item">
                                        <div class="ww-text-box">
                                          <span>
                                            {userProfile &&
                                              userProfile?.followingCount}
                                          </span>
                                          Following
                                        </div>
                                      </div>
                                      <div class="ww-text-item">
                                        <div class="ww-text-box">
                                          <span>
                                            {userProfile &&
                                              userProfile?.followerCount}
                                          </span>
                                          Followers
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="profile-page-link d-flex flex-wrap align-items-center justify-content-between">
                                    <div class="p-p-item active">
                                      <a href="#" class="p-p-box">
                                        Posts
                                      </a>
                                    </div>
                                    <div class="p-p-item">
                                      <a href="#" class="p-p-box">
                                        Media
                                      </a>
                                    </div>
                                    <div class="p-p-item">
                                      <a href="#" class="p-p-box">
                                        Likes
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {myPostData &&
                          myPostData.length > 0 &&
                          myPostData.map((item) => {
                            return (
                              <div class="widget d-flex flex-wrap">
                                <div class="widget-icon">
                                  <div class="w-icon d-flex align-items-center justify-content-center overflow-hidden">
                                    <img
                                      src={
                                        userProfile?.profilePicture?.original
                                          ? process.env.REACT_APP_MEDIA +
                                            userProfile?.profilePicture
                                              ?.original
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
                                          {item?.name ? item?.name : ""}
                                        </div>
                                        <span class="w-dot-box"></span>
                                        <div class="w-time-box d-flex align-items-center">
                                          <span class="w-time-count">
                                            {moment(
                                              item && item.createdAt
                                            ).format("mm")}
                                          </span>{" "}
                                          min
                                        </div>
                                      </div>
                                      <div class="w-h-button-box d-flex align-items-center justify-content-center">
                                        <Dropdown className="btn-group heart-icon-box  d-flex align-items-center justify-content-center cursor-pointer">
                                          <Dropdown.Toggle
                                            as="span"
                                            id="dropdown-basic"
                                            className="dropdown-toggle "
                                          >
                                            <img src={editIcon} alt="" />
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                            <Dropdown.Item className="dropdown-item">
                                              Edit
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                              className="dropdown-item delete"
                                              onClick={() =>
                                                deleteHandler(item)
                                              }
                                            >
                                              Delete
                                            </Dropdown.Item>

                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </div>
                                    <div class="w-text-box">
                                      <p>
                                        {item?.description
                                          ? item?.description
                                          : ""}
                                      </p>
                                    </div>
                                    <div class="w-iconlist d-flex flex-wrap align-items-center justify-content-between">
                                      <div class="w-iconlist-item">
                                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                                          <div class="w-iconl-box">
                                            <img src={wIcon} alt="w icon 1" />
                                          </div>
                                        </div>
                                      </div>
                                      <div class="w-iconlist-item">
                                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                                          <div class="w-iconl-box">
                                            <img src={wIcon2} alt="w icon 2" />
                                          </div>
                                          <div class="w-textl-box">3</div>
                                        </div>
                                      </div>
                                      <div class="w-iconlist-item">
                                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                                          <div class="w-iconl-box">
                                            <img src={wIcon3} alt="w icon 3" />
                                          </div>
                                          <div class="w-textl-box">16</div>
                                        </div>
                                      </div>
                                      <div class="w-iconlist-item">
                                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                                          <div class="w-iconl-box">
                                            <img src={wIcon4} alt="w icon 4" />
                                          </div>
                                          <div class="w-textl-box">3</div>
                                        </div>
                                      </div>
                                      <div class="w-iconlist-item">
                                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                                          <div class="w-iconl-box">
                                            <img src={wIcon5} alt="w icon 5" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
                        <div class="sticky-widget sticky-widget-wrap">
                          <div class="sw-text-wrap d-flex flex-wrap align-items-center">
                            <div class="sw-text-img">
                              <div class="sw-img d-flex align-items-center justify-content-center overflow-hidden">
                                <img
                                  src={
                                    userProfile?.profilePicture?.original
                                      ? process.env.REACT_APP_MEDIA +
                                        userProfile?.profilePicture?.original
                                      : ""
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            <div class="sw-text-label caps-text">
                              {userProfile?.firstName} {userProfile?.lastName}
                            </div>
                          </div>
                          <div class="sw-followers-box d-flex flex-wrap align-items-center">
                            <div class="sw-followers-item">
                              <span>
                                {userProfile && userProfile.followerCount}
                              </span>{" "}
                              Followers
                            </div>
                            <div class="sw-followers-item">
                              <span>
                                {userProfile && userProfile.followingCount}
                              </span>{" "}
                              Following
                            </div>
                          </div>
                          <div class="sw-btn-wrap">
                            <Link class="view-text-btn" to="/view-profile">
                              View Profile
                            </Link>
                          </div>
                        </div>
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
              onClick={() => setShowMenu(!showMenu)}
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
  getMyPostData: (params, callback) =>
    dispatch(getMyPostData(params, callback)),
  getUsersPreferences: (params, callback) =>
    dispatch(getUsersPreferences(params, callback)),
  deleteMyPost: (params, callback) => dispatch(deleteMyPost(params, callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserProfile));
