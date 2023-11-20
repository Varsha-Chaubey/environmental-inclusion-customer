import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HTMLReactParser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import img from "../../include/images/card-img-01.jpg";
const Extinct = (props) => {
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
                  [1, 2].map((item) => (
                    <li class="card-item">
                      <a
                        href="#!"
                        class="card-box w-100 h-100 d-flex flex-wrap align-items-center"
                      >
                        <div class="card-img-box overflow-hidden">
                          <div
                            class="card-img-inside"
                            style={{ paddingBottom: "0px" }}
                          >
                            <Skeleton width="255px" height="161px" />
                          </div>
                        </div>
                        <div class="card-content-box">                       
                          <Skeleton />
                          <div class="card-content w-100">
                            <Skeleton width="337px" height="90px" />
                          </div>
                        </div>
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <ul
                      class="card-list d-lg-flex flex-lg-wrap"
                      style={{ marginBottom: "40px" }}
                    >
                      <li class="card-item">
                        <a
                          href="#!"
                          class="card-box w-100 h-100 d-flex flex-wrap align-items-center"
                        >
                          <div class="card-img-box overflow-hidden">
                            <div class="card-img-inside">
                              <img class="card-img" src={img} alt="" />
                            </div>
                          </div>
                          <div class="card-content-box">
                            <h5>Koala</h5>
                            <div class="card-content w-100">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book.
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li class="card-item">
                        <a
                          href="#!"
                          class="card-box w-100 h-100 d-flex flex-wrap align-items-center"
                        >
                          <div class="card-img-box overflow-hidden">
                            <div class="card-img-inside">
                              <img class="card-img" src={img} alt="" />
                            </div>
                          </div>
                          <div class="card-content-box">
                            <h5>Meerkat</h5>
                            <div class="card-content w-100">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book.
                              </p>
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
)(React.memo(Extinct));
