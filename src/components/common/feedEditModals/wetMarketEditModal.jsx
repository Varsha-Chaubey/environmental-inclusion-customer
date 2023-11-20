import React from "react";
import { Modal } from "react-bootstrap";
import close from "../../../include/images/x-close-24x24.svg";
import searchIcon from "../../../include/images/search-close-18x18.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  getUser,
  updateYourProfile,
  getUsersPreferences,
} from "../../../store/users";
import {
  getWetMarketList,
  sideBarApisListings,
} from "../../../store/sidebarApis";
import { connect } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import AlertError from "../../../common/alerts/alertError";
import { toast } from "react-toastify";
import AlertSuccess from "../../../common/alerts/alertSuccess";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
import mobileClose from "../../../include/images/close-24x24.svg";
import NextButton from "../../../common/form/nextButton";
import { useRef } from "react";

const WetMarketEditModal = (props) => {
  var ref = useRef();
  const isMobile = useCheckMobileScreen();
  const [wetMarketDropdown, setWetMarketDropdownData] = useState(null);
  const [textSearched, setTextSearch] = useState("");
  const [selectWetMarket, setSelectWetMarket] = useState([]);
  const [selectWetMarketName, setSelectWetMarketName] = useState([]);

  useEffect(() => {
    const a =
      props?.wetMarketData && props?.wetMarketData.length > 0
        ? props?.wetMarketData.map((item) => item?._id)
        : [];
    setSelectWetMarket(a);

    const b = props?.wetMarketData ? props.wetMarketData : [];
    setSelectWetMarketName(b);
  }, [props?.wetMarketData]);

  useEffect(() => {
    props.setTempSelectWetMarket([...selectWetMarket]);
    props.setTempSelectWetMarketName([...selectWetMarketName]);
  }, [props.show]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    props.setLoading(false);
    const params = {
      keyword: textSearched ? textSearched : "",
    };
    props.getWetMarketList(params, (res) => {
      if (res && res.status === 200) {
        setWetMarketDropdownData(res?.data?.data);
        ref && ref.current && ref.current.complete();
        props.setLoading(false);
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
        props.setLoading(false);
      }
    });
  }, [textSearched]);

  const handleSelectAll = () => {
    const allIds =
      wetMarketDropdown && wetMarketDropdown.map((item) => item._id);
    props.setTempSelectWetMarket(allIds);
    props.setTempSelectWetMarketName(wetMarketDropdown);
  };

  const handleWetMarketProfile = (e) => {
    e.preventDefault();
    ref && ref.current && ref.current.continuousStart();
    props.setLoading(true);
    const payload = {
      preferredWetMarkets: props.tempSelectWetMarket
        ? props.tempSelectWetMarket
        : [],
    };
    props.updateYourProfile(payload, (res) => {
      if (res && res.status === 200) {
        props.getUsersPreferences("wetMarket", (res) => {
          if (res && res.status === 200) {
            props.setWetMarketData(res?.data?.data);
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
      id="warModal"
      show={props.show}
      onHide={() => props.onHide()}
      style={{ marginTop: "4%" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="signup-modal-parent d-flex flex-wrap">
            <div className="signup-modal-box">
              <div className="signup-modal-header">
                <div className="smh-insider position-relative d-flex justify-content-between">
                  <h4 className={isMobile ? "mt-5" : ""}>
                    War on the environment
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
                      <img src={mobileClose} alt="x close icon" />
                    </div>
                  </div>
                </div>
                <p>
                  Select a group of War on the environment that you want to
                  follow. You will receive a notification if anything is posted
                  on these War on the environment pages. You can adjust what you
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
                    {props?.isEdit &&
                      props.tempSelectWetMarketName &&
                      props.tempSelectWetMarketName.length > 0 && (
                        <div
                          className="tc-btn-box"
                          onClick={() => {
                            const data = [];
                            props.setTempSelectWetMarket(data);
                            props.setTempSelectWetMarketName(data);
                          }}
                        >
                          <Link className="clear__all__btn">Clear All</Link>
                        </div>
                      )}
                    <div
                      className={
                         props.tempSelectWetMarketName &&  props.tempSelectWetMarketName.length >= 10
                          ? "check-group-list w-full-list custom-edit-h"
                          : "check-group-list w-full-list"
                      }
                    >
                      { props.tempSelectWetMarketName &&
                         props.tempSelectWetMarketName.length > 0 &&
                         props.tempSelectWetMarketName.map((item) => {
                          return (
                            <div className="check-group-item">
                              <div className="custom-form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="wflexCheckA__1"
                                  checked
                                />
                                <label
                                  className="form-check-label"
                                  for="wflexCheckA__1"
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
                          value={textSearched}
                          onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <button
                          type="button"
                          className="modal-search-close-icon"
                          onClick={() => setTextSearch("")}
                        >
                          <img src={searchIcon} alt="alt close" />
                        </button>
                      </div>
                      {props.isEdit && (
                        <div className="tc-btn-box">
                          <Link
                            className="clear__all__btn"
                            onClick={handleSelectAll}
                          >
                            Select All
                          </Link>
                        </div>
                      )}
                      <div className="tc-search-result-row hide-scrollbar">
                        <ul class="filter-content-list">
                          {props?.isEdit ? (
                            <>
                              {wetMarketDropdown &&
                                wetMarketDropdown?.length > 0 &&
                                wetMarketDropdown.map((item) => {
                                  return (
                                    <div
                                      class="custom-form-check"
                                      style={{
                                        paddingLeft: "0px",
                                        marginTop: "0px",
                                      }}
                                    >
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          type="checkbox"
                                          checked={
                                            props.tempSelectWetMarket &&
                                            props.tempSelectWetMarket.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const updatedTempSelectWetMarket = [
                                              ...props.tempSelectWetMarket,
                                            ];
                                            const updatedTempSelectWetMarketName =
                                              [...props.tempSelectWetMarketName];
                                            if (
                                              updatedTempSelectWetMarket &&
                                              updatedTempSelectWetMarket.includes(
                                                item._id
                                              )
                                            ) {
                                              updatedTempSelectWetMarket &&
                                                updatedTempSelectWetMarket.splice(
                                                  updatedTempSelectWetMarket.indexOf(
                                                    item._id
                                                  ),
                                                  1
                                                );
                                              updatedTempSelectWetMarketName &&
                                                updatedTempSelectWetMarketName.splice(
                                                  updatedTempSelectWetMarketName.indexOf(
                                                    item
                                                  ),
                                                  1
                                                );
                                            } else {
                                              updatedTempSelectWetMarket.push(
                                                item._id
                                              );
                                              updatedTempSelectWetMarketName.push(
                                                item
                                              );
                                            }

                                            props.setTempSelectWetMarket(
                                              updatedTempSelectWetMarket
                                            );
                                            props.setTempSelectWetMarketName(
                                              updatedTempSelectWetMarketName
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
                              {wetMarketDropdown &&
                                wetMarketDropdown?.length > 0 &&
                                wetMarketDropdown.map((item) => {
                                  return (
                                    <div
                                      class="custom-form-check"
                                      style={{
                                        paddingLeft: "0px",
                                        marginTop: "0px",
                                      }}
                                    >
                                      <label class="filter-content-box">
                                        {item.name}
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
              {props?.isEdit && (
                <div className="signup-modal-footer d-flex align-items-start justify-content-end">
                  {/* <div
                    className={
                      selectWetMarket && selectWetMarket.length > 0
                        ? "btn btn-default btn-md"
                        : "btn btn-default btn-md btn-disable"
                    }
                    onClick={(e) => handleWetMarketProfile(e)}
                  >
                    Save
                  </div> */}
                  <NextButton
                    classData={
                      props.tempSelectWetMarketName &&
                      props.tempSelectWetMarketName.length > 0
                        ? "btn btn-default btn-md"
                        : "btn btn-default btn-md disabled"
                    }
                    label="Save"
                    page={"edit-feed"}
                    loading={props.loading}
                    handleSubmit={(e) => handleWetMarketProfile(e)}
                  />
                </div>
              )}
            </div>
            <div className="signup-modal-close-box d-none d-lg-block">
              <div
                className="signup-modal-close ms-auto"
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
  getWetMarketList: (params, callback) =>
    dispatch(getWetMarketList(params, callback)),
  updateYourProfile: (data, callback) => {
    dispatch(updateYourProfile(data, callback));
  },
  getUsersPreferences: (params, callback) =>
    dispatch(getUsersPreferences(params, callback)),
});

const mapStateToProps = (state) => ({
  sideBarApisListings: sideBarApisListings(state),
  getUser: getUser(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(WetMarketEditModal));
