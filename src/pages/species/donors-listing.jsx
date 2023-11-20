import React from "react";
import { connect } from "react-redux";
import { getDonation, speciesListings } from "../../store/species";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";

const DonorsList = (props) => {
  const [loading, setLoading] = useState(false);
  const donation = props.speciesListings && props.speciesListings.donation;
  window.scrollTo(0, 0);
  return (
    <PageLayout>
      <main id="main">
        <div class="listing-container">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="ei-heading ">
                  <h4>List of Donors</h4>
                </div>
                <ul class="doner-list d-flex flex-wrap">
                  {loading ? (
                    [1, 2, 3].map((item) => (
                      <li class="doner-item">
                        <Skeleton height="250px" />
                      </li>
                    ))
                  ) : (
                    <ul class="doner-list d-flex flex-wrap">
                      {donation &&
                        donation.data &&
                        donation.data.length > 0 &&
                        donation.data.map((item, i) => (
                          <>
                            {item?.isNameDisplayed === true && (
                              <li class="doner-item">
                                <div class="doner-box">
                                  <div class="doner-logo ">
                                    <img
                                      src={
                                        item?.coverImage?.original
                                          ? process.env.REACT_APP_MEDIA +
                                            item?.coverImage?.original
                                          : ""
                                      }
                                      alt=""
                                      className="img-h"
                                    />
                                    <h6>{item?.companyName}</h6>
                                  </div>
                                  <div class="doner-details">
                                    <small>{item?.personName}</small>
                                    <p>${item?.amount}</p>
                                  </div>
                                </div>
                              </li>
                            )}
                          </>
                        ))}
                    </ul>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getDonation: (params, callback) => dispatch(getDonation(params, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(DonorsList));
