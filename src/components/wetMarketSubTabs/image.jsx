import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import img from "../../include/images/market-1.png";
const Image = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner" style={{ paddingTop: "20px" }}>
              <ul class="media-list d-flex flex-wrap">
                {loading ? (
                  [1, 2, 3, 4, 5,6].map((item) => (
                    <li class="media-item">
                        <div class="media-box">
                          <div class="media-box-inner">
                           <Skeleton height="182px" width="182px"/>
                          </div>
                        </div>
                      </li>
                  ))
                ) : (
                  <>
                    <ul class="media-list d-flex flex-wrap">
                      <li class="media-item">
                        <div class="media-box">
                          <div class="media-box-inner">
                            <img src={img} alt="" />
                          </div>
                        </div>
                      </li>
                      <li class="media-item">
                        <div class="media-box">
                          <div class="media-box-inner">
                            <img src={img} alt="" />
                          </div>
                        </div>
                      </li>
                      <li class="media-item">
                        <div class="media-box">
                          <div class="media-box-inner">
                            <img src={img} alt="" />
                          </div>
                        </div>
                      </li>
                      <li class="media-item">
                        <div class="media-box">
                          <div class="media-box-inner">
                            <img src={img} alt="" />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  //   getMediaDetails: (params, callback) =>
  //     dispatch(getMediaDetails(params, callback)),
});

const mapStateToProps = (state) => ({
  //   organizationListing: organizationListing(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Image));
