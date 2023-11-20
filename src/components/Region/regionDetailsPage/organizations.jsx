import React, { useState } from "react";
import { getOrganizations, regionListings } from "../../../store/region";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import noRecord from "../../../include/images/nrb-img.svg";
import { getSlug } from "../../../utils/helperFunctions";
import { Link } from "react-router-dom";
const Organizations = (props) => {
  const [loading, setLoading] = useState(false);

  const organizationDetail =
    props.regionDetails && props.regionDetails.organization;

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner">
            {organizationDetail &&
              organizationDetail.data &&
              organizationDetail?.data?.length == 0 && (
                <ul class="tbc-organization-list d-flex flex-wrap justify-content-center">
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
            <ul class="tbc-organization-list d-flex flex-wrap">
              {loading ? (
                [1, 2, 3, 4, 5].map((item) => (
                  <li class="tbc-organization-item">
                    <Skeleton height="250px" />
                  </li>
                ))
              ) : (
                <ul class="tbc-organization-list d-flex flex-wrap">
                  {organizationDetail &&
                    organizationDetail.data &&
                    organizationDetail.data.length > 0 &&
                    organizationDetail.data.map((item) => (
                      <li class="tbc-organization-item">
                        <Link
                          to={{
                            pathname: `/organizations/${getSlug(item?.name)}`,
                            state: { id: item._id },
                          }}
                          class="tbc-organization-box d-flex justify-content-center"
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
                    ))}
                </ul>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getOrganizations: (params, callback) =>
    dispatch(getOrganizations(params, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Organizations));
