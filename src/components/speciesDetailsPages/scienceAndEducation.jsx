import React, { useState } from "react";
import ListingCardType from "../common/listingCard/listingCardType2";
import { getScienceAndEducation, speciesListings } from "../../store/species";
import { connect } from "react-redux";
import noRecord from "../../include/images/nrb-img.svg";
const ScienceAndEducation = (props) => {
  const [loading, setLoading] = useState(false);

  const scienceEducationDetails =
    props.speciesListings &&
    props.speciesListings.scienceAndEducation &&
    props.speciesListings.scienceAndEducation.data;
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner">
            {scienceEducationDetails && scienceEducationDetails.length == 0 && (
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
            <ul class="ei-grid-list d-flex flex-wrap">
              {scienceEducationDetails &&
                scienceEducationDetails.length > 0 &&
                scienceEducationDetails.map((item) => (
                  <ListingCardType
                    loading={loading}
                    name={item.name}
                    img={
                      process.env.REACT_APP_MEDIA + item?.coverImage?.original
                    }
                    id={item?._id}
                    page="Science And Education"
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
  getScienceAndEducation: (params, callback) =>
    dispatch(getScienceAndEducation(params, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ScienceAndEducation));
