import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getEnvironmentalistDetails,
  environmentalistListings,
} from "../../store/environmentalist";
import { getSlug, removeTags } from "../../utils/helperFunctions";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Regions = (props) => {
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
              <ul class="map-list d-flex flex-wrap ul-padding">
                {loading ? (
                  [1, 2].map((item) => (
                    <li class="tbc-grid-item">
                      <div className="ei-grid-box">
                        <Skeleton height={"270px"} />
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    <ul class="map-list d-flex flex-wrap">
                      {details &&
                      details.data &&
                      details.data.regions &&
                      details?.data?.regions.length
                        ? details?.data?.regions.map((item) => {
                            return (
                              <li class="map-item" style={{marginBottom:"20px"}}>
                                <Link
                                  to={{
                                    pathname: `/regions/${getSlug(item?.name)}`,
                                    state: { id: item._id },
                                  }}
                                  class="map-box"
                                >
                                  <div class="map-box-img">
                                    <img
                                      src={
                                        item?.coverImage?.original
                                          ? process.env.REACT_APP_MEDIA +
                                            item?.coverImage?.original
                                          : ""
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <p>
                                    {item &&
                                    item?.countryName === "United States"
                                      ? `${item?.state}, ${item?.countryName}`
                                      : item?.countryName}
                                  </p>
                                </Link>
                              </li>
                            );
                          })
                        : ""}
                    </ul>
                  </>
                )}
              </ul>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Regions));
