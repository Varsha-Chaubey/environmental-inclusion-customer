import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import close from "../../../include/images/x-close-24x24.svg";
import Mclose from "../../../include/images/close-24x24.svg";
import searchClose from "../../../include/images/search-close-18x18.svg";
import { connect } from "react-redux";
import { sideBarApisListings, getRegionList } from "../../../store/sidebarApis";
import {
  getUser,
  updateYourProfile,
  getUsersPreferences,
} from "../../../store/users";
import AlertError from "../../../common/alerts/alertError";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AlertSuccess from "../../../common/alerts/alertSuccess";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
import NextButton from "../../../common/form/nextButton";
const RegionEditModal = (props) => {
  var ref = useRef();
  const isMobile = useCheckMobileScreen();
  const [otherRegion, setOtherRegion] = useState(null);
  const [usRegion, setUSRegion] = useState(null);
  const [allRegions, setAllRegions] = useState(null);
  const [textSearched, setTextSearched] = useState("");

  const [selectRegion, setSelectedRegion] = useState([]);
  const [selectRegionName, setSelectedRegionName] = useState([]);

  useEffect(() => {
    const a =
      props?.regionData && props?.regionData?.length > 0
        ? props?.regionData.map((item) => item?._id)
        : [];
    setSelectedRegion(a);
    const b = props?.regionData ? props?.regionData : [];
    setSelectedRegionName(b);
  }, [props?.regionData]);

  useEffect(() => {
    props.setTempSelectRegion([...selectRegion]);
    props.setTempSelectRegionName([...selectRegionName]);
  }, [props.show]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    props.setLoading(true);
    const payload = {
      keyword: textSearched ? textSearched : "",
    };
    props.getRegionList(payload, (res) => {
      if (res && res.status === 200) {
        const usRegions =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.country == "US");
        const otherRegions =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.country != "US");
        setAllRegions(res?.data?.data);
        setUSRegion(usRegions);
        setOtherRegion(otherRegions);
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
      }
    });
  }, [textSearched]);

  const handleSelectAllUs = () => {
    // Checking if any of the US regions are not currently selected
    const isAllSelected =
      props.tempSelectRegion &&
      props.tempSelectRegion?.length === usRegion?.length;
    const isAllValuesSelected =
      props.tempSelectRegion &&
      props.tempSelectRegion?.length === allRegions?.length;

    if (isAllSelected) {
      // If all US regions are selected, deselect them
      props.setTempSelectRegion([]);
      props.setTempSelectRegionName([]);
    } else if (isAllValuesSelected) {
      const nonUsRegionIds = props.tempSelectRegion.filter(
        (regionId) => !usRegion.some((usItem) => usItem._id === regionId)
      );
      const nonUsRegionNames = props.tempSelectRegionName.filter(
        (regionName) => !usRegion.some((usItem) => usItem === regionName)
      );
      props.setTempSelectRegion(nonUsRegionIds);
      props.setTempSelectRegionName(nonUsRegionNames);
    } else {
      // If not all US regions are selected, select all of them
      const allUsIds = usRegion.map((item) => item._id);
      props.setTempSelectRegion([...props.tempSelectRegion, ...allUsIds]);
      props.setTempSelectRegionName([
        ...props.tempSelectRegionName,
        ...usRegion,
      ]);
    }
  };

  const handleSelectAll = () => {
    // Creating an array with all item IDs from allRegions
    const allRegionIds = allRegions.map((item) => item._id);
    props.setTempSelectRegion(allRegionIds);
    props.setTempSelectRegionName(allRegions);
  };

  const handleRegionUpdateProfile = (e) => {
    e.preventDefault();
    props.setLoading(true);
    ref && ref.current && ref.current.continuousStart();
    const payload = {
      preferredRegions: props.tempSelectRegion ? props.tempSelectRegion : [],
    };
    props.updateYourProfile(payload, (res) => {
      if (res && res.status === 200) {
        props.getUsersPreferences("region", (res) => {
          if (res && res.status === 200) {
            props.setRegionData(res?.data?.data);
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
      id="editRegionsModal"
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
                  <h4 className={isMobile ? "mt-5" : ""}>Regions to Follow</h4>
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
                  Select a group of regions that you want to follow. You will
                  receive a notification if anything is posted on these regional
                  pages. You can adjust what you see in your feed below.
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
                <div class="two-column-row d-flex flex-wrap">
                  <div class="tc-left">
                    <div class="signup-modal-title fw-medium">Selected</div>
                    {props.isEdit &&
                    props.tempSelectRegion &&
                    props.tempSelectRegion.length > 0 ? (
                      <div
                        class="tc-btn-box"
                        onClick={() => {
                          const data = [];
                          props.setTempSelectRegion(data);
                          props.setTempSelectRegionName(data);
                        }}
                      >
                        <Link class="clear__all__btn">Clear All</Link>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      class={
                        props.tempSelectRegionName &&
                        props.tempSelectRegionName.length >= 10
                          ? "check-group-list w-full-list custom-edit-h"
                          : "check-group-list w-full-list"
                      }
                    >
                      {props.tempSelectRegionName &&
                        props.tempSelectRegionName?.length > 0 &&
                        props.tempSelectRegionName?.map((item) => {
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
                                  {item?.name}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div class="tc-right">
                    <div class="signup-modal-title fw-medium">Unselected</div>
                    <div class="tc-right-inside">
                      <div class="modal-serch-box position-relative">
                        <input
                          type="text"
                          class="modal-search"
                          placeholder="Search"
                          value={textSearched}
                          onChange={(e) => setTextSearched(e.target.value)}
                        />
                        <button
                          type="button"
                          class="modal-search-close-icon"
                          onClick={(e) => setTextSearched("")}
                        >
                          <img src={searchClose} alt="alt close" />
                        </button>
                      </div>
                      <div class="tc-btn-box">
                        {props.isEdit && (
                          <Link
                            class="clear__all__btn"
                            onClick={handleSelectAll}
                          >
                            Select All
                          </Link>
                        )}
                      </div>
                      {props?.isEdit ? (
                        <div class="tc-search-result-row">
                          <div class="accordion accordion-flush custom-accordion-flush">
                            <div className="accordion-item" id="one-tab-pane">
                              <div class="custom-form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="collapseCheckA__1"
                                  onChange={handleSelectAllUs}
                                  checked={
                                    selectRegion?.length === usRegion?.length ||
                                    selectRegion?.length >= allRegions?.length
                                  }
                                />
                                <label
                                  class="form-check-label"
                                  for="collapseCheckA__1"
                                >
                                  United States
                                </label>
                              </div>

                              <div
                                id="flush-collapse-childOne"
                                class="accordion-collapse collapse show"
                                data-bs-parent="#accordionFlushParent"
                              >
                                <div className="accordion-body">
                                  <ul class="filter-content-list">
                                    {usRegion &&
                                      usRegion.length > 0 &&
                                      usRegion.map((item) => (
                                        <>
                                          <li class="filter-content-item">
                                            <label class="filter-content-box">
                                              {item.name}
                                              <input
                                                type="checkbox"
                                                checked={
                                                  props.tempSelectRegion &&
                                                  props.tempSelectRegion.includes(
                                                    item._id
                                                  )
                                                }
                                                onChange={() => {
                                                  const updatedTempSelectRegion =
                                                    [...props.tempSelectRegion];
                                                  const updatedTempSelectRegionName =
                                                    [
                                                      ...props.tempSelectRegionName,
                                                    ];
                                                  if (
                                                    updatedTempSelectRegion &&
                                                    updatedTempSelectRegion.includes(
                                                      item._id
                                                    )
                                                  ) {
                                                    updatedTempSelectRegion &&
                                                      updatedTempSelectRegion.splice(
                                                        updatedTempSelectRegion.indexOf(
                                                          item._id
                                                        ),
                                                        1
                                                      );
                                                    updatedTempSelectRegionName &&
                                                      updatedTempSelectRegionName.splice(
                                                        updatedTempSelectRegionName.indexOf(
                                                          item
                                                        ),
                                                        1
                                                      );
                                                  } else {
                                                    updatedTempSelectRegion.push(
                                                      item._id
                                                    );
                                                    updatedTempSelectRegionName.push(
                                                      item
                                                    );
                                                  }

                                                  props.setTempSelectRegion(
                                                    updatedTempSelectRegion
                                                  );
                                                  props.setTempSelectRegionName(
                                                    updatedTempSelectRegionName
                                                  );
                                                }}
                                              />
                                              <span class="checkmark"></span>
                                            </label>
                                          </li>
                                        </>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div
                              class="tc-search-result-row hide-scrollbar"
                              style={{ marginTop: "0px" }}
                            >
                              <ul class="filter-content-list">
                                {otherRegion &&
                                  otherRegion?.length > 0 &&
                                  otherRegion.map((item) => {
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
                                              props.tempSelectRegion &&
                                              props.tempSelectRegion.includes(
                                                item._id
                                              )
                                            }
                                            onChange={() => {
                                              const updatedTempSelectRegion = [
                                                ...props.tempSelectRegion,
                                              ];
                                              const updatedTempSelectRegionName =
                                                [...props.tempSelectRegionName];
                                              if (
                                                updatedTempSelectRegion &&
                                                updatedTempSelectRegion.includes(
                                                  item._id
                                                )
                                              ) {
                                                updatedTempSelectRegion &&
                                                  updatedTempSelectRegion.splice(
                                                    updatedTempSelectRegion.indexOf(
                                                      item._id
                                                    ),
                                                    1
                                                  );
                                                updatedTempSelectRegionName &&
                                                  updatedTempSelectRegionName.splice(
                                                    updatedTempSelectRegionName.indexOf(
                                                      item
                                                    ),
                                                    1
                                                  );
                                              } else {
                                                updatedTempSelectRegion.push(
                                                  item._id
                                                );
                                                updatedTempSelectRegionName.push(
                                                  item
                                                );
                                              }

                                              props.setTempSelectRegion(
                                                updatedTempSelectRegion
                                              );
                                              props.setTempSelectRegionName(
                                                updatedTempSelectRegionName
                                              );
                                            }}
                                          />
                                          <span class="checkmark"></span>
                                        </label>
                                      </div>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div class="tc-search-result-row">
                          <div class="accordion accordion-flush custom-accordion-flush">
                            <div className="accordion-item" id="one-tab-pane">
                              <div class="custom-form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="collapseCheckA__1"
                                  disabled
                                />
                                <label
                                  class="form-check-label"
                                  for="collapseCheckA__1"
                                >
                                  United States
                                </label>
                              </div>

                              <div
                                id="flush-collapse-childOne"
                                class="accordion-collapse collapse show"
                                data-bs-parent="#accordionFlushParent"
                              >
                                <div className="accordion-body">
                                  <ul class="filter-content-list">
                                    {usRegion &&
                                      usRegion.length > 0 &&
                                      usRegion.map((item) => (
                                        <>
                                          <li class="filter-content-item">
                                            <label class="filter-content-box">
                                              {item.name}
                                              <input type="checkbox" disabled />
                                              <span class="checkmark"></span>
                                            </label>
                                          </li>
                                        </>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div
                              class="tc-search-result-row hide-scrollbar"
                              style={{ marginTop: "0px" }}
                            >
                              <ul class="filter-content-list">
                                {otherRegion &&
                                  otherRegion?.length > 0 &&
                                  otherRegion.map((item) => {
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
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {props?.isEdit && (
                <div class="signup-modal-footer d-flex align-items-start justify-content-end">
                  <NextButton
                    classData={
                      props.tempSelectRegionName &&
                      props.tempSelectRegionName.length > 0
                        ? "btn btn-default btn-md"
                        : "btn btn-default btn-md disabled"
                    }
                    label="Save"
                    page={"edit-feed"}
                    loading={props.loading}
                    handleSubmit={(e) => handleRegionUpdateProfile(e)}
                  />
                </div>
              )}
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
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
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
)(React.memo(RegionEditModal));
