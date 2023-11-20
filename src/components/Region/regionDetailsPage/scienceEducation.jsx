import React, { useState } from "react";
import ListingCardType from "../../common/listingCard/listingCardType2";
import { getScienceEducation, regionListings } from "../../../store/region";
import { connect } from "react-redux";
import noRecord from "../../../include/images/nrb-img.svg";
const ScienceEducation = (props) => {
  const [loading, setLoading] = useState(false);

  const scienceEducationDetails =
    props.regionDetails &&
    props.regionDetails.scienceAndEducation &&
    props.regionDetails.scienceAndEducation.data;

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
                    page="Science And Education"
                    id={item?._id}
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
  getScienceEducation: (params, callback) =>
    dispatch(getScienceEducation(params, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ScienceEducation));
