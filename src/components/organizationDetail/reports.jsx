import React from "react";
import { connect } from "react-redux";
import {
  getReportDetails,
  organizationListing,
  getOrganizationDetails,
} from "../../store/organization";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import download from "../../include/images/download.svg";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import { useEffect } from "react";
const Reports = (props) => {
  const [loading, setLoading] = useState(false);
  const details =
    props.organizationListing && props.organizationListing.reportDetail;

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
              {loading ? (
                <>
                  <div class="report-box">
                    <div className="text-capitalize">
                      <Skeleton width="844px" height={"40px"} />
                    </div>
                    <a class="report-box-download">
                      <Skeleton width="50px" height={"40px"} />
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <ul class="report-list">
                    {details && details.data && details.data.length
                      ? details?.data.map((item) => {
                          return (
                            <li class="report-item">
                              <div class="report-box">
                                <h4 className="text-capitalize">
                                  {item?.name}
                                  <small className="text-capitalize">
                                    {item?.reportedBy}
                                  </small>
                                </h4>
                                <a
                                  class="report-box-download"
                                  href={`${process.env.REACT_APP_MEDIA}${item?.file?.original}`}
                                  download
                                  target="_blank"
                                >
                                  <img src={download} alt="" />
                                </a>
                              </div>
                            </li>
                          );
                        })
                      : ""}
                  </ul>
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
  getReportDetails: (params, callback) =>
    dispatch(getReportDetails(params, callback)),
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
)(React.memo(Reports));
