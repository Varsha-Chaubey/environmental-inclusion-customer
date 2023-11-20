import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import close from "../../include/images/search-close-18x18.svg";
import { sideBarApisListings, getRegionList } from "../../store/sidebarApis";
import Header from "./header";
import NextButton from "../../common/form/nextButton";

const ProfileUpdateOne = (props) => {
  const [loading, setLoading] = useState(false);
  const [otherRegion, setOtherRegion] = useState(null);
  const [usRegion, setUSRegion] = useState(null);
  const [allRegions, setAllRegions] = useState(null);
  const [textSearched, setTextSearched] = useState("");
  // for select checkbox
  const [selectRegion, setSelectedRegion] = useState(
    props?.steps?.data?.RegionData
      ? props?.steps?.data?.RegionData &&
          props?.steps?.data?.RegionData.map((item) => item._id)
      : []
  );
  const [selectRegionName, setSelectedRegionName] = useState(
    props?.steps?.data?.RegionData ? props?.steps?.data?.RegionData : []
  );

  useEffect(() => {
    setLoading(true);
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

  // for select All

  const handleSelectAllUs = () => {
    // Checking if any of the US regions are not currently selected
    const isAllSelected = selectRegion?.length === usRegion?.length;
    const isAllValuesSelected = selectRegion?.length === allRegions?.length;

    if (isAllSelected) {
      // If all US regions are selected, deselect them
      setSelectedRegion([]);
      setSelectedRegionName([]);
    } else if (isAllValuesSelected) {
      const nonUsRegionIds = selectRegion.filter(
        (regionId) => !usRegion.some((usItem) => usItem._id === regionId)
      );
      const nonUsRegionNames = selectRegionName.filter(
        (regionName) => !usRegion.some((usItem) => usItem === regionName)
      );
      setSelectedRegion(nonUsRegionIds);
      setSelectedRegionName(nonUsRegionNames);
    } else {
      // If not all US regions are selected, select all of them
      const allUsIds = usRegion.map((item) => item._id);
      setSelectedRegion([...selectRegion, ...allUsIds]);
      setSelectedRegionName([...selectRegionName, ...usRegion]);
    }
  };

  const handleSelectAll = () => {
    // Creating an array with all item IDs from allRegions
    const allRegionIds = allRegions.map((item) => item._id);
    setSelectedRegion(allRegionIds);
    setSelectedRegionName(allRegions);
  };

  const handleNextClick = () => {
    props.setSteps({
      step: 4,
      data: {
        ...props.steps.data,
        RegionData: selectRegionName ? selectRegionName : [],
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
                  <h1>Regions</h1>
                </div>
                <form class="cols-row-group">
                  <div class="two-column-row d-flex flex-wrap">
                    <div class="tc-left">
                      <div class="signup-modal-title fw-medium">Selected</div>
                      {selectRegion && selectRegion.length > 0 && (
                        <>
                          <div class="tc-btn-box">
                            <Link
                              class="clear__all__btn"
                              onClick={() => {
                                const data = [];
                                setSelectedRegionName(data);
                                setSelectedRegion(data);
                              }}
                            >
                              Clear All
                            </Link>
                          </div>
                        </>
                      )}

                      <div
                        class={
                          selectRegionName && selectRegionName.length <= 10
                            ? "check-group-list w-full-list "
                            : "check-group-list w-full-list custom-h"
                        }
                      >
                        {selectRegionName &&
                          selectRegionName?.length > 0 &&
                          selectRegionName?.map((item) => {
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
                            <img src={close} alt="alt close" />
                          </button>
                        </div>
                        <div class="tc-btn-box">
                          <Link
                            class="clear__all__btn"
                            onClick={handleSelectAll}
                          >
                            Select All
                          </Link>
                        </div>
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
                                                  selectRegion &&
                                                  selectRegion.includes(
                                                    item._id
                                                  )
                                                }
                                                onChange={() => {
                                                  const data = [
                                                    ...selectRegion,
                                                  ];
                                                  const data1 = [
                                                    ...selectRegionName,
                                                  ];
                                                  if (data.includes(item._id)) {
                                                    const a = data.filter(
                                                      (item1) =>
                                                        item1 != item._id
                                                    );
                                                    const b = data1.filter(
                                                      (item1) =>
                                                        item1._id != item._id
                                                    );
                                                    setSelectedRegionName(b);
                                                    setSelectedRegion(a);
                                                  } else {
                                                    data.push(item._id);
                                                    data1.push(item);
                                                    setSelectedRegionName(
                                                      data1
                                                    );
                                                    setSelectedRegion(data);
                                                  }
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
                                              selectRegion &&
                                              selectRegion.includes(item._id)
                                            }
                                            onChange={() => {
                                              const data = [...selectRegion];
                                              const data1 = [
                                                ...selectRegionName,
                                              ];
                                              if (data.includes(item._id)) {
                                                const a = data.filter(
                                                  (item1) => item1 !== item._id
                                                );
                                                const b = data1.filter(
                                                  (item1) =>
                                                    item1._id !== item._id
                                                );
                                                setSelectedRegionName(b);
                                                setSelectedRegion(a);
                                              } else {
                                                data.push(item._id);
                                                data1.push(item);
                                                setSelectedRegionName(data1);
                                                setSelectedRegion(data);
                                              }
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
                      </div>
                    </div>
                  </div>
                  <div class="rf-form-btn d-flex align-items-center justify-content-end">
                    <NextButton
                      handleSubmit={handleNextClick}
                      classData={
                        selectRegionName && selectRegionName.length > 0
                          ? "btn btn-default btn-lg"
                          : "btn btn-default btn-lg disabled"
                      }
                      label="Next"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
});

const mapStateToProps = (state) => ({
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProfileUpdateOne));
