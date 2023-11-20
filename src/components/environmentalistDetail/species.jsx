import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getEnvironmentalistDetails,
  environmentalistListings,
} from "../../store/environmentalist";
import HTMLReactParser from "html-react-parser";
import { getSlug, removeTags } from "../../utils/helperFunctions";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Species = (props) => {
  const [loading, setLoading] = useState(false);

  const details =
    props.environmentalistListings &&
    props.environmentalistListings.environmentalistDetail;

  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      if (description.includes("strong")) {
        description = description.substring(0, limit + 100) + dots;
      } else description = description.substring(0, limit) + dots;
    }
    return description;
  };
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <ul class="tbc-grid-list d-flex flex-wrap ul-padding">
                {loading ? (
                  [1, 2].map((item) => (
                    <li class="tbc-grid-item">
                      <div class="tbc-grid-box">
                        <h4>
                          <Skeleton width="500px" height="220px" />
                        </h4>
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    <ul class="card-list d-lg-flex flex-lg-wrap" style={{marginBottom:"68px"}}>
                      {details &&
                      details.data &&
                      details.data.species &&
                      details?.data?.species.length
                        ? details?.data?.species.map((item) => {
                            return (
                              <li class="card-item">
                                <Link
                                  to={{
                                    pathname: `/endangered-species/${getSlug(item?.name)}`,
                                    state: { id: item._id },
                                  }}
                                  class="card-box w-100 h-100 d-flex flex-wrap align-items-center"
                                >
                                  <div class="card-img-box overflow-hidden">
                                    <div class="card-img-inside">
                                      <img
                                        class="card-img"
                                        src={
                                          item?.coverImage?.original
                                            ? process.env.REACT_APP_MEDIA +
                                              item?.coverImage?.original
                                            : ""
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div class="card-content-box">
                                    <h5>{item?.name}</h5>
                                    <div class="card-content w-100">
                                      <p>
                                        {item.description
                                          ? dotDesc(
                                              HTMLReactParser(
                                                removeTags(item.description)
                                              ),
                                              330
                                            )
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
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
)(React.memo(Species));
