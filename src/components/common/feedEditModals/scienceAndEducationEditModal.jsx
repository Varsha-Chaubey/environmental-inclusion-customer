import React from "react";
import { Modal } from "react-bootstrap";
import close from "../../../include/images/x-close-24x24.svg";
import Mclose from "../../../include/images/close-24x24.svg";
import searchClose from "../../../include/images/search-close-18x18.svg";
import { useState, useEffect } from "react";
import {
  getUser,
  updateYourProfile,
  getUsersPreferences,
} from "../../../store/users";
import {
  getScienceAndEducationList,
  sideBarApisListings,
} from "../../../store/sidebarApis";
import { connect } from "react-redux";
import AlertError from "../../../common/alerts/alertError";
import AlertSuccess from "../../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
import { useRef } from "react";
import NextButton from "../../../common/form/nextButton";
const ScienceAndEducationEditModal = (props) => {
  const isMobile = useCheckMobileScreen();
  var ref = useRef();
  const [scienceAndEducationDropdown, setScienceAndEducationDropdown] =
    useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectScience, setSelectScience] = useState([]);
  const [selectScienceName, setSelectScienceName] = useState([]);

  useEffect(() => {
    const a =
      props?.scienceAndEducationData &&
      props?.scienceAndEducationData.length > 0
        ? props.scienceAndEducationData.map((item) => item?._id)
        : [];
    setSelectScience(a);
    const b = props?.scienceAndEducationData
      ? props?.scienceAndEducationData
      : [];
    setSelectScienceName(b);
  }, [props.scienceAndEducationData]);

  useEffect(() => {
    props.setTempSelectScience([...selectScience]);
    props.setTempSelectScienceName([...selectScienceName]);
  }, [props.show]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    props.setLoading(true);
    const payload = {
      keyword: searchText ? searchText : "",
    };
    props.getScienceAndEducationList(payload, (res) => {
      if (res && res.status === 200) {
        setScienceAndEducationDropdown(res?.data?.data);
        ref && ref.current && ref.current.complete();
        props.setLoading(false);      
      } else {
        ref && ref.current && ref.current.complete();
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
  }, [searchText]);

  const handleSelectAllScience = () => {
    const allIds =
      scienceAndEducationDropdown &&
      scienceAndEducationDropdown.map((item) => item?._id);
    props.setTempSelectScience(allIds);
    props.setTempSelectScienceName(scienceAndEducationDropdown);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    ref && ref.current && ref.current.continuousStart();
    props.setLoading(true);
    const payload = {
      preferredScienceAndEducations: props.tempSelectScience
        ? props.tempSelectScience
        : [],
    };
    props.updateYourProfile(payload, (res) => {
      if (res && res.status === 200) {
        props.getUsersPreferences("scienceAndEducation", (res) => {
          if (res && res.status === 200) {
            props.setScienceAndEducationData(res?.data?.data);
            ref && ref.current && ref.current.complete();
            props.setLoading(false);
            toast(<AlertSuccess message="Information Saved" />);
            props.onHide();
          } else {
            ref && ref.current && ref.current.complete();
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
      }
    });
  };
  return (
    <Modal
      className="modal fade signup-modal font-family-poppins"
      id="scienceEducationModal"
      show={props.show}
      onHide={() => props.onHide()}
      style={{ marginTop: "4%" }}
    >
      <div class="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="signup-modal-parent d-flex flex-wrap">
            <div className="signup-modal-box">
              <div className="signup-modal-header">
                <div className="smh-insider position-relative d-flex justify-content-between">
                  <h4 className={isMobile ? "mt-5" : ""}>
                    Science & Educations to Follow
                  </h4>
                  {!isMobile && props.isViewAll && (
                    <div className="accor-edit-btn">
                      <Link
                        className={`edit-green-btn`}
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
                  <div className="modal_close-box d-lg-none">
                    <div
                      className={`signup-modal-close ms-auto ${
                        isMobile ? "mt-5" : ""
                      }`}
                      data-bs-dismiss="modal"
                      onClick={() => props.onHide()}
                    >
                      <img src={Mclose} alt="" />
                    </div>
                  </div>
                </div>
                <p>
                  Select a group of Science & Educations that you want to
                  follow. You will receive a notification if anything is posted
                  on these Science & Educations pages. You can adjust what you
                  see in your feed below.
                </p>
                {isMobile && props.isViewAll && (
                  <div className="accor-edit-btn">
                    <Link
                      className={`edit-green-btn `}
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
              <div className="signup-modal-body pt-0">
                <div className="two-column-row d-flex flex-wrap">
                  <div className="tc-left">
                    <div className="signup-modal-title fw-medium">Selected</div>
                    {props.isEdit &&
                      props.tempSelectScience &&
                      props.tempSelectScience.length > 0 && (
                        <div className="tc-btn-box">
                          <Link
                            className="clear__all__btn"
                            onClick={() => {
                              const data = [];
                              props.setTempSelectScience(data);
                              props.setTempSelectScienceName(data);
                            }}
                          >
                            Clear All
                          </Link>
                        </div>
                      )}
                    <div
                      class={
                        props.tempSelectScienceName &&
                        props.tempSelectScienceName.length >= 10
                          ? "check-group-list w-full-list custom-edit-h"
                          : "check-group-list w-full-list"
                      }
                    >
                      {props.tempSelectScienceName &&
                        props.tempSelectScienceName.length > 0 &&
                        props.tempSelectScienceName.map((item) => {
                          return (
                            <div className="check-group-item">
                              <div className="custom-form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="tflexCheckA__2"
                                  checked
                                />
                                <label
                                  className="form-check-label"
                                  for="tflexCheckA__2"
                                >
                                  {item?.name}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="tc-right">
                    <div className="signup-modal-title fw-medium">
                      Unselected
                    </div>
                    <div className="tc-right-inside">
                      <div className="modal-serch-box position-relative">
                        <input
                          type="text"
                          className="modal-search"
                          placeholder="Search"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                          type="button"
                          className="modal-search-close-icon"
                          onClick={() => setSearchText("")}
                        >
                          <img src={searchClose} alt="alt close" />
                        </button>
                      </div>
                      {props.isEdit && (
                        <div className="tc-btn-box">
                          <Link
                            className="clear__all__btn"
                            onClick={handleSelectAllScience}
                          >
                            Select All
                          </Link>
                        </div>
                      )}
                      <div className="tc-search-result-row hide-scrollbar">
                        <ul class="filter-content-list">
                          {props.isEdit ? (
                            <>
                              {scienceAndEducationDropdown &&
                                scienceAndEducationDropdown.length > 0 &&
                                scienceAndEducationDropdown.map((item) => {
                                  return (
                                    <div
                                      class="custom-form-check"
                                      style={{
                                        paddingLeft: "0px",
                                        marginTop: "0px",
                                      }}
                                    >
                                      <label class="filter-content-box">
                                        {item?.name}
                                        <input
                                          type="checkbox"
                                          checked={
                                            props.tempSelectScience &&
                                            props.tempSelectScience.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const updatedTempSelectScience = [
                                              ...props.tempSelectScience,
                                            ];
                                            const updatedTempSelectScienceName =
                                              [...props.tempSelectScienceName];
                                            if (
                                              updatedTempSelectScience &&
                                              updatedTempSelectScience.includes(
                                                item._id
                                              )
                                            ) {
                                              updatedTempSelectScience &&
                                                updatedTempSelectScience.splice(
                                                  updatedTempSelectScience.indexOf(
                                                    item._id
                                                  ),
                                                  1
                                                );
                                              updatedTempSelectScienceName &&
                                                updatedTempSelectScienceName.splice(
                                                  updatedTempSelectScienceName.indexOf(
                                                    item
                                                  ),
                                                  1
                                                );
                                            } else {
                                              updatedTempSelectScience.push(
                                                item._id
                                              );
                                              updatedTempSelectScienceName.push(
                                                item
                                              );
                                            }

                                            props.setTempSelectScience(
                                              updatedTempSelectScience
                                            );
                                            props.setTempSelectScienceName(
                                              updatedTempSelectScienceName
                                            );
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </div>
                                  );
                                })}
                            </>
                          ) : (
                            <>
                              {scienceAndEducationDropdown &&
                                scienceAndEducationDropdown.length > 0 &&
                                scienceAndEducationDropdown.map((item) => {
                                  return (
                                    <div
                                      class="custom-form-check"
                                      style={{
                                        paddingLeft: "0px",
                                        marginTop: "0px",
                                      }}
                                    >
                                      <label class="filter-content-box">
                                        {item?.name}
                                        <input type="checkbox" disabled />
                                        <span class="checkmark"></span>
                                      </label>
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
              </div>
              {props.isEdit && (
                <div className="signup-modal-footer d-flex align-items-start justify-content-end">
                  <NextButton
                    classData={
                      props.tempSelectScienceName &&
                      props.tempSelectScienceName.length > 0
                        ? "btn btn-default btn-md"
                        : "btn btn-default btn-md disabled"
                    }
                    label="Save"
                    page={"edit-feed"}
                    loading={props.loading}
                    handleSubmit={(e) => handleUpdateProfile(e)}
                  />
                </div>
              )}
            </div>
            <div className="signup-modal-close-box d-none d-lg-block">
              <div
                className="signup-modal-close ms-auto"
                data-bs-dismiss="modal"
              >
                <img
                  src={close}
                  alt="x close icon"
                  onClick={() => props.onHide()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getScienceAndEducationList: (params, callback) => {
    dispatch(getScienceAndEducationList(params, callback));
  },
  updateYourProfile: (data, callback) => {
    dispatch(updateYourProfile(data, callback));
  },
  getUsersPreferences: (params, callback) =>
    dispatch(getUsersPreferences(params, callback)),
});
const mapStateToProps = (state) => ({
  getUser: getUser(state),
  sideBarApisListings: sideBarApisListings(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ScienceAndEducationEditModal));
