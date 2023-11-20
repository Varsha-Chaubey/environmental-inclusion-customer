import React from "react";
import { connect } from "react-redux";
import {
  getEnvironmentalistDetails,
  environmentalistListings,
} from "../../store/environmentalist";
import parse from "html-react-parser";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const Detail = (props) => {
  const [loading, setLoading] = useState(false);
  const details =
    props.environmentalistListings &&
    props.environmentalistListings.environmentalistDetail;

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              {loading ? (
                <>
                  <div class="tbc-details d-flex flex-wrap region-details-main ">
                    <div class="tbc-details-right" style={{ fontSize: "14px" }}>
                      <Skeleton width="500px" height="250px" />
                    </div>

                    <Skeleton width="500px" height="500px" />
                  </div>
                </>
              ) : (
                <>
                  <div class="tbc-details d-flex flex-wrap region-details-main ">
                    <div class="tbc-details-right" style={{ fontSize: "14px" }}>
                      {details?.data?.description
                        ? parse(details?.data?.description)
                        : ""}
                    </div>
                    <div class="tbc-details-left r-image">
                      <img
                        src={
                          details?.data?.coverImage?.original
                            ? process.env.REACT_APP_MEDIA +
                              details?.data?.coverImage?.original
                            : ""
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="tbc-details-bg">
                    <img
                      src={
                        details?.data?.coverImage?.original
                          ? process.env.REACT_APP_MEDIA +
                            details?.data?.coverImage?.original
                          : ""
                      }
                      alt=""
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// Saber-Toothed Tiger
const mapDispatchToProps = (dispatch) => ({
  getEnvironmentalistDetails: (params, callback) =>
    dispatch(getEnvironmentalistDetails(params, callback)),
});

const mapStateToProps = (state) => ({
  environmentalistListings: environmentalistListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Detail));
