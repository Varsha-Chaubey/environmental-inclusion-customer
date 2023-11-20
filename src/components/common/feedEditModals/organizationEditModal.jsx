import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import close from "../../../include/images/x-close-24x24.svg";
import mobileClose from "../../../include/images/close-24x24.svg";
import searchClose from "../../../include/images/search-close-18x18.svg";
import {
  getOrganizationList,
  getZooList,
  sideBarApisListings,
} from "../../../store/sidebarApis";
import { getUser, updateYourProfile } from "../../../store/users";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AlertError from "../../../common/alerts/alertError";
import AlertSuccess from "../../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
const OrganizationEditModal = (props) => {
  const [orgDropdownData, setOrgDropdownData] = useState(null);
  const [zooDropdownData, setZooDropdownData] = useState(null);
  const [textSearch, setTextSearch] = useState("");
  const [searchZoo, setSearchZoo] = useState("");
  const [selectOrg, setSelectOrg] = useState([]);
  const [selectOrgName, setSelectOrgName] = useState([]);
  const [selectZoo, setSelectZoo] = useState([]);
  const [selectZooName, setSelectZooName] = useState([]);
  useEffect(() => {
    const a =
      props?.zooData && props?.zooData.length > 0
        ? props.zooData.map((item) => item?._id)
        : [];
    setSelectZoo(a);

    const b = props?.zooData ? props?.zooData : [];
    setSelectZooName(b);

    const c =
      props?.orgData && props?.orgData.length > 0
        ? props?.orgData.map((item) => item?._id)
        : [];
    setSelectOrg(c);

    const d = props?.orgData ? props?.orgData : [];
    setSelectOrgName(d);
  }, [props?.zooData, props?.orgData]);

  useEffect(() => {
    props.setLoading(true);
    const params = {
      keyword: textSearch ? textSearch : "",
    };
    props.getOrganizationList(params, (res) => {
      if (res && res.status === 200) {
        setOrgDropdownData(res?.data?.data);
        props.setLoading(false);
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
  }, [textSearch]);

  useEffect(() => {
    props.setLoading(true);
    const params = {
      keyword: searchZoo ? searchZoo : "",
    };
    props.getZooList(params, (res) => {
      if (res && res.status === 200) {
        setZooDropdownData(res?.data?.data);
        props.setLoading(false);
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
  }, [searchZoo]);

  const handleSelectAllOrg = () => {
    const allIds = orgDropdownData && orgDropdownData.map((item) => item?._id);
    setSelectOrg(allIds);
    setSelectOrgName(orgDropdownData);
  };

  const handleAllZoo = () => {
    const allIds = zooDropdownData && zooDropdownData.map((item) => item?._id);
    setSelectZoo(allIds);
    setSelectZooName(zooDropdownData);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    props.setLoading(true);
    const payload = {
      preferredOrganizations: selectOrg ? selectOrg : [],
      preferredZoos: selectZoo ? selectZoo : [],
    };
    props.updateYourProfile(payload, (res) => {
      if (res && res.status === 200) {
        props.setLoading(false);
        props.onHide();
        toast(<AlertSuccess message="Information Saved" />);
      } else {
        props.onHide();
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
  const isMobile = useCheckMobileScreen();

  return (
    <Modal
      className="modal fade signup-modal font-family-poppins"
      id="organisationModal"
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
                    Organizations, Zoos and Wildlife Reserves to Follow
                  </h4>
                  {!isMobile && props.isViewAll && (
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
                  <div class="modal_close-box d-lg-none">
                    <div
                      class={`signup-modal-close ms-auto ${
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
                  Select a group of Organizations, zoos, and Wildlife Reserves
                  that you want to follow. You will receive a notification if
                  anything is posted on these organizations' pages. You can
                  adjust what you see in your feed below.
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
              <div class="signup-modal-body pt-0">
                <div class="nav nav-tabs step-tabs" id="myTab1">
                  <div class="nav-item">
                    <div
                      onClick={() => props.togglerOrg()}
                      class={props.isOrgMenu ? "nav-link active" : "nav-link "}
                      id="tabA-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#tabA-tab-pane"
                      aria-selected="true"
                    >
                      Organizations
                    </div>
                  </div>
                  <div class="nav-item">
                    <div
                      onClick={() => props.togglerZoo()}
                      class={props.isZooMenu ? "nav-link active" : "nav-link"}
                      id="tabB-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#tabB-tab-pane"
                      aria-selected="false"
                    >
                      Zoos & Wildlife Reserves
                    </div>
                  </div>
                </div>
                <div class="tab-content" id="myTabContent">
                  {props.isOrgMenu && (
                    <div class="tab-pane fade show active" id="tabA-tab-pane">
                      <div class="two-column-row d-flex flex-wrap">
                        <div class="tc-left">
                          <div class="signup-modal-title fw-medium">
                            Selected
                          </div>
                          {props.isEdit &&
                            selectOrgName &&
                            selectOrgName.length > 0 && (
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={() => {
                                    const data = [];
                                    setSelectOrg(data);
                                    setSelectOrgName(data);
                                  }}
                                >
                                  Clear All
                                </Link>
                              </div>
                            )}
                          <div
                            class={
                              selectOrgName && selectOrgName.length >= 10
                                ? "check-group-list w-full-list custom-edit-h"
                                : "check-group-list w-full-list"
                            }
                          >
                            {selectOrgName &&
                              selectOrgName?.length > 0 &&
                              selectOrgName.map((item) => (
                                <div class="check-group-item">
                                  <div class="custom-form-check">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="flexChecka__5"
                                      checked
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexChecka__5"
                                    >
                                      {item?.name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div class="tc-right">
                          <div class="signup-modal-title fw-medium">
                            Unselected
                          </div>
                          <div class="modal-serch-box position-relative">
                            <input
                              type="text"
                              class="modal-search"
                              placeholder="Search"
                              value={textSearch}
                              onChange={(e) => setTextSearch(e.target.value)}
                            />
                            <button
                              type="button"
                              className="modal-search-close-icon"
                              onClick={() => setTextSearch("")}
                            >
                              <img src={searchClose} alt="alt close" />
                            </button>
                          </div>
                          {props.isEdit && (
                            <div class="tc-btn-box">
                              <Link
                                class="clear__all__btn"
                                onClick={handleSelectAllOrg}
                              >
                                Select All
                              </Link>
                            </div>
                          )}
                          <div class="tc-search-result-row">
                            <ul class="filter-content-list">
                              {props?.isEdit ? (
                                <>
                                  {orgDropdownData &&
                                    orgDropdownData.length > 0 &&
                                    orgDropdownData.map((item, index) => {
                                      const firstLetter = item.name
                                        .charAt(0)
                                        .toUpperCase();
                                      const showHeader =
                                        index === 0 ||
                                        firstLetter !==
                                          orgDropdownData[index - 1].name
                                            .charAt(0)
                                            .toUpperCase();

                                      return (
                                        <>
                                          {showHeader && (
                                            <div
                                              class="tc-search-result-label"
                                              style={{ marginTop: "25px" }}
                                            >
                                              {firstLetter}
                                            </div>
                                          )}

                                          <div class="tc-search-result">
                                            <div
                                              class="check-group-list w-full-list"
                                              style={{ marginLeft: "0px" }}
                                            >
                                              <div class="check-group-item">
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
                                                        selectOrg &&
                                                        selectOrg.includes(
                                                          item?._id
                                                        )
                                                      }
                                                      onChange={() => {
                                                        const data1 = [
                                                          ...selectOrg,
                                                        ];
                                                        const data2 = [
                                                          ...selectOrgName,
                                                        ];
                                                        if (
                                                          data1.includes(
                                                            item._id
                                                          )
                                                        ) {
                                                          const a =
                                                            data1.filter(
                                                              (val) =>
                                                                val !== item._id
                                                            );
                                                          const b =
                                                            data2.filter(
                                                              (val) =>
                                                                val._id !==
                                                                item._id
                                                            );
                                                          setSelectOrgName(b);
                                                          setSelectOrg(a);
                                                        } else {
                                                          data1.push(item?._id);
                                                          data2.push(item);
                                                          setSelectOrg(data1);
                                                          setSelectOrgName(
                                                            data2
                                                          );
                                                        }
                                                      }}
                                                    />
                                                    <span class="checkmark"></span>
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                </>
                              ) : (
                                <>
                                  {orgDropdownData &&
                                    orgDropdownData.length > 0 &&
                                    orgDropdownData.map((item, index) => {
                                      const firstLetter = item.name
                                        .charAt(0)
                                        .toUpperCase();
                                      const showHeader =
                                        index === 0 ||
                                        firstLetter !==
                                          orgDropdownData[index - 1].name
                                            .charAt(0)
                                            .toUpperCase();

                                      return (
                                        <>
                                          {showHeader && (
                                            <div
                                              class="tc-search-result-label"
                                              style={{ marginTop: "25px" }}
                                            >
                                              {firstLetter}
                                            </div>
                                          )}

                                          <div class="tc-search-result">
                                            <div
                                              class="check-group-list w-full-list"
                                              style={{ marginLeft: "0px" }}
                                            >
                                              <div class="check-group-item">
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
                                                      disabled
                                                    />
                                                    <span class="checkmark"></span>
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {props.isZooMenu && (
                    <div class="tab-pane fade  show active" id="tabB-tab-pane">
                      <div class="two-column-row d-flex flex-wrap">
                        <div class="tc-left">
                          <div class="signup-modal-title fw-medium">
                            Selected
                          </div>
                          {props.isEdit &&
                            selectZooName &&
                            selectZooName.length > 0 && (
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={() => {
                                    const data = [];
                                    setSelectZoo(data);
                                    setSelectZooName(data);
                                  }}
                                >
                                  Clear All
                                </Link>
                              </div>
                            )}
                          <div
                            class={
                              selectZooName && selectZooName.length >= 10
                                ? "check-group-list w-full-list custom-edit-h"
                                : "check-group-list w-full-list"
                            }
                          >
                            {selectZooName &&
                              selectZooName.length > 0 &&
                              selectZooName.map((item) => (
                                <div class="check-group-item">
                                  <div class="custom-form-check">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="tabBflexChecka__1"
                                      checked
                                    />
                                    <label
                                      class="form-check-label"
                                      for="tabBflexChecka__1"
                                    >
                                      {item?.name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div class="tc-right">
                          <div class="signup-modal-title fw-medium">
                            Unselected
                          </div>
                          <div class="modal-serch-box position-relative">
                            <input
                              type="text"
                              class="modal-search"
                              placeholder="Search"
                              value={searchZoo}
                              onChange={(e) => setSearchZoo(e.target.value)}
                            />
                            <button
                              type="button"
                              className="modal-search-close-icon"
                              onClick={() => setSearchZoo("")}
                            >
                              <img src={searchClose} alt="alt close" />
                            </button>
                          </div>
                          {props.isEdit && (
                            <div class="tc-btn-box">
                              <Link
                                class="clear__all__btn"
                                onClick={handleAllZoo}
                              >
                                Select All
                              </Link>
                            </div>
                          )}
                          <div class="tc-search-result-row">
                            <ul class="filter-content-list">
                              {props.isEdit ? (
                                <>
                                  {zooDropdownData &&
                                    zooDropdownData.length > 0 &&
                                    zooDropdownData.map((item, index) => {
                                      const firstLetter = item?.name
                                        .charAt(0)
                                        .toUpperCase();
                                      const showHeader =
                                        index === 0 ||
                                        firstLetter !==
                                          zooDropdownData[index - 1].name
                                            .charAt(0)
                                            .toUpperCase();
                                      return (
                                        <>
                                          {showHeader && (
                                            <div
                                              class="tc-search-result-label"
                                              style={{ marginTop: "25px" }}
                                            >
                                              {firstLetter}
                                            </div>
                                          )}

                                          <div class="tc-search-result">
                                            <div
                                              class="check-group-list w-full-list"
                                              style={{ marginLeft: "0px" }}
                                            >
                                              <div class="check-group-item">
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
                                                        selectZoo &&
                                                        selectZoo.includes(
                                                          item?._id
                                                        )
                                                      }
                                                      onChange={() => {
                                                        const data1 = [
                                                          ...selectZoo,
                                                        ];
                                                        const data2 = [
                                                          selectZooName,
                                                        ];
                                                        if (
                                                          data1.includes(
                                                            item?._id
                                                          )
                                                        ) {
                                                          const a =
                                                            data1.filter(
                                                              (val) =>
                                                                val !==
                                                                item?._id
                                                            );
                                                          const b =
                                                            data2.filter(
                                                              (val) =>
                                                                val?._id !==
                                                                item?._id
                                                            );
                                                          setSelectZoo(a);
                                                          setSelectZooName(b);
                                                        } else {
                                                          data1.push(item?._id);
                                                          data2.push(item);
                                                          setSelectZoo(data1);
                                                          setSelectZooName(
                                                            data2
                                                          );
                                                        }
                                                      }}
                                                    />
                                                    <span class="checkmark"></span>
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                </>
                              ) : (
                                <>
                                  {zooDropdownData &&
                                    zooDropdownData.length > 0 &&
                                    zooDropdownData.map((item, index) => {
                                      const firstLetter = item?.name
                                        .charAt(0)
                                        .toUpperCase();
                                      const showHeader =
                                        index === 0 ||
                                        firstLetter !==
                                          zooDropdownData[index - 1].name
                                            .charAt(0)
                                            .toUpperCase();
                                      return (
                                        <>
                                          {showHeader && (
                                            <div
                                              class="tc-search-result-label"
                                              style={{ marginTop: "25px" }}
                                            >
                                              {firstLetter}
                                            </div>
                                          )}

                                          <div class="tc-search-result">
                                            <div
                                              class="check-group-list w-full-list"
                                              style={{ marginLeft: "0px" }}
                                            >
                                              <div class="check-group-item">
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
                                                      disabled
                                                    />
                                                    <span class="checkmark"></span>
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="signup-modal-footer d-flex align-items-start justify-content-end">
                <div
                  class={
                    (selectOrg && selectOrg.length > 0) ||
                    (selectZoo && selectZoo.length > 0)
                      ? "btn btn-default btn-md"
                      : "btn btn-default btn-md btn-disable"
                  }
                  onClick={(e) => handleUpdateProfile(e)}
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
  getOrganizationList: (params, callback) => {
    dispatch(getOrganizationList(params, callback));
  },
  getZooList: (params, callback) => {
    dispatch(getZooList(params, callback));
  },
  updateYourProfile: (data, callback) => {
    dispatch(updateYourProfile(data, callback));
  },
});
const mapStateToProps = (state) => ({
  getUser: getUser(state),
  sideBarApisListings: sideBarApisListings(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(OrganizationEditModal));
