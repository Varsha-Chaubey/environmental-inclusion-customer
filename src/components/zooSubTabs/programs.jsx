import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HTMLReactParser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import img from "../../include/images/post-image-1.jpg";
const Programs = (props) => {
  const [loading, setLoading] = useState(false);

  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      if (description.includes("strong")) {
        description = description.substring(0, limit + 100) + dots;
      } else description = description.substring(0, limit) + dots;
    }
    return description;
  };
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <ul class="tbc-grid-list d-flex flex-wrap">
                {loading ? (
                  [1, 2,3].map((item) => (
                    <li class="blog-item">
                    <a href="#!" class="blog-box">
                      <div class="blog-box-image" style={{paddingBottom:"0px"}}>
                        <Skeleton height="173px" />
                      </div>
                      <div class="blog-box-content">
                        <div class="bbc-body">
                          <h6> <Skeleton /></h6>
                          <p>
                            <Skeleton  height="78px"/>
                          </p>
                        </div>
                      </div>
                      <div class="bbc-footer">
                        <div class="bbc-footer-inner">
                          <p> <Skeleton width="385px"/></p>                       
                        </div>
                      </div>
                    </a>
                  </li>
                  ))
                ) : (
                  <>
                    <ul class="blog-list d-flex flex-wrap mt-0 w-auto-list"style={{ marginBottom: "40px" }}>
                      <li class="blog-item">
                        <a href="#!" class="blog-box">
                          <div class="blog-box-image">
                            <img src={img} alt="" />
                          </div>
                          <div class="blog-box-content">
                            <div class="bbc-body">
                              <h6>Conservation Career Quest</h6>
                              <p>
                                Conservation Career Quest explores the world of
                                specialized wildlife conservation careers at San
                                Diego Zoo Wildlife Alliance.
                              </p>
                            </div>
                          </div>
                          <div class="bbc-footer">
                            <div class="bbc-footer-inner">
                              <p>March 01, 2021</p>
                              
                            </div>
                          </div>
                        </a>
                      </li>
                      <li class="blog-item">
                        <a href="#!" class="blog-box">
                          <div class="blog-box-image">
                            <img src={img} alt="" />
                          </div>
                          <div class="blog-box-content">
                            <div class="bbc-body">
                              <h6>Conservation Career Quest</h6>
                              <p>
                                Conservation Career Quest explores the world of
                                specialized wildlife conservation careers at San
                                Diego Zoo Wildlife Alliance.
                              </p>
                            </div>
                          </div>
                          <div class="bbc-footer">
                            <div class="bbc-footer-inner">
                              <p>March 01, 2021</p>
                              
                            </div>
                          </div>
                        </a>
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
// Saber-Toothed Tiger
const mapDispatchToProps = (dispatch) => ({
  //   getEnvironmentalistDetails: (params, callback) =>
  //     dispatch(getEnvironmentalistDetails(params, callback)),
});

const mapStateToProps = (state) => ({
  //   environmentalistListings: environmentalistListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Programs));
