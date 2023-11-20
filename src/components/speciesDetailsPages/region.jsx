import React from "react";

import { connect } from "react-redux";
import { getRegion, speciesListings } from "../../store/species";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import { useEffect } from "react";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import USMap from "../../common/maps/regionDetail/usMap";
const Region = (props) => {
  const details = props.speciesListings && props.speciesListings.region;

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

    const usState =
    details &&
    details.data&&
    details.data.length &&
    details.data.filter((item) => item.countryName === "United States");

  return (
    <div class="tbc-body-inner">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-region-map">
            <div class="map-hero-image">
            {details &&details.data && details.data.length ===1 && details.data[0]?.countryName === "United States" ? (
            <USMap
              name={
                details &&details.data && details.data.length ===1 && details.data[0]?.countryName === "United States" 
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
                  details &&
                  details.data &&
                  details.data.map((item) => item?.countryName)
                }
                data={allRegionDetails}
                setSelectedId={props?.setSelectedId}
                page="species"
              />
              )} 
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRegion: (params, callback) => dispatch(getRegion(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Region));
