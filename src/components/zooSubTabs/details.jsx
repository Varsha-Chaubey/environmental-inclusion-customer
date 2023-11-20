import React from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import img from "../../include/images/zoo-front-bg.jpg";
import { useState } from "react";
const Details = (props) => {
  const [loading, setLoading] = useState();
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <div class="tbc-details d-flex flex-wrap org-details-main">
                <div class="tbc-details-right">
                  <p>
                    The San Diego Zoo is a zoo in Balboa Park, San Diego,
                    California, housing 4000 animals of more than 650 species
                    and subspecies on 100 acres of Balboa Park leased from the
                    City of San Diego.
                  </p>
                  <p>
                    <strong>Opening Hours :</strong> Opens 9 am to 5 pm
                  </p>
                </div>
                <div class="tbc-details-left">
                  <img src={img} alt="" />
                </div>
              </div>
              <div class="tbc-details-bg">
                <img src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  //   getRegionDetails: (params, callback) =>
  //     dispatch(getRegionDetails(params, callback)),
});

const mapStateToProps = (state) => ({
  //   regionDetails: regionListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Details));
