import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import close from "../../include/images/search-close-18x18.svg";
import { sideBarApisListings, getWetMarketList } from "../../store/sidebarApis";
import Header from "./header";
import NextButton from "../../common/form/nextButton";

const ProfileUpdateTwo = (props) => {
  const [loading, setLoading] = useState(false);
  const [wetMarketDropdownData, setWetMarketDropdownData] = useState(null);
  const [textSearched, setTextSearched] = useState("");

  // for select checkbox
  const [selectWetMarket, setSelectedWetMarket] = useState(
    props?.steps?.data?.WetMarketData
      ? props?.steps?.data?.WetMarketData &&
          props?.steps?.data?.WetMarketData.map((item) => item._id)
      : []
  );
  const [selectWetMarketName, setSelectedWetMarketName] = useState(
    props?.steps?.data?.WetMarketData
      ? props?.steps?.data?.WetMarketData &&
          props?.steps?.data?.WetMarketData.map((item) => item)
      : []
  );

  useEffect(() => {
    setLoading(true);
    const payload = {
      keyword: textSearched ? textSearched : "",
    };
    props.getWetMarketList(payload, (res) => {
      if (res && res.status === 200) {
        setWetMarketDropdownData(res?.data?.data);
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

  const hanldeSelectAll = () => {
    const allWetMarketIds = wetMarketDropdownData.map((item) => item._id);
    setSelectedWetMarket(allWetMarketIds);
    setSelectedWetMarketName(wetMarketDropdownData);
  };

  const handleSubmit = () => {
    props.setSteps({
      step: 5,
      data: {
        ...props.steps.data,
        WetMarketData: selectWetMarketName ? selectWetMarketName : [],
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
                  <h1>War on the Environment</h1>
                </div>
                <form class="rf-form-row-group">
                  <div class="two-column-row d-flex flex-wrap">
                    <div class="tc-left">
                      <div class="signup-modal-title fw-medium">Selected</div>
                      {selectWetMarket && selectWetMarket.length > 0 && (
                        <>
                          <div class="tc-btn-box">
                            <Link
                              class="clear__all__btn"
                              onClick={() => {
                                const data = [];
                                setSelectedWetMarketName(data);
                                setSelectedWetMarket(data);
                              }}
                            >
                              Clear All
                            </Link>
                          </div>
                        </>
                      )}

                      <div
                        class={
                          selectWetMarketName &&
                          selectWetMarketName.length <= 10
                            ? "check-group-list w-full-list "
                            : "check-group-list w-full-list custom-h"
                        }
                      >
                        {selectWetMarketName &&
                          selectWetMarketName?.length > 0 &&
                          selectWetMarketName?.map((item) => {
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
                            onClick={hanldeSelectAll}
                          >
                            Select All
                          </Link>
                        </div>
                        <div class="tc-search-result-row hide-scrollbar">
                          <ul class="filter-content-list">
                            {wetMarketDropdownData &&
                              wetMarketDropdownData?.length > 0 &&
                              wetMarketDropdownData.map((item) => {
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
                                          selectWetMarket &&
                                          selectWetMarket.includes(item._id)
                                        }
                                        onChange={() => {
                                          const data = [...selectWetMarket];
                                          const data1 = [
                                            ...selectWetMarketName,
                                          ];
                                          if (data.includes(item._id)) {
                                            const a = data.filter(
                                              (item1) => item1 !== item._id
                                            );
                                            const b = data1.filter(
                                              (item1) => item1._id !== item._id
                                            );
                                            setSelectedWetMarketName(b);
                                            setSelectedWetMarket(a);
                                          } else {
                                            data.push(item._id);
                                            data1.push(item);
                                            setSelectedWetMarketName(data1);
                                            setSelectedWetMarket(data);
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
                      handleSubmit={handleSubmit}
                      classData={
                        selectWetMarket && selectWetMarket.length > 0
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
  getWetMarketList: (params, callback) =>
    dispatch(getWetMarketList(params, callback)),
});

const mapStateToProps = (state) => ({
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProfileUpdateTwo));
