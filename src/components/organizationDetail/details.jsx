import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getOrganizationDetails,
  organizationListing,
} from "../../store/organization";
import parse from "html-react-parser";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
const Details = (props) => {
  const [loading, setLoading] = useState(false);
  const details =
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
    details?.data &&
    details?.data?.regions &&
    details?.data?.regions.length &&
    details?.data?.regions.map((item) => item);

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
                          details?.data?.detailTabImage?.original
                            ? process.env.REACT_APP_MEDIA +
                              details?.data?.detailTabImage?.original
                            : ""
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="tbc-details-bg">
                    <img
                      src={
                        details?.data?.detailTabImage?.original
                          ? process.env.REACT_APP_MEDIA +
                            details?.data?.detailTabImage?.original
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
      <div class="country-cta-container bg-green">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="country-cta-box d-flex flex-row justify-content-center region-list" >
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
                          {index !== regionsName.length - 1? " ." : ""}
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
// Saber-Toothed Tiger
const mapDispatchToProps = (dispatch) => ({
  getOrganizationDetails: (params, callback) =>
    dispatch(getOrganizationDetails(params, callback)),
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
)(React.memo(Details));
