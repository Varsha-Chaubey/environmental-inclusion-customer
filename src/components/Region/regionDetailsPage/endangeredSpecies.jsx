import React, { useState } from "react";
import ListingCard from "../../common/listingCard/listingCard";
import { getSpecies, regionListings } from "../../../store/region";
import { connect } from "react-redux";
import noRecord from "../../../include/images/nrb-img.svg";
const EndangeredSpecies = (props) => {
  const [loading, setLoading] = useState(false);

  const specieDetails =
    props.regionDetails &&
    props.regionDetails.species &&
    props.regionDetails.species.data;

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner">
            {specieDetails && specieDetails.length == 0 && (
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
            <ul class="ei-grid-list region-species-list d-flex flex-wrap ei-grid-5">
              {specieDetails &&
                specieDetails.length > 0 &&
                specieDetails.map((item) => (
                  <ListingCard
                    name={item.name}
                    loading={loading}
                    img={item?.coverImage?.original}
                    pawRed={true}
                    pawRedImage={item?.dangerLevel?.coverImage?.original}
                    id={item?._id}
                    page={"region-species"}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSpecies: (params, callback) => dispatch(getSpecies(params, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EndangeredSpecies));
