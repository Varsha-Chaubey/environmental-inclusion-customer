import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import close from "../../include/images/search-close-18x18.svg";
import {
  sideBarApisListings,
  getZooList,
  getOrganizationList,
} from "../../store/sidebarApis";
import Header from "./header";
import NextButton from "../../common/form/nextButton";

const ProfileUpdatefive = (props) => {
  const [loading, setLoading] = useState(false);
  const [zooDropdownData, setZooDropdownData] = useState(null);
  const [organizationDropdownData, setOrganizationDropdownData] =
    useState(null);
  const [searchOrg, setSearchOrg] = useState();
  const [searchZoo, setSearchZoo] = useState();

  // select state
  const [selectOrg, setSelectOrg] = useState(
    props?.steps?.data?.OrgData
      ? props?.steps?.data?.OrgData &&
          props?.steps?.data?.OrgData.map((item) => item._id)
      : []
  );
  const [selectOrgName, setSelectOrgName] = useState(
    props?.steps?.data?.OrgData
      ? props?.steps?.data?.OrgData &&
          props?.steps?.data?.OrgData.map((item) => item)
      : []
  );
  const [selectZoo, setSelectZoo] = useState(
    props?.steps?.data?.ZooData
      ? props?.steps?.data?.ZooData &&
          props?.steps?.data?.ZooData.map((item) => item._id)
      : []
  );
  const [selectZooName, setSelectZooName] = useState(
    props?.steps?.data?.ZooData
      ? props?.steps?.data?.ZooData &&
          props?.steps?.data?.ZooData.map((item) => item)
      : []
  );

  useEffect(() => {
    setLoading(true);
    const payload = {
      keyword: searchZoo ? searchZoo : "",
    };
    props.getZooList(payload, (res) => {
      if (res && res.status === 200) {
        setZooDropdownData(res?.data?.data);
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
  }, [searchZoo]);

  useEffect(() => {
    setLoading(true);
    const payload = {
      keyword: searchOrg ? searchOrg : "",
    };
    props.getOrganizationList(payload, (res) => {
      if (res && res.status === 200) {
        setOrganizationDropdownData(res?.data?.data);
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
  }, [searchOrg]);

  // for tabs switch

  const [isOrg, setIsOrg] = useState(true);
  const [isZoo, setIsZoo] = useState(false);

  const orgToggler = () => {
    setIsOrg(!isOrg);
    if (isZoo) {
      setIsZoo(!isZoo);
    }
  };

  const zooToggler = () => {
    setIsZoo(!isZoo);
    if (isOrg) {
      setIsOrg(!isOrg);
    }
  };

  // for select all

  const selectAllOrg = () => {
    const allOrgIds = organizationDropdownData.map((item) => item._id);
    setSelectOrg(allOrgIds);
    setSelectOrgName(organizationDropdownData);
  };

  const selectAllZoo = () => {
    const allZooIds = zooDropdownData.map((item) => item._id);
    setSelectZoo(allZooIds);
    setSelectZooName(zooDropdownData);
  };

  const handleNext = () => {
    props.setSteps({
      step: 8,
      data: {
        ...props.steps.data,
        ZooData: selectZooName ? selectZooName : [],
      },
    });
  };

  const handleNextOrg = () => {
    props.setSteps({
      step: 8,
      data: {
        ...props.steps.data,
        OrgData: selectOrgName ? selectOrgName : [],
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
                  <h1>Organizations, Zoos and Wildlife Reserves</h1>
                  <div class="nav nav-tabs step-tabs" id="myTab" role="tablist">
                    <div class="nav-item" role="presentation">
                      <div
                        onClick={orgToggler}
                        class={isOrg ? "nav-link active" : "nav-link"}
                        id="tabA"
                        data-bs-toggle="tab"
                        data-bs-target="#tabA-pane"
                        aria-selected="true"
                      >
                        Organizations
                      </div>
                    </div>
                    <div class="nav-item" role="presentation">
                      <div
                        onClick={zooToggler}
                        class={isZoo ? "nav-link active" : "nav-link"}
                        id="tabB"
                        data-bs-toggle="tab"
                        data-bs-target="#tabB-pane"
                        aria-selected="false"
                      >
                        Zoos and Wildlife Reserves
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-content" id="myTabContent">
                  {isOrg && (
                    <div class="tab-pane fade show active" id="tabA-pane">
                      <form class="rf-form-row-group">
                        <div class="two-column-row d-flex flex-wrap">
                          <div class="tc-left">
                            <div class="signup-modal-title fw-medium">
                              Selected
                            </div>
                            {selectOrg && selectOrg.length > 0 && (
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
                                selectOrgName && selectOrgName.length <= 10
                                  ? "check-group-list w-full-list "
                                  : "check-group-list w-full-list custom-h"
                              }
                            >
                              {selectOrgName &&
                                selectOrgName.length > 0 &&
                                selectOrgName.map((item) => {
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
                            <div class="signup-modal-title fw-medium">
                              Unselected
                            </div>

                            <div class="tc-right-inside hide-scrollbar">
                              <div class="modal-serch-box position-relative">
                                <input
                                  type="text"
                                  class="modal-search"
                                  placeholder="Search"
                                  value={searchOrg}
                                  onChange={(e) => setSearchOrg(e.target.value)}
                                />
                                <button
                                  type="button"
                                  class="modal-search-close-icon"
                                  onClick={() => setSearchOrg("")}
                                >
                                  <img src={close} alt="alt close" />
                                </button>
                              </div>
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={selectAllOrg}
                                >
                                  Select All
                                </Link>
                              </div>
                              <div class="tc-search-result-row hide-scrollbar">
                                <ul class="filter-content-list">
                                  {organizationDropdownData &&
                                    organizationDropdownData.length > 0 &&
                                    organizationDropdownData.map(
                                      (item, index) => {
                                        const firstLetter = item.name
                                          .charAt(0)
                                          .toUpperCase();
                                        const showHeader =
                                          index === 0 ||
                                          firstLetter !==
                                            organizationDropdownData[
                                              index - 1
                                            ].name
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
                                                                  val !==
                                                                  item._id
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
                                                            data1.push(
                                                              item?._id
                                                            );
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
                                      }
                                    )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="rf-form-btn d-flex align-items-center justify-content-end">
                          <NextButton
                            handleSubmit={handleNextOrg}
                            classData={
                              selectOrgName && selectOrgName.length > 0
                                ? "btn btn-default btn-lg"
                                : "btn btn-default btn-lg disabled"
                            }
                            label="Next"
                          />
                        </div>
                      </form>
                    </div>
                  )}

                  {isZoo && (
                    <div
                      class={
                        isZoo ? "tab-pane fade show active" : "tab-pane fade "
                      }
                      id="tabB-pane"
                    >
                      <form class="rf-form-row-group">
                        <div class="two-column-row d-flex flex-wrap">
                          <div class="tc-left">
                            <div class="signup-modal-title fw-medium">
                              Selected
                            </div>
                            {selectZooName && selectZooName.length > 0 && (
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
                                selectZooName && selectZooName.length <= 10
                                  ? "check-group-list w-full-list "
                                  : "check-group-list w-full-list custom-h"
                              }
                            >
                              {selectZooName &&
                                selectZooName.length > 0 &&
                                selectZooName.map((item) => {
                                  return (
                                    <div class="check-group-item">
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
                                          {item?.name}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div class="tc-right">
                            <div class="signup-modal-title fw-medium">
                              Unselected
                            </div>

                            <div class="tc-right-inside hide-scrollbar">
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
                                  class="modal-search-close-icon"
                                  onClick={() => setSearchZoo("")}
                                >
                                  <img src={close} alt="alt close" />
                                </button>
                              </div>
                              <div class="tc-btn-box">
                                <Link
                                  class="clear__all__btn"
                                  onClick={selectAllZoo}
                                >
                                  Select All
                                </Link>
                              </div>
                              <div class="tc-search-result-row hide-scrollbar">
                                <ul class="filter-content-list">
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
                                                          ...selectZooName,
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
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="rf-form-btn d-flex align-items-center justify-content-end">
                          <NextButton
                            handleSubmit={handleNext}
                            classData={
                              selectZooName && selectZooName.length > 0
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
  getZooList: (params, callback) => dispatch(getZooList(params, callback)),
  getOrganizationList: (params, callback) =>
    dispatch(getOrganizationList(params, callback)),
});

const mapStateToProps = (state) => ({
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProfileUpdatefive));
