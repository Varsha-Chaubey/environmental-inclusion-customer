import React from "react";
import { Modal } from "react-bootstrap";
import close from "../../../include/images/x-close-24x24.svg";
import Mclose from "../../../include/images/close-24x24.svg";
import searchClose from "../../../include/images/search-close-18x18.svg";
import { useState } from "react";
import {
  getUser,
  updateYourProfile,
  followUnfollowMultipleFriends,
  getUsersDropdownData,
} from "../../../store/users";
import {
  getEnvironmentalistList,
  sideBarApisListings,
} from "../../../store/sidebarApis";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AlertError from "../../../common/alerts/alertError";
import AlertSuccess from "../../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
const WhoToFollowEditModal = (props) => {
  const isMobile = useCheckMobileScreen();
  const [envDropdown, setEnvDropdown] = useState(null);
  const [userDropdown, setUserDropdown] = useState(null);
  const [textSearched, setTextSearched] = useState();
  const [textEnvSearched, setTextEnvSearched] = useState();
  const [selectEnv, setSelectEnv] = useState([]);
  const [selectEnvName, setSelectEnvName] = useState([]);

  useEffect(() => {
    const a =
      props?.envData && props?.envData.length > 0
        ? props?.envData.map((item) => item?._id)
        : [];
    setSelectEnv(a);

    const b = props?.envData ? props?.envData : [];
    setSelectEnvName(b);
    
  }, [props?.envData]);

  useEffect(() => {
    props.setLoading(true);
    const payload = {
      keyword: textEnvSearched ? textEnvSearched : "",
    };
    props.getEnvironmentalistList(payload, (res) => {
      if (res && res.status === 200) {
        setEnvDropdown(res?.data?.data);
        props.setLoading(false);
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
    props.setLoading(true);
    const payload = {
      keyword: textSearched ? textSearched : "",
    };
    props.getUsersDropdownData(payload, (res) => {
      if (res && res.status === 200) {
        setUserDropdown(res?.data?.data);
        props.setLoading(false);
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

  const hanldeFollowAll = () => {
    const allEnvIds = envDropdown.map((item) => item._id);
    setSelectEnv(allEnvIds);
    setSelectEnvName(envDropdown);
  };

  const hanldeFollowAllFriend = () => {
    const allFriendsIds = userDropdown.map((item) => item._id);
    props.setLoading(true);
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
            setUserDropdown(res?.data?.data);
            props.setLoading(false);
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
        props.setLoading(false);
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
    props.setLoading(true);
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
            setUserDropdown(res?.data?.data);
            props.setLoading(false);
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
        props.setLoading(false);
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

  const handleUpdateprofile = (e) => {
    e.preventDefault();
    props.setLoading(true);
    const payload = {
      preferredEnvironmentalists: selectEnv ? selectEnv : [],
    };
    props.updateYourProfile(payload, (res) => {
      if (res && res.status === 200) {
        props.setLoading(false);
        props.onHide();
        toast(<AlertSuccess message="Information Saved" />);
      } else {
        props.setLoading(false);
        props.onHide();
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
    <Modal
      className="modal fade signup-modal font-family-poppins"
      id="whoTofollowModal"
      show={props.show}
      onHide={() => props.onHide()}
      style={{ marginTop: "4%" }}
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="signup-modal-parent d-flex flex-wrap">
            <div class="signup-modal-box">
              <div class="signup-modal-header">
                <div class="smh-insider position-relative d-flex justify-content-between">
                  <h4 className={isMobile ? "mt-5" : ""}>
                    Biologists and Friends to Follow
                  </h4>
                  {!isMobile && props.isViewAll && (
                    <div className="accor-edit-btn">
                      <Link
                        className="edit-green-btn"
                        onClick={() => {
                          props.setIsEdit(!props.isEdit);
                          if (props.isViewAll) {
                            props.setIsViewAll(!props.isViewAll);
                          }
                        }}
                      >
                        Edit
                      </Link>
                    </div>
                  )}
                  <div class="modal_close-box d-lg-none">
                    <div
                      class={`signup-modal-close ms-auto ${
                        isMobile ? "mt-5" : ""
                      }`}
                      data-bs-dismiss="modal"
                      onClick={() => props.onHide()}
                    >
                      <img src={Mclose} alt="x close icon" />
                    </div>
                  </div>
                </div>
                <p>
                  We would like to recognize scientists and biologists who have
                  dedicated their lives to helping endangered species. Their
                  effort is often the last line of defense, keeping these
                  precious animals from becoming extinct. They have brought
                  awareness to the problem and personally battle the threats
                  that face these animals every day. Following and supporting
                  their programs can really make a difference.
                </p>
                {isMobile && props.isViewAll && (
                  <div className="accor-edit-btn">
                    <Link
                      className="edit-green-btn "
                      onClick={() => {
                        props.setIsEdit(!props.isEdit);
                        if (props.isViewAll) {
                          props.setIsViewAll(!props.isViewAll);
                        }
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </div>
              <div class="signup-modal-body pt-0">
                <div class="nav nav-tabs step-tabs" id="myTab" role="tablist">
                  <div class="nav-item" role="presentation">
                    <div
                      onClick={props.togglerEnv}
                      class={props?.isEnvMenu ? "nav-link active" : "nav-link"}
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
                      onClick={props.togglerFriend}
                      class={
                        props?.isFriendMenu ? "nav-link active" : "nav-link"
                      }
                      id="tabB"
                      data-bs-toggle="tab"
                      data-bs-target="#tabB-pane"
                      aria-selected="false"
                    >
                      Friends
                    </div>
                  </div>
                </div>
                <div class="tab-content" id="myTabContent">
                  {props.isEnvMenu && (
                    <div class="tab-pane fade show active" id="tabA-pane">
                      <form class="rf-form-row-group">
                        <div class="two-column-row d-flex flex-wrap">
                          <div class="tc-left">
                            <div class="signup-modal-title fw-medium">
                              Following
                            </div>
                            {props.isEdit &&
                              selectEnvName &&
                              selectEnvName.length > 0 && (
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

                            <div
                              class={
                                selectEnvName && selectEnvName.length >= 10
                                  ? "check-group-list w-full-list friends-check-list custom-edit-h"
                                  : "check-group-list w-full-list friends-check-list"
                              }
                            >
                              {selectEnvName &&
                                selectEnvName.length > 0 &&
                                selectEnvName.map((item) => (
                                  <div class="check-group-item">
                                    <div class="custom-form-check ">
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
                                                item?.coverImage?.original
                                                  ? process.env
                                                      .REACT_APP_MEDIA +
                                                    item?.coverImage?.original
                                                  : ""
                                              }
                                              alt="frand img 01"
                                            />
                                          </div>
                                          <div class="friends-text-box">
                                            {item?.name}
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                ))}
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
                                  <img src={searchClose} alt="alt close" />
                                </button>
                              </div>
                              {props.isEdit && (
                                <div class="tc-btn-box">
                                  <Link
                                    class="clear__all__btn"
                                    onClick={hanldeFollowAll}
                                  >
                                    Follow All
                                  </Link>
                                </div>
                              )}
                              <div class="tc-search-result-row hide-scrollbar">
                                <ul class="filter-content-list">
                                  {props.isEdit ? (
                                    <>
                                      {envDropdown &&
                                        envDropdown.length > 0 &&
                                        envDropdown.map((item) => {
                                          return (
                                            <div class="tc-search-result">
                                              <div class="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                                                <div class="friends-list d-flex flex-wrap align-items-center">
                                                  <div class="friends-img-box">
                                                    <img
                                                      src={
                                                        item?.coverImage
                                                          ?.original
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
                                                      const data = [
                                                        ...selectEnv,
                                                      ];
                                                      const data1 = [
                                                        ...selectEnvName,
                                                      ];
                                                      if (
                                                        data.includes(item?._id)
                                                      ) {
                                                        const a = data.filter(
                                                          (val) =>
                                                            val !== item?._id
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
                                                    Follow
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </>
                                  ) : (
                                    <>
                                      {envDropdown &&
                                        envDropdown.length > 0 &&
                                        envDropdown.map((item) => {
                                          return (
                                            <div class="tc-search-result">
                                              <div class="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                                                <div class="friends-list d-flex flex-wrap align-items-center">
                                                  <div class="friends-img-box">
                                                    <img
                                                      src={
                                                        item?.coverImage
                                                          ?.original
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
                                                  <div class="btn btn-default btn-block">
                                                    Follow
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  {props.isFriendMenu && (
                    <div class="tab-pane fade show active" id="tabB-pane">
                      <form class="rf-form-row-group">
                        <div class="two-column-row d-flex flex-wrap">
                          <div class="tc-left">
                            <div class="signup-modal-title fw-medium">
                              Following
                            </div>
                            {props.isEdit && (
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={hanldeFollowAllFriend}
                                >
                                  Unfollow All
                                </Link>
                              </div>
                            )}
                            <div class="check-group-list w-full-list friends-check-list">
                              <div class="check-group-item">
                                {userDropdown &&
                                  userDropdown.length > 0 &&
                                  userDropdown.map((item) => {
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
                                  onClick={() => setTextSearched("")}
                                >
                                  <img src={searchClose} alt="alt close" />
                                </button>
                              </div>
                              {props?.isEdit && (
                                <div class="tc-btn-box">
                                  <Link
                                    class="clear__all__btn"
                                    onClick={hanldeFollowAllFriend}
                                  >
                                    Follow All
                                  </Link>
                                </div>
                              )}
                              <div class="tc-search-result-row hide-scrollbar">
                                <ul class="filter-content-list">
                                  {props.isEdit ? (
                                    <>
                                      {userDropdown &&
                                        userDropdown.length > 0 &&
                                        userDropdown.map((item) => {
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
                                                    Follow
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </>
                                  ) : (
                                    <>
                                      {userDropdown &&
                                        userDropdown.length > 0 &&
                                        userDropdown.map((item) => {
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
                                                  <Link class="btn btn-default btn-block">
                                                    Follow
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              <div class="signup-modal-footer d-flex align-items-start justify-content-end">
                <div
                  class="btn btn-default btn-md"
                  onClick={(e) => handleUpdateprofile(e)}
                >
                  Save
                </div>
              </div>
            </div>
            <div class="signup-modal-close-box d-none d-lg-block">
              <div
                class="signup-modal-close ms-auto"
                data-bs-dismiss="modal"
                onClick={() => props.onHide()}
              >
                <img src={close} alt="x close icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getEnvironmentalistList: (params, callback) => {
    dispatch(getEnvironmentalistList(params, callback));
  },
  updateYourProfile: (data, callback) => {
    dispatch(updateYourProfile(data, callback));
  },
  followUnfollowMultipleFriends: (data, callback) =>
    dispatch(followUnfollowMultipleFriends(data, callback)),
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
)(React.memo(WhoToFollowEditModal));
