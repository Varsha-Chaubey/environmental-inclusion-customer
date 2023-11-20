import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getEnvironmentalistDetails,
  environmentalistListings,
} from "../../store/environmentalist";
import App from "../../common/maps/map";
import { getSlug, removeTags } from "../../utils/helperFunctions";

import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Organizations = (props) => {
  const [loading, setLoading] = useState(false);
  const [mapOrganizationData, setOrganizationData] = useState([]);

  useEffect(() => {
    setLoading(true);
    props.getEnvironmentalistDetails(props.id, (res) => {
      if (res && res.status === 200) {
        const a =
          res &&
          res.data &&
          res.data.data &&
          res.data.data.organizations &&
          res.data.data?.organizations?.length > 0 &&
          res.data.data.organizations.map((item) => ({
            name: item.name,
            coordinates: item.geoLocation,
          }));
        setOrganizationData(a);
        setLoading(false);
      }
    });
  }, []);

  const details =
    props.environmentalistListings &&
    props.environmentalistListings.environmentalistDetail;

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <ul class="tbc-grid-list d-flex flex-wrap ul-padding">
                {loading ? (
                  [1, 2, 3, 4].map((item) => (
                    <li class="tbc-organization-item">
                      <Skeleton height="250px" />
                    </li>
                  ))
                ) : (
                  <>
                    <ul class="tbc-grid-list  d-flex flex-wrap" style={{marginBottom:"40px"}}>
                      {details &&
                      details.data &&
                      details.data.organizations &&
                      details?.data?.organizations.length
                        ? details?.data?.organizations.map((item) => {
                            return (
                              <li class="tbc-organization-item">
                                <Link
                                  to={{
                                    pathname: `/organizations/${getSlug(
                                      item?.name
                                    )}`,
                                    state: { id: item._id },
                                  }}
                                  class="tbc-organization-box"
                                >
                                  <img
                                    class="org-img-fix org-img"
                                    src={
                                      process.env.REACT_APP_MEDIA +
                                      item?.coverImage?.original
                                    }
                                    alt=""
                                  />
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
      <App data={mapOrganizationData} mapType="zoo" zoom={"zoom"} />
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
)(React.memo(Organizations));
