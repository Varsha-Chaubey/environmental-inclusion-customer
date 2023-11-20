import React from "react";
import { connect } from "react-redux";
import {
  getPartnerDetails,
  organizationListing,
  getOrganizationDetails,
} from "../../store/organization";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import { useEffect } from "react";
const Partners = (props) => {
  const [loading, setLoading] = useState(false);
  const details =
    props.organizationListing && props.organizationListing.partnerDetail;

  useEffect(() => {
    props.getRegionList({}, (res) => {
      if (res && res.status === 200) {
      }
    });
  }, []);
  const detail =
    props.organizationListing && props.organizationListing.organizationDetail;
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
              <ul
                class="media-list d-flex flex-wrap"
                style={{ marginTop: "0px" }}
              >
                {loading ? (
                  [1, 2, 3, 4, 5].map((item) => (
                    <li class="partner-item">
                      <Skeleton width="107px" height={"87px"} />
                    </li>
                  ))
                ) : (
                  <>
                    <ul class="partner-list d-flex flex-wrap">
                      {details && details.data && details.data.length
                        ? details?.data.map((item) => {
                            return (
                              <li class="partner-item">
                                <div class="partner-box">
                                  <img
                                    src={
                                      process.env.REACT_APP_MEDIA +
                                      item?.logo?.original
                                    }
                                    alt=""
                                  />
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
  getPartnerDetails: (params, callback) =>
    dispatch(getPartnerDetails(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
});

const mapStateToProps = (state) => ({
  organizationListing: organizationListing(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Partners));
