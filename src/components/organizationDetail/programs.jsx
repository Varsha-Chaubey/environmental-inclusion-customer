import React from "react";
import { connect } from "react-redux";
import {
  getProgramDetails,
  organizationListing,
  getOrganizationDetails,
} from "../../store/organization";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getSlug, removeTags } from "../../utils/helperFunctions";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Programs = (props) => {
  const [loading, setLoading] = useState(false);
  const details =
    props.organizationListing && props.organizationListing.programDetail;
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
                   [1, 2, 3].map((item) => (
                  <>
                    <li class="blog-item">
                      <a href="#!" class="blog-box">
                        <div
                          class="blog-box-image"
                          style={{ paddingBottom: "0px" }}
                        >
                          <Skeleton height="173px" />
                        </div>
                        <div class="blog-box-content">
                          <div class="bbc-body">
                            <h6>
                              {" "}
                              <Skeleton />
                            </h6>
                            <p>
                              <Skeleton height="78px" />
                            </p>
                          </div>
                        </div>
                        <div class="bbc-footer">
                          <div class="bbc-footer-inner">
                            <p>
                              {" "}
                              <Skeleton width="385px" />
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </>
                ))
                 ): (
                  <>
                    <ul class="blog-list blog-list-4 d-flex flex-wrap">
                      {details && details.data && details.data.length
                        ? details?.data.map((item) => {
                            return (
                              <li class="blog-item">
                                <Link
                                  to={{
                                    pathname: `/organizations/${getSlug(
                                      props?.name
                                    )}/program`,
                                    state: {
                                      id: props.id,
                                      name: props?.name,
                                      item: item,
                                    },
                                  }}
                                  class="blog-box blog-sm"
                                >
                                  <div class="blog-box-image">
                                    <img
                                      src={
                                        process.env.REACT_APP_MEDIA +
                                        item?.coverImage?.original
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div class="blog-box-content">
                                    <div class="bbc-body">
                                      <h6>
                                        {dotDesc(
                                          HTMLReactParser(
                                            removeTags(item.name)
                                          ),
                                          55
                                        )}
                                      </h6>
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
                                  <div class="bbc-footer">
                                    <div class="bbc-footer-inner">
                                      <p>
                                        {moment(item && item.createdAt).format(
                                          "MMM DD, YYYY"
                                        )}
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
  getProgramDetails: (params, callback) =>
    dispatch(getProgramDetails(params, callback)),
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
)(React.memo(Programs));
