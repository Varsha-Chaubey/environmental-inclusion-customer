import React from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import img from "../../include/images/wet-market-full.png";
import { useState } from "react";
const Details = (props) => {
  const [loading, setLoading] = useState();
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <div class="tbc-details d-flex flex-wrap wet-market-details-main">
                <div class="tbc-details-right">
                  <p>
                    Brazil’s Belo Horizonte Central Market is recognized
                    worldwide as a diverse location. There are over 400 stalls
                    here, and you can buy non-perishable items like religious
                    statues and handicrafts as well as produce, organic fruits,
                    meat, dairy, and spices and herbs. Traditionally cooked
                    Brazilian food is also available, with Saturdays marked by
                    the offering of traditional feijoada, Brazilian black bean
                    stew.
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
