import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import close from "../../../include/images/x-close-24x24.svg";
import Mclose from "../../../include/images/close-24x24.svg";
import searchClose from "../../../include/images/search-close-18x18.svg";
import {
  getSpeciesCategoryList,
  sideBarApisListings,
  getSpeciesList,
} from "../../../store/sidebarApis";
import {
  getUser,
  updateYourProfile,
  getUsersPreferences,
} from "../../../store/users";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import AlertError from "../../../common/alerts/alertError";
import AlertSuccess from "../../../common/alerts/alertSuccess";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
import { useRef } from "react";
import NextButton from "../../../common/form/nextButton";

const SpeciesAndCategoryEditModal = (props) => {
  var ref = useRef();
  const isMobile = useCheckMobileScreen();
  const [speciesDropdownData, setSpeciesDropdonData] = useState(null);
  const [speciesCategoryData, setSpeciesCategoryData] = useState(null);
  const [textSearched, setTextSearched] = useState("");
  const [selectSpecies, setSelectSpecies] = useState([]);
  const [selectSpeciesName, setSelectSpeciesName] = useState([]);
  const [selectSpeciesCategory, setSelectSpeciesCategory] = useState([]);

  useEffect(() => {
    const a =
      props?.speciesData && props?.speciesData.length > 0
        ? props?.speciesData.map((item) => item?._id)
        : [];
    setSelectSpecies(a);

    const b = props?.speciesData ? props.speciesData : [];
    setSelectSpeciesName(b);

    const c =
      props.speciesCatData && props.speciesCatData.length > 0
        ? props.speciesCatData.map((item) => item?._id)
        : [];

    setSelectSpeciesCategory(c);
  }, [props?.speciesData, props.speciesCatData]);

  useEffect(() => {
    // When the modal opens, will initialize the temporary state with the current selected categories.
    props.setTempSelectSpeciesCategory([...selectSpeciesCategory]);
    props.setTempSelectSpecies([...selectSpecies]);
    props.setTempSelectSpeciesName([...selectSpeciesName]);
  }, [props.show]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    props.setLoading(true);
    const categories =
      props.tempSelectSpeciesCategory &&
      props.tempSelectSpeciesCategory.map((item) => item).join(",");
    const payload = {
      keyword: textSearched ? textSearched : "",
    };
    if (categories) {
      payload.categories = categories;
    }
    props.getSpeciesList(payload, (res) => {
      if (res && res.status === 200) {
        setSpeciesDropdonData(res?.data?.data);
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
  }, [textSearched, props.tempSelectSpeciesCategory]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    props.setLoading(true);
    props.getSpeciesCategoryList({}, (res) => {
      if (res && res.status === 200) {
        setSpeciesCategoryData(res?.data?.data);
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
  }, []);

  const handleSelectAllSpecies = () => {
    const allIds =
      speciesDropdownData && speciesDropdownData.map((item) => item?._id);
    props.setTempSelectSpecies(allIds);
    props.setTempSelectSpeciesName(speciesDropdownData);
  };

  const handleSpeciesUpdateProfile = (e) => {
    e.preventDefault();
    ref && ref.current && ref.current.continuousStart();
    props.setLoading(true);
    const payload = {
      preferredSpecies: props.tempSelectSpecies ? props.tempSelectSpecies : [],
      preferredSpeciesCategories: props.tempSelectSpeciesCategory
        ? props.tempSelectSpeciesCategory
        : [],
    };
    props.updateYourProfile(payload, (res) => {
      if (res && res.status === 200) {
        props.getUsersPreferences("species", (res) => {
          if (res && res.status === 200) {
            props.setSpeciesData(res?.data?.data);
            props.getUsersPreferences("speciesCategory", (res) => {
              if (res && res.status === 200) {
                props.setSpeciesCatData(res?.data?.data);
                ref && ref.current && ref.current.complete();
                props.setLoading(false);
                toast(<AlertSuccess message="Information Saved" />);
                props.onHide();
              }
            });
          }
        });
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
  };

  return (
    <>
      <Modal
        className={`modal fade signup-modal font-family-poppins `}
        id="speciesModal"
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
                      Major Categories of Species to Follow
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
                    <div className="modal_close-box d-lg-none ">
                      <div
                        className={`signup-modal-close ms-auto ${
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
                    Select a group of individual species that you want to
                    follow. You will receive a notification if anything is
                    posted on these species pages. You can adjust what you see
                    in your feed below.
                  </p>
                  {isMobile && props.isViewAll && (
                    <div className="accor-edit-btn">
                      <Link
                        className={`edit-green-btn mb-4 `}
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
                  <div className="grey-content-box">
                    <div className="signup-modal-title fw-medium">
                      Narrow List to Major Species Categories
                    </div>
                    <div className="check-group-list d-flex flex-wrap">
                      {props?.isEdit ? (
                        <>
                          {speciesCategoryData &&
                            speciesCategoryData.length > 0 &&
                            speciesCategoryData.map((item) => {
                              return (
                                <div class="check-group-item">
                                  <div class="custom-form-check">
                                    <label class="filter-content-box">
                                      {item?.name}
                                      <input
                                        id={item?.id}
                                        type="checkbox"
                                        checked={props.tempSelectSpeciesCategory.includes(
                                          item._id
                                        )}
                                        onChange={() => {
                                          const updatedTempSelectSpeciesCategory =
                                            [
                                              ...props.tempSelectSpeciesCategory,
                                            ];

                                          if (
                                            updatedTempSelectSpeciesCategory.includes(
                                              item._id
                                            )
                                          ) {
                                            updatedTempSelectSpeciesCategory.splice(
                                              updatedTempSelectSpeciesCategory.indexOf(
                                                item._id
                                              ),
                                              1
                                            );
                                          } else {
                                            updatedTempSelectSpeciesCategory.push(
                                              item._id
                                            );
                                          }

                                          props.setTempSelectSpeciesCategory(
                                            updatedTempSelectSpeciesCategory
                                          );
                                        }}
                                      />
                                      <span class="checkmark"></span>
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                        </>
                      ) : (
                        <>
                          {speciesCategoryData &&
                            speciesCategoryData.length > 0 &&
                            speciesCategoryData.map((item) => {
                              return (
                                <div class="check-group-item">
                                  <div class="custom-form-check">
                                    <label class="filter-content-box">
                                      {item?.name}
                                      <input type="checkbox" disabled />
                                      <span class="checkmark"></span>
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="signup-modal-body pt-0">
                  <div className="two-column-row d-flex flex-wrap">
                    <div className="tc-left">
                      <div className="signup-modal-title fw-medium">
                        Selected
                      </div>
                      {props?.isEdit &&
                        props.tempSelectSpecies &&
                        props.tempSelectSpecies.length > 0 && (
                          <div className="tc-btn-box">
                            <Link
                              className="clear__all__btn"
                              onClick={() => {
                                const data = [];
                                props.setTempSelectSpecies(data);
                                props.setTempSelectSpeciesName(data);
                              }}
                            >
                              Clear All
                            </Link>
                          </div>
                        )}
                      <div
                        className={
                          props.tempSelectSpeciesName &&
                          props.tempSelectSpeciesName.length >= 10
                            ? "check-group-list w-full-list custom-edit-h"
                            : "check-group-list w-full-list"
                        }
                      >
                        {props.tempSelectSpeciesName &&
                          props.tempSelectSpeciesName.length > 0 &&
                          props.tempSelectSpeciesName.map((item) => {
                            return (
                              <div className="check-group-item">
                                <div className="custom-form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    checked
                                  />
                                  <label className="form-check-label">
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
                        Species Under Selected Categories
                      </div>
                      <div className="modal-serch-box position-relative">
                        <input
                          type="text"
                          className="modal-search"
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
                      {props.isEdit && (
                        <div className="tc-btn-box">
                          <Link
                            className="clear__all__btn"
                            onClick={handleSelectAllSpecies}
                          >
                            Select All
                          </Link>
                        </div>
                      )}
                      <div className="tc-search-result-row">
                        <ul class="filter-content-list">
                          {props.isEdit ? (
                            <>
                              {speciesDropdownData &&
                                speciesDropdownData.length > 0 &&
                                speciesDropdownData.map((item, idx) => {
                                  const firstLetter = item?.name
                                    .charAt(0)
                                    .toUpperCase();
                                  const showHeader =
                                    idx === 0 ||
                                    firstLetter !==
                                      speciesDropdownData[idx - 1].name
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
                                               
                                                checked={props.tempSelectSpecies&&props.tempSelectSpecies.includes(
                                                  item._id
                                                )}
                                                onChange={() => {
                                                  const updatedTempSelectSpecies =
                                                    [
                                                      ...props.tempSelectSpecies,
                                                    ];
                                                  const updatedTempSelectSpeciesName =
                                                    [
                                                      ...props.tempSelectSpeciesName,
                                                    ];
                                                  if (
                                                    updatedTempSelectSpecies.includes(
                                                      item._id
                                                    )
                                                  ) {
                                                    updatedTempSelectSpecies.splice(
                                                      updatedTempSelectSpecies.indexOf(
                                                        item._id
                                                      ),
                                                      1
                                                    );
                                                    updatedTempSelectSpeciesName.splice(
                                                      updatedTempSelectSpeciesName.indexOf(
                                                        item
                                                      ),
                                                      1
                                                    );
                                                  } else {
                                                    updatedTempSelectSpecies.push(
                                                      item._id
                                                    );
                                                    updatedTempSelectSpeciesName.push(
                                                      item
                                                    );
                                                  }

                                                  props.setTempSelectSpecies(
                                                    updatedTempSelectSpecies
                                                  );
                                                  props.setTempSelectSpeciesName(
                                                    updatedTempSelectSpeciesName
                                                  );
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
                            </>
                          ) : (
                            <>
                              {speciesDropdownData &&
                                speciesDropdownData.length > 0 &&
                                speciesDropdownData.map((item, idx) => {
                                  const firstLetter = item?.name
                                    .charAt(0)
                                    .toUpperCase();
                                  const showHeader =
                                    idx === 0 ||
                                    firstLetter !==
                                      speciesDropdownData[idx - 1].name
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
                                              <input type="checkbox" disabled />
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
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {props.isEdit && (
                  <div className="signup-modal-footer  d-flex align-items-start justify-content-end">
                    <NextButton
                      classData={
                        props.tempSelectSpecies &&
                        props.tempSelectSpecies.length > 0
                          ? "btn btn-default btn-md"
                          : "btn btn-default btn-md disabled"
                      }
                      label="Save"
                      page={"edit-feed"}
                      loading={props.loading}
                      handleSubmit={(e) => handleSpeciesUpdateProfile(e)}
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
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSpeciesCategoryList: (params, callback) =>
    dispatch(getSpeciesCategoryList(params, callback)),
  getSpeciesList: (params, callback) => {
    dispatch(getSpeciesList(params, callback));
  },
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
)(React.memo(SpeciesAndCategoryEditModal));
