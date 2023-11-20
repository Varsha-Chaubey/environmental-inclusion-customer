import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AlertError from "../../common/alerts/alertError";
import { getUser, updateYourProfile } from "../../store/users";
import { toast } from "react-toastify";
import close from "../../include/images/search-close-18x18.svg";
import {
  sideBarApisListings,
  getScienceAndEducationList,
} from "../../store/sidebarApis";
import Header from "./header";
import NextButton from "../../common/form/nextButton";

const ProfileUpdateSix = (props) => {
  const [loading, setLoading] = useState(false);
  const [scienceAndEducationDropdownData, setScienceAndEducationDropdownData] =
    useState(null);
  const [searchText, setSearchText] = useState();
  const [selectScienceAndEducation, setSelectScienceAndEducation] = useState(
    props?.steps?.data?.ScienceAndEducationData
      ? props?.steps?.data?.ScienceAndEducationData &&
          props?.steps?.data?.ScienceAndEducationData.map((item) => item._id)
      : []
  );
  const [selectScienceAndEducationName, setSelectScienceAndEducationName] =
    useState(
      props?.steps?.data?.ScienceAndEducationData
        ? props?.steps?.data?.ScienceAndEducationData &&
            props?.steps?.data?.ScienceAndEducationData.map((item) => item)
        : []
    );

  useEffect(() => {
    setLoading(true);
    const payload = {
      keyword: searchText ? searchText : "",
    };
    props.getScienceAndEducationList(payload, (res) => {
      if (res && res.status === 200) {
        setScienceAndEducationDropdownData(res?.data?.data);
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
  }, [searchText]);

  // for select all
  const selectAllScienceAndEducation = () => {
    const allScienceIds = scienceAndEducationDropdownData.map(
      (item) => item?._id
    );
    setSelectScienceAndEducation(allScienceIds);
    setSelectScienceAndEducationName(scienceAndEducationDropdownData);
  };

  const handleNext = () => {
    props.setSteps({
      step: 9,
      data: {
        ...props.steps.data,
        ScienceAndEducationData: selectScienceAndEducationName
          ? selectScienceAndEducationName
          : [],
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
                  <h1>Science and Education</h1>
                </div>
                <form class="rf-form-row-group">
                  <div class="two-column-row d-flex flex-wrap">
                    <div class="tc-left">
                      <div class="signup-modal-title fw-medium">Selected</div>
                      {selectScienceAndEducation &&
                        selectScienceAndEducation.length > 0 && (
                          <div class="tc-btn-box">
                            <Link
                              class="clear__all__btn"
                              onClick={() => {
                                const data = [];
                                setSelectScienceAndEducation(data);
                                setSelectScienceAndEducationName(data);
                              }}
                            >
                              Clear All
                            </Link>
                          </div>
                        )}

                      <div
                        class={
                          selectScienceAndEducationName &&
                          selectScienceAndEducationName.length <= 10
                            ? "check-group-list w-full-list "
                            : "check-group-list w-full-list custom-h"
                        }
                      >
                        {selectScienceAndEducationName &&
                          selectScienceAndEducationName.length > 0 &&
                          selectScienceAndEducationName.map((item) => {
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
                            value={searchText}
                            onChange={(event) =>
                              setSearchText(event.target.value)
                            }
                          />
                          <button
                            type="button"
                            class="modal-search-close-icon"
                            onClick={() => setSearchText("")}
                          >
                            <img src={close} alt="alt close" />
                          </button>
                        </div>
                        <div class="tc-btn-box">
                          <Link
                            class="clear__all__btn"
                            onClick={selectAllScienceAndEducation}
                          >
                            Select All
                          </Link>
                        </div>
                        <div class="tc-search-result-row hide-scrollbar">
                          <ul class="filter-content-list">
                            {scienceAndEducationDropdownData &&
                              scienceAndEducationDropdownData.length > 0 &&
                              scienceAndEducationDropdownData.map((item) => {
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
                                          selectScienceAndEducation &&
                                          selectScienceAndEducation.includes(
                                            item._id
                                          )
                                        }
                                        onChange={() => {
                                          const data1 = [
                                            ...selectScienceAndEducation,
                                          ];
                                          const data2 = [
                                            ...selectScienceAndEducationName,
                                          ];
                                          if (data1.includes(item?._id)) {
                                            const a = data1.filter(
                                              (val) => val !== item?._id
                                            );
                                            const b = data2.filter(
                                              (val) => val._id !== item?._id
                                            );
                                            setSelectScienceAndEducation(a);
                                            setSelectScienceAndEducationName(b);
                                          } else {
                                            data1.push(item?._id);
                                            data2.push(item);

                                            setSelectScienceAndEducation(data1);
                                            setSelectScienceAndEducationName(
                                              data2
                                            );
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
                  <div class="rf-form-btn d-flex align-items-center justify-content-end">
                    <NextButton
                      handleSubmit={handleNext}
                      classData={
                        selectScienceAndEducationName &&
                        selectScienceAndEducationName.length > 0
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
  updateYourProfile: (data, callback) =>
    dispatch(updateYourProfile(data, callback)),
  getScienceAndEducationList: (params, callback) =>
    dispatch(getScienceAndEducationList(params, callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProfileUpdateSix));
