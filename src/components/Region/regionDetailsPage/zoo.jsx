import React, { useState } from "react";
import ListingCardType from "../../common/listingCard/listingCardType2";
import { getZoo, regionListings } from "../../../store/region";
import { connect } from "react-redux";
import noRecord from "../../../include/images/nrb-img.svg";
const Zoo = (props) => {
  const [loading, setLoading] = useState(false);

  const zooDetails =
    props.regionDetails &&
    props.regionDetails.zoo &&
    props.regionDetails.zoo.data;

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner">
            {zooDetails && zooDetails.length == 0 && (
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
              {zooDetails &&
                zooDetails.length > 0 &&
                zooDetails.map((item) => (
                  <ListingCardType
                    loading={loading}
                    name={item.name}
                    img={
                      process.env.REACT_APP_MEDIA + item?.coverImage?.original
                    }
                    page={"region-Zoo"}
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
  getZoo: (params, data, callback) => dispatch(getZoo(params, data, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Zoo));
