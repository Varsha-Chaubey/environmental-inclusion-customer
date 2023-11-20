import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getSpeciesDetails, speciesListings } from "../../store/species";
import noRecord from "../../include/images/nrb-img.svg";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";

const Threats = (props) => {
  const details = props.speciesListings && props.speciesListings.speciesDetail;

  const NThreat = details?.data?.naturalThreat;
  const naturalThreat = NThreat.split(",");

  const HThreat = details?.data?.humanThreat;
  const humanThreat = HThreat.split(",");

  const CThreat = details?.data?.climateChangeThreat;
  const climateChangeThreat = CThreat.split(",");


  const allRegionDetails = props?.sideBarApisListings?.regionList?.data;
  useEffect(() => {
    props.getRegionList({}, (res) => {
      if (res && res.status === 200) {
      }
    });
  }, []);

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
              {details &&
                details?.data &&
                details?.data?.naturalThreat == null &&
                details &&
                details?.data &&
                details?.data?.climateChangeThreat == null &&
                details &&
                details?.data &&
                details?.data?.humanThreat == null && (
                  <ul class="ei-grid-list d-flex flex-wrap justify-content-center">
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
              <ul class="tbc-grid-list d-flex flex-wrap">
                {details &&
                  details?.data &&
                  details?.data?.naturalThreat &&
                  details?.data?.naturalThreat !== null && (
                    <li class="tbc-grid-item">
                      <div class="tbc-grid-box">
                        <h4>Natural Threats</h4>
                        <ul class="default-list">
                          {naturalThreat &&
                            naturalThreat.map((item) => (
                              <li class="default-item caps-text">{item}</li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  )}

                {details &&
                  details?.data &&
                  details?.data?.humanThreat &&
                  details?.data?.humanThreat !== null && (
                    <li class="tbc-grid-item">
                      <div class="tbc-grid-box">
                        <h4>Human Threats</h4>
                        <ul class="default-list">
                          {humanThreat &&
                            humanThreat.map((item) => (
                              <li class="default-item caps-text">{item}</li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  )}

                {details &&
                  details?.data &&
                  details?.data?.climateChangeThreat &&
                  details?.data?.climateChangeThreat !== null && (
                    <li class="tbc-grid-item">
                      <div class="tbc-grid-box">
                        <h4>Climate Change Threats</h4>
                        <ul class="default-list">
                          {climateChangeThreat &&
                            climateChangeThreat.map((item) => (
                              <li class="default-item caps-text">{item}</li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="tbc-map-full">
        <div class="map-hero-image">
        {regionsName &&regionsName.length ===1 && regionsName[0]?.countryName === "United States" ? (
            <USMap
              name={
                regionsName&&regionsName.length ===1  && regionsName[0]?.countryName === "United States"
                  ? usState?.map((item) => item?.state)
                  : usState?.map((item) => item?.countryName)
              }
              data={usRegions}
              setSelectedId={props?.setSelectedId}
              page="species"
            />
          ) : (
            <WorldMap
              name={regionsName &&regionsName.length && regionsName?.map((item) => item?.countryName)}
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
  getSpeciesDetails: (params, callback) =>
    dispatch(getSpeciesDetails(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Threats));
