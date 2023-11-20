import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AlertError from "../../common/alerts/alertError";
import {
  getUser,
  getUsersDropdownData,
  followUnfollowMultipleFriends,
} from "../../store/users";
import { toast } from "react-toastify";
import close from "../../include/images/search-close-18x18.svg";
import {
  sideBarApisListings,
  getEnvironmentalistList,
} from "../../store/sidebarApis";
import Header from "./header";
import NextButton from "../../common/form/nextButton";

const ProfileUpdatefour = (props) => {
  const [loading, setLoading] = useState(false);
  const [environmentalistDropdownData, setEnvironmentalistDropdownData] =
    useState(null);
  const [friendsDropdownData, setFriendsDropdownData] = useState(null);
  const [textSearched, setTextSearched] = useState();
  const [textEnvSearched, setTextEnvSearched] = useState();

  useEffect(() => {
    setLoading(true);
    const payload = {
      keyword: textEnvSearched ? textEnvSearched : "",
    };
    props.getEnvironmentalistList(payload, (res) => {
      if (res && res.status === 200) {
        setEnvironmentalistDropdownData(res?.data?.data);
        setLoading(false);
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
  }, [textEnvSearched]);

  useEffect(() => {
    setLoading(true);
    const payload = {
      keyword: textSearched ? textSearched : "",
    };
    props.getUsersDropdownData(payload, (res) => {
      if (res && res.status === 200) {
        setFriendsDropdownData(res?.data?.data);
        setLoading(false);
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
  }, [textSearched]);

  //  for tab switch
  const [isEnvMenu, setIsEnvMenu] = useState(true);
  const [isFriendMenu, setIsFriendMenu] = useState(false);
  const togglerEnv = () => {
    setIsEnvMenu(!isEnvMenu);
    if (isFriendMenu) {
      setIsFriendMenu(!isFriendMenu);
    }
  };
  const togglerFriend = () => {
    if (isEnvMenu) {
      setIsEnvMenu(!isEnvMenu);
    }
    setIsFriendMenu(!isFriendMenu);
  };

  // for select env

  const [selectEnv, setSelectEnv] = useState(
    props?.steps?.data?.EnvData
      ? props?.steps?.data?.EnvData &&
          props?.steps?.data?.EnvData.map((item) => item._id)
      : []
  );
  const [selectEnvName, setSelectEnvName] = useState(
    props?.steps?.data?.EnvData
      ? props?.steps?.data?.EnvData &&
          props?.steps?.data?.EnvData.map((item) => item)
      : []
  );

  const [selectFriend, setSelectFriend] = useState(
    props?.steps?.data?.FriendData
      ? props?.steps?.data?.FriendData &&
          props?.steps?.data?.FriendData.map((item) => item._id)
      : []
  );

  const hanldeFollowAll = () => {
    const allEnvIds = environmentalistDropdownData.map((item) => item._id);
    setSelectEnv(allEnvIds);
    setSelectEnvName(environmentalistDropdownData);
  };

  const hanldeFollowAllFriend = () => {
    const allFriendsIds = friendsDropdownData.map((item) => item._id);
    setSelectFriend(allFriendsIds);
    setLoading(true);
    const payload = {
      userIds: allFriendsIds,
    };
    props.followUnfollowMultipleFriends(payload, (res) => {
      if (res && res.status === 200) {
        const param = {
          keyword: "",
        };
        props.getUsersDropdownData(param, (res) => {
          if (res && res.status === 200) {
            setFriendsDropdownData(res?.data?.data);
            setLoading(false);
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
      } else {
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
  };

  console.log(selectFriend);
  const hanldeUnFollowAllFriend = () => {
    const allFriendsIds = friendsDropdownData.filter(
      (item) => item.isFollowing === true && item._id
    );
    setSelectFriend([]);
    setLoading(true);
    const payload = {
      userIds: allFriendsIds
        ? allFriendsIds &&
          allFriendsIds.length > 0 &&
          allFriendsIds.map((item) => item?._id)
        : [],
    };
    props.followUnfollowMultipleFriends(payload, (res) => {
      if (res && res.status === 200) {
        const param = {
          keyword: "",
        };
        props.getUsersDropdownData(param, (res) => {
          if (res && res.status === 200) {
            setFriendsDropdownData(res?.data?.data);
            setLoading(false);
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
      } else {
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
  };

  const handleFollow = (item) => {
    setLoading(true);
    const data = [...selectFriend];

    if (data.includes(item?._id)) {
      const a = data.filter((val) => val !== item?._id);

      setSelectFriend(a);
    } else {
      data.push(item._id);

      setSelectFriend(data);
    }
    const payload = {
      userIds: [item?._id],
    };
    props.followUnfollowMultipleFriends(payload, (res) => {
      if (res && res.status === 200) {
        const param = {
          keyword: "",
        };
        props.getUsersDropdownData(param, (res) => {
          if (res && res.status === 200) {
            setFriendsDropdownData(res?.data?.data);
            setLoading(false);
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
      } else {
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
  };

  const handleNextBtn = () => {
    props.setSteps({
      step: 7,
      data: {
        ...props.steps.data,
        EnvData: selectEnvName ? selectEnvName : [],
      },
    });
  };

  const handleNext = () => {
    props.setSteps({
      step: 7,
      data: {
        ...props.steps.data,
        FriendData:
          friendsDropdownData &&
          friendsDropdownData.length > 0 &&
          friendsDropdownData.filter(
            (item) => item.isFollowing === true && item
          ),
      },
    });
  };

  return (
    <div class="page-outer-wrapper font-family-poppins grey-bg min-vh-100">
      <Header step={"step-3"} />
      <div class="registration-flow-container fw-medium">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="rfc-content-holder lg-holder mx-auto">
                <div class="rf-head-row">
                  <div class="rf-step-count d-flex align-items-center">
                    Step <span class="rf-current">03</span>{" "}
                    <span class="rf-total">/ 03</span>
                  </div>
                  <h1>Biologists and Friends to Follow</h1>

                  <div class="nav nav-tabs step-tabs" id="myTab" role="tablist">
                    <div class="nav-item" role="presentation">
                      <div
                        onClick={togglerEnv}
                        className={isEnvMenu ? "nav-link active" : "nav-link"}
                        id="tabA"
                        data-bs-toggle="tab"
                        data-bs-target="#tabA-pane"
                        aria-selected="true"
                      >
                        Biologists
                      </div>
                    </div>
                    <div class="nav-item" role="presentation">
                      <div
                        onClick={togglerFriend}
                        className={
                          isFriendMenu ? "nav-link active" : "nav-link"
                        }
                        id="tabB"
                        data-bs-toggle="tab"
                        data-bs-target="#tabB-pane"
                        aria-selected="true"
                      >
                        Friends
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-content" id="myTabContent">
                  {isEnvMenu && (
                    <div class="tab-pane fade show active" id="tabA-pane">
                      <form class="rf-form-row-group">
                        <div class="two-column-row d-flex flex-wrap">
                          <div class="tc-left">
                            <div class="signup-modal-title fw-medium">
                              Following
                            </div>
                            {selectEnv && selectEnv.length > 0 && (
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={() => {
                                    const data = [];
                                    setSelectEnv(data);
                                    setSelectEnvName(data);
                                  }}
                                >
                                  Unfollow All
                                </Link>
                              </div>
                            )}

                            <div class="check-group-list w-full-list friends-check-list">
                              {selectEnvName &&
                                selectEnvName.length > 0 &&
                                selectEnvName.map((item) => {
                                  return (
                                    <div class="check-group-item">
                                      <div class="custom-form-check">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id="flexCheckA__1"
                                          checked
                                        />
                                        <label
                                          class="form-check-label"
                                          for="flexCheckA__1"
                                        >
                                          <div class="friends-list d-flex flex-wrap align-items-center">
                                            <div class="friends-img-box">
                                              <img
                                                src={
                                                  item?.coverImage?.original
                                                    ? process.env
                                                        .REACT_APP_MEDIA +
                                                      item?.coverImage?.original
                                                    : ""
                                                }
                                                alt=""
                                              />
                                            </div>
                                            <div class="friends-text-box">
                                              {item?.name}
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div class="tc-right">
                            <div class="signup-modal-title fw-medium">
                              Who to Follow
                            </div>
                            <div class="tc-right-inside">
                              <div class="modal-serch-box position-relative">
                                <input
                                  type="text"
                                  class="modal-search"
                                  placeholder="Search"
                                  value={textEnvSearched}
                                  onChange={(e) =>
                                    setTextEnvSearched(e.target.value)
                                  }
                                />
                                <button
                                  type="button"
                                  class="modal-search-close-icon"
                                  onClick={() => setTextEnvSearched("")}
                                >
                                  <img src={close} alt="alt close" />
                                </button>
                              </div>
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={hanldeFollowAll}
                                >
                                  Follow All
                                </Link>
                              </div>
                              <div class="tc-search-result-row hide-scrollbar">
                                <ul class="filter-content-list">
                                  {environmentalistDropdownData &&
                                    environmentalistDropdownData.length > 0 &&
                                    environmentalistDropdownData.map((item) => {
                                      return (
                                        <div class="tc-search-result">
                                          <div class="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                                            <div class="friends-list d-flex flex-wrap align-items-center">
                                              <div class="friends-img-box">
                                                <img
                                                  src={
                                                    item?.coverImage?.original
                                                      ? process.env
                                                          .REACT_APP_MEDIA +
                                                        item?.coverImage
                                                          ?.original
                                                      : ""
                                                  }
                                                  alt=""
                                                />
                                              </div>
                                              <div class="friends-text-box">
                                                {item?.name}
                                              </div>
                                            </div>
                                            <div class="tc-friends-btn">
                                              <div
                                                class="btn btn-default btn-block"
                                                onClick={() => {
                                                  const data = [...selectEnv];
                                                  const data1 = [
                                                    ...selectEnvName,
                                                  ];
                                                  if (
                                                    data.includes(item?._id)
                                                  ) {
                                                    const a = data.filter(
                                                      (val) => val !== item?._id
                                                    );
                                                    const b = data1.filter(
                                                      (val) =>
                                                        val._id !== item._id
                                                    );
                                                    setSelectEnvName(b);
                                                    setSelectEnv(a);
                                                  } else {
                                                    data.push(item._id);
                                                    data1.push(item);
                                                    setSelectEnvName(data1);
                                                    setSelectEnv(data);
                                                  }
                                                }}
                                              >
                                                {selectEnv &&
                                                selectEnv.includes(item?._id)
                                                  ? "Unfollow"
                                                  : "Follow"}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="rf-form-btn d-flex align-items-center justify-content-end">
                          <NextButton
                            handleSubmit={handleNextBtn}
                            classData={
                              selectEnvName && selectEnvName.length > 0
                                ? "btn btn-default btn-lg"
                                : "btn btn-default btn-lg disabled"
                            }
                            label="Next"
                          />
                        </div>
                      </form>
                    </div>
                  )}
                  {isFriendMenu && (
                    <div
                      class={
                        isFriendMenu
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="tabB-pane"
                    >
                      <form class="rf-form-row-group">
                        <div class="two-column-row d-flex flex-wrap">
                          <div class="tc-left">
                            <div class="signup-modal-title fw-medium">
                              Following
                            </div>
                            {selectFriend && selectFriend.length > 0 && (
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={hanldeUnFollowAllFriend}
                                >
                                  Unfollow All
                                </Link>
                              </div>
                            )}

                            <div class="check-group-list w-full-list friends-check-list">
                              <div class="check-group-item">
                                {friendsDropdownData &&
                                  friendsDropdownData.length > 0 &&
                                  friendsDropdownData.map((item) => {
                                    return (
                                      <>
                                        {item.isFollowing === true && (
                                          <div class="custom-form-check">
                                            <input
                                              class="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="tabflexCheckA__1"
                                              checked
                                            />
                                            <label
                                              class="form-check-label"
                                              for="tabflexCheckA__1"
                                            >
                                              <div class="friends-list d-flex flex-wrap align-items-center">
                                                <div class="friends-img-box">
                                                  <img
                                                    src={
                                                      item?.profilePicture
                                                        ?.original
                                                        ? process.env
                                                            .REACT_APP_MEDIA +
                                                          item?.profilePicture
                                                            ?.original
                                                        : ""
                                                    }
                                                    alt=""
                                                  />
                                                </div>
                                                <div class="friends-text-box">
                                                  {item?.firstName}{" "}
                                                  {item?.lastName}
                                                </div>
                                              </div>
                                            </label>
                                          </div>
                                        )}
                                      </>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                          <div class="tc-right">
                            <div class="signup-modal-title fw-medium">
                              Who to Follow
                            </div>
                            <div class="tc-right-inside">
                              <div class="modal-serch-box position-relative">
                                <input
                                  type="text"
                                  class="modal-search"
                                  placeholder="Search"
                                  value={textSearched}
                                  onChange={(e) =>
                                    setTextSearched(e.target.value)
                                  }
                                />
                                <button
                                  type="button"
                                  class="modal-search-close-icon"
                                  onClick={() => {
                                    setTextSearched("");
                                  }}
                                >
                                  <img src={close} alt="alt close" />
                                </button>
                              </div>
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={hanldeFollowAllFriend}
                                >
                                  Follow All
                                </Link>
                              </div>
                              <div class="tc-search-result-row hide-scrollbar">
                                <ul class="filter-content-list">
                                  {friendsDropdownData &&
                                    friendsDropdownData.length > 0 &&
                                    friendsDropdownData.map((item) => {
                                      return (
                                        <div class="tc-search-result">
                                          <div class="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                                            <div class="friends-list d-flex flex-wrap align-items-center">
                                              <div class="friends-img-box">
                                                <img
                                                  src={
                                                    item?.profilePicture
                                                      ?.original
                                                      ? process.env
                                                          .REACT_APP_MEDIA +
                                                        item?.profilePicture
                                                          ?.original
                                                      : ""
                                                  }
                                                  alt=""
                                                />
                                              </div>
                                              <div class="friends-text-box">
                                                {item?.firstName}{" "}
                                                {item?.lastName}
                                              </div>
                                            </div>
                                            <div class="tc-friends-btn">
                                              <Link
                                                class="btn btn-default btn-block"
                                                onClick={() => {
                                                  handleFollow(item);
                                                }}
                                              >
                                                {item.isFollowing === true
                                                  ? "Unfollow"
                                                  : "Follow"}
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="rf-form-btn d-flex align-items-center justify-content-end">
                          <NextButton
                            handleSubmit={handleNext}
                            classData={
                              selectFriend && selectFriend.length > 0
                                ? "btn btn-default btn-lg"
                                : "btn btn-default btn-lg disabled"
                            }
                            label="Next"
                          />
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  followUnfollowMultipleFriends: (data, callback) =>
    dispatch(followUnfollowMultipleFriends(data, callback)),
  getEnvironmentalistList: (params, callback) =>
    dispatch(getEnvironmentalistList(params, callback)),
  getUsersDropdownData: (params, callback) =>
    dispatch(getUsersDropdownData(params, callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProfileUpdatefour));
