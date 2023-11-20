import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import close from "../../include/images/search-close-18x18.svg";
import {
  sideBarApisListings,
  getSpeciesList,
  getSpeciesCategoryList,
} from "../../store/sidebarApis";
import Header from "./header";
import NextButton from "../../common/form/nextButton";

const ProfileUpdateThree = (props) => {
  const [loading, setLoading] = useState(false);
  const [speciesDropdownData, setSpeciesDropdownData] = useState(null);
  const [speciesCategoryDropdownData, setSpeciesCategoryDropdownData] =
    useState(null);
  const [textSearch, setTextSearched] = useState();
  // for select checkbox
  const [selectSpecies, setSelectedSpecies] = useState(
    props?.steps?.data?.SpeciesData
      ? props?.steps?.data?.SpeciesData &&
          props?.steps?.data?.SpeciesData.map((item) => item._id)
      : []
  );
  const [selectSpeciesName, setSelectedSpeciesName] = useState(
    props?.steps?.data?.SpeciesData
      ? props?.steps?.data?.SpeciesData &&
          props?.steps?.data?.SpeciesData.map((item) => item)
      : []
  );
  const [selectSpeciesCategory, setSelectedCategory] = useState(
    props?.Steps?.data?.SpeciesCategoryData
      ? props?.steps?.data?.SpeciesCategoryData &&
          props?.steps?.data?.SpeciesCategoryData.map((item) => item._id)
      : []
  );

  useEffect(() => {
    setLoading(true);
    const categories = selectSpeciesCategory.map((item) => item).join(",");
    const payload = {
      keyword: textSearch ? textSearch : "",
    };
    if (categories) {
      payload.categories = categories;
    }
    props.getSpeciesList(payload, (res) => {
      if (res && res.status === 200) {
        setSpeciesDropdownData(res?.data?.data);
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
  }, [textSearch, selectSpeciesCategory]);

  useEffect(() => {
    setLoading(true);
    props.getSpeciesCategoryList({}, (res) => {
      if (res && res.status === 200) {
        setSpeciesCategoryDropdownData(res?.data?.data);
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
  }, []);

  const hanldeSelectAll = () => {
    const allSpeciesIds = speciesDropdownData.map((item) => item._id);
    setSelectedSpecies(allSpeciesIds);
    setSelectedSpeciesName(speciesDropdownData);
  };

  const handleNext = () => {
    props.setSteps({
      step: 6,
      data: {
        ...props.steps.data,
        SpeciesData: selectSpeciesName ? selectSpeciesName : [],
        SpeciesCategoryData: selectSpeciesCategory ? selectSpeciesCategory : [],
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
                  <h1>Species and Categories</h1>
                </div>
                <div class="grey-content-box">
                  <div class="signup-modal-title fw-medium">
                    Narrow List to Major Species Categories
                  </div>
                  <div class="check-group-list d-flex flex-wrap">
                    {speciesCategoryDropdownData &&
                      speciesCategoryDropdownData.length > 0 &&
                      speciesCategoryDropdownData.map((item) => {
                        return (
                          <div class="check-group-item">
                            <div class="custom-form-check">
                              <label class="filter-content-box">
                                {item?.name}
                                <input
                                  type="checkbox"
                                  checked={
                                    selectSpeciesCategory &&
                                    selectSpeciesCategory.includes(item._id)
                                  }
                                  onChange={() => {
                                    const data = [...selectSpeciesCategory];

                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 !== item._id
                                      );

                                      setSelectedCategory(a);
                                    } else {
                                      data.push(item._id);

                                      setSelectedCategory(data);
                                    }
                                  }}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <form class="rf-form-row-group">
                  <div class="two-column-row d-flex flex-wrap">
                    <div class="tc-left">
                      <div class="signup-modal-title fw-medium">Selected</div>
                      {selectSpecies && selectSpecies.length > 0 && (
                        <>
                          <div class="tc-btn-box">
                            <Link
                              class="clear__all__btn"
                              onClick={() => {
                                const data = [];
                                setSelectedSpeciesName(data);
                                setSelectedSpecies(data);
                              }}
                            >
                              Clear All
                            </Link>
                          </div>
                        </>
                      )}

                      <div
                        class={
                          selectSpeciesName && selectSpeciesName.length <= 10
                            ? "check-group-list w-full-list "
                            : "check-group-list w-full-list custom-h"
                        }
                      >
                        {selectSpeciesName &&
                          selectSpeciesName.length > 0 &&
                          selectSpeciesName.map((item) => {
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
                      <div class="tc-right-inside">
                        <div class="signup-modal-title fw-medium">
                          Species Under Selected Categories
                        </div>
                        <div class="modal-serch-box position-relative">
                          <input
                            type="text"
                            class="modal-search"
                            placeholder="Search"
                            value={textSearch}
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
                            onClick={hanldeSelectAll}
                          >
                            Select All
                          </Link>
                        </div>
                        <div class="tc-search-result-row hide-scrollbar">
                          <ul class="filter-content-list">
                            {speciesDropdownData &&
                              speciesDropdownData?.length > 0 &&
                              speciesDropdownData.map((item, index) => {
                                const firstLetter = item.name
                                  .charAt(0)
                                  .toUpperCase();
                                const showHeader =
                                  index === 0 ||
                                  firstLetter !==
                                    speciesDropdownData[index - 1].name
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
                                        <div
                                          class="custom-form-check"
                                          style={{
                                            paddingLeft: "0px",
                                            marginTop: "0px",
                                          }}
                                        >
                                          <label class="filter-content-box">
                                            <div class="cfc-label-title">
                                              {item?.name}
                                            </div>
                                            <input
                                              type="checkbox"
                                              checked={
                                                selectSpecies &&
                                                selectSpecies.includes(item._id)
                                              }
                                              onChange={() => {
                                                const data = [...selectSpecies];
                                                const data1 = [
                                                  ...selectSpeciesName,
                                                ];
                                                if (data.includes(item._id)) {
                                                  const a = data.filter(
                                                    (item1) =>
                                                      item1 !== item._id
                                                  );
                                                  const b = data1.filter(
                                                    (item1) =>
                                                      item1._id !== item._id
                                                  );
                                                  setSelectedSpeciesName(b);
                                                  setSelectedSpecies(a);
                                                } else {
                                                  data.push(item._id);
                                                  data1.push(item);
                                                  setSelectedSpeciesName(data1);
                                                  setSelectedSpecies(data);
                                                }
                                              }}
                                            />
                                            <span class="checkmark"></span>
                                            <div class="cfc-label-para caps-text">
                                              {item?.scientificName}
                                            </div>
                                          </label>
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
                        selectSpecies && selectSpecies.length > 0
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
  getSpeciesCategoryList: (params, callback) =>
    dispatch(getSpeciesCategoryList(params, callback)),
  getSpeciesList: (params, callback) =>
    dispatch(getSpeciesList(params, callback)),
});

const mapStateToProps = (state) => ({
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProfileUpdateThree));
