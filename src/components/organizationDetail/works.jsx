import React from "react";
import { connect } from "react-redux";
import {
  getOrganizationDetails,
  getWorkDetails,
  organizationListing,
} from "../../store/organization";
import { removeTags } from "../../utils/helperFunctions";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import HTMLReactParser from "html-react-parser";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import { useEffect } from "react";
const Works = (props) => {
  const [loading, setLoading] = useState(false);
  const details =
    props.organizationListing && props.organizationListing.workDetail;

  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      if (description.includes("strong")) {
        description = description.substring(0, limit + 100) + dots;
      } else description = description.substring(0, limit) + dots;
    }
    return description;
  };

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
                  [1, 2].map((item) => (
                    <li class="tbc-grid-item">
                      <div class="tbc-grid-box">
                        <h4 className="text-capitalize">
                          <Skeleton width="560px" height="33px"/>
                        </h4>
                        <p>
                          <Skeleton width="560px" height="119px"/>
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    <ul class="tbc-grid-list  org-ul d-flex flex-wrap">
                      {details && details.data && details.data.length
                        ? details?.data.map((item) => {
                            return (
                              <li class="tbc-grid-item">
                                <div class="tbc-grid-box">
                                  <h4 className="text-capitalize">
                                    {dotDesc(
                                      HTMLReactParser(removeTags(item.name)),
                                      55
                                    )}
                                  </h4>
                                  <p>
                                    {" "}
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
  getWorkDetails: (params, callback) =>
    dispatch(getWorkDetails(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
});

const mapStateToProps = (state) => ({
  organizationListing: organizationListing(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Works));
