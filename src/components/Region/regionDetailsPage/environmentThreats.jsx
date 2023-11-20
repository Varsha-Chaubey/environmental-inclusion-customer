import React, { useState } from "react";
import ListingCardTypeThree from "../../common/listingCard/listingCardTypeThree";
import { connect } from "react-redux";
import { getWetMarkets, regionListings } from "../../../store/region";
import noRecord from "../../../include/images/nrb-img.svg";
const EnvironmentThreats = (props) => {
  const [loading, setLoading] = useState(false);

  const wetMarketDetails =
    props.regionDetails && props.regionDetails.wetMarkets;

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner">
            {wetMarketDetails && wetMarketDetails.length == 0 && (
              <ul class="ei-grid-list d-flex flex-wrap justify-content-center">
                <div class="no-records-container d-flex align-items-center justify-content-center">
                  <div class="no-records-box text-center">
                    <div class="nrb-image">
                      <img src={noRecord} alt="" />
                    </div>
                    <h6>No Records Found</h6>
                  </div>
                </div>
              </ul>
            )}
            <ul class="ei-grid-list d-flex flex-wrap">
              {wetMarketDetails &&
                wetMarketDetails.length > 0 &&
                wetMarketDetails.map((item) => (
                  <ListingCardTypeThree
                    loading={loading}
                    description={item.name}
                    img={
                      process.env.REACT_APP_MEDIA + item?.coverImage?.original
                    }
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getWetMarkets: (params, data, callback) =>
    dispatch(getWetMarkets(params, data, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EnvironmentThreats));
