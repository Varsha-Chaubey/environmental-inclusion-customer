import React, { useEffect, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import close from "../../include/images/close-24x24.svg";
import {
  getMyFeedData,
  getUsersPreferences,
  getUser,
  deleteMyPost,
} from "../../store/users";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import RightFeedSidebar from "../../components/common/pageInfoSidebar/rightFeedSidebar";
import LeftFeedSidebar from "../../components/common/pageInfoSidebar/leftSideBar";
import AlertSuccess from "../../common/alerts/alertSuccess";
import FeedCard from "../../components/common/feedEditModals/feedCard";

const IndexFeed = (props) => {
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
    props.getMyFeedData(payload, (res) => {
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

  const feedData =
    props.getUser && props.getUser.myFeeds && props.getUser.myFeeds.data;

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

  const handleDeletePost = (item) => {
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
        props.getMyFeedData(payload, (res) => {
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
                      <div class="panel-head">
                        <div class="breadcrumb-row d-flex flex-wrap">
                          <div class="breadcrumb-box">
                            <Link to="/">Home</Link>
                          </div>
                          <div class="breadcrumb-box">Feeds</div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <h1>Your Feeds</h1>
                          <div class="accor-edit-btn">
                            <Link class="edit-green-btn" to="/add-post">
                              Add Post
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div class="panel-body flex-grow-1">
                        <FeedCard
                          loadingMain={loadingMain}
                          feedData={feedData}
                          userProfile={userProfile}
                          handleDeletePost={handleDeletePost}
                        />
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
  getMyFeedData: (params, callback) =>
    dispatch(getMyFeedData(params, callback)),
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
)(React.memo(IndexFeed));
