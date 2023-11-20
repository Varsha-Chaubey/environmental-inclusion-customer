import React from "react";
import { connect } from "react-redux";
import { getRegionDetails, regionListings } from "../../../store/region";
import parse from "html-react-parser";

const Details = (props) => {
  const details = props.regionDetails && props.regionDetails.regionDetails;

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <div class="tbc-details d-flex flex-wrap region-details-main ">
                <div class="tbc-details-right" style={{ fontSize: "14px" }}>
                  {details?.description ? parse(details?.description) : ""}
                </div>
                <div class="tbc-details-left r-image">
                  <img
                    src={
                      details?.coverImage?.original
                        ? process.env.REACT_APP_MEDIA +
                          details?.coverImage?.original
                        : ""
                    }
                    alt=""
                  />
                </div>
              </div>
              <div class="tbc-details-bg">
                <img
                  src={
                    details?.coverImage?.original
                      ? process.env.REACT_APP_MEDIA +
                        details?.coverImage?.original
                      : ""
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRegionDetails: (params, callback) =>
    dispatch(getRegionDetails(params, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Details));
