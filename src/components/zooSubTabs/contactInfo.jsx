import React from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import img from "../../include/images/zoo-front-bg-2.jpg";
import { useState } from "react";
const ContactInfo = (props) => {
  const [loading, setLoading] = useState();
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <div class="tbc-details d-flex flex-wrap lg-tbc-details">
                <div class="tbc-details-right">
                  <div class="tbc-contact-list">
                    <div class="tbc-contact-item">
                      Phone{" "}
                      <span class="d-block fw-medium">
                        <a href="tel:+13333334444">+1 333 333 4444</a>
                      </span>
                    </div>
                    <div class="tbc-contact-item">
                      Phone 2{" "}
                      <span class="d-block fw-medium">
                        <a href="tel:+13333334444">+1 333 333 4444</a>
                      </span>
                    </div>
                    <div class="tbc-contact-item">
                      Address
                      <address class="d-block fw-medium">
                        2920 Zoo Dr, San Diego, CA 92101, United States
                      </address>
                    </div>
                  </div>
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
)(React.memo(ContactInfo));
