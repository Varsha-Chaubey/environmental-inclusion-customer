import React from "react";
import { connect } from "react-redux";
import {
  getOrganizationDetails,
  getTeamDetails,
  organizationListing,
} from "../../store/organization";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import { useEffect } from "react";
const Teams = (props) => {
  const [loading, setLoading] = useState(false);
  const details =
    props.organizationListing && props.organizationListing.teamDetail;

  const detail =
    props.organizationListing && props.organizationListing.organizationDetail;

  useEffect(() => {
    props.getRegionList({}, (res) => {
      if (res && res.status === 200) {
      }
    });
  }, []);
  const allRegionDetails = props?.sideBarApisListings?.regionList?.data;
  const usRegions =
    allRegionDetails &&
    allRegionDetails.length > 0 &&
    allRegionDetails.filter((item) => item.country === "US");

  const regionsName =
    detail?.data &&
    detail?.data?.regions &&
    detail?.data?.regions.length &&
    detail?.data?.regions.map((item) => item);

  const usState =
    regionsName &&
    regionsName.length &&
    regionsName.filter((item) => item.countryName === "United States");
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <ul class="tbc-grid-list org-ul d-flex flex-wrap">
                {loading ? (
                  [1, 2, 3, 4, 5].map((item) => (
                    <li class="tbc-our-team-item">
                      <div class="tbc-our-team-box">
                        <div class="tbc-our-team-image" style={{paddingBottom:"0px"}}>
                          <Skeleton  width="186px" height={"186px"}/>
                        </div>
                        <div class="tbc-our-team-text">
                          <p className="text-capitalize">
                            <Skeleton width="186px" height={"24px"} />
                          </p>
                          <small className="text-capitalize">
                            <Skeleton width="186px" height={"20px"}/>
                          </small>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    <ul class="tbc-our-team-list d-flex flex-wrap">
                      {details && details.data && details.data.length
                        ? details?.data.map((item) => {
                            return (
                              <li class="tbc-our-team-item">
                                <div class="tbc-our-team-box">
                                  <div class="tbc-our-team-image">
                                    <img
                                      src={
                                        process.env.REACT_APP_MEDIA +
                                        item?.profileImage?.original
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div class="tbc-our-team-text">
                                    <p className="text-capitalize">
                                      {item?.name}
                                    </p>
                                    <small className="text-capitalize">
                                      {item?.designation}
                                    </small>
                                  </div>
                                </div>
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
      <div class="country-cta-container bg-green" style={{ marginTop: "68px" }}>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="country-cta-box d-flex flex-row justify-content-center region-list">
                {regionsName && regionsName.length
                  ? regionsName.map((item, index) => {
                      return (
                        <p
                          style={{ marginRight: "5px", marginBottom: "0px" }}
                          key={index}
                        >
                          {item && item?.countryName === "United States"
                            ? `${item?.state}, ${item?.countryName}`
                            : item?.countryName}
                          {index !== regionsName.length - 1 ? " ." : ""}
                        </p>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tbc-map-full">
        <div class="map-hero-image">
          {regionsName &&
          regionsName.length === 1 &&
          regionsName[0]?.countryName === "United States" ? (
            <USMap
              name={
                regionsName &&
                regionsName.length === 1 &&
                regionsName[0]?.countryName === "United States"
                  ? usState?.map((item) => item?.state)
                  : usState?.map((item) => item?.countryName)
              }
              data={usRegions}
              setSelectedId={props?.setSelectedId}
              page="species"
            />
          ) : (
            <WorldMap
              name={
                regionsName &&
                regionsName.length &&
                regionsName?.map((item) => item?.countryName)
              }
              data={allRegionDetails}
              setSelectedId={props?.setSelectedId}
              page="species"
            />
          )}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getOrganizationDetails: (params, callback) =>
    dispatch(getOrganizationDetails(params, callback)),
  getTeamDetails: (params, callback) =>
    dispatch(getTeamDetails(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
});

const mapStateToProps = (state) => ({
  organizationListing: organizationListing(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Teams));
